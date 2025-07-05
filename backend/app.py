from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime
import hashlib

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    conn = sqlite3.connect('agricredit.db')
    cursor = conn.cursor()
    
    # Create farmers table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS farmers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            age INTEGER,
            location TEXT,
            farm_size REAL,
            experience_years INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create assessments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER,
            assessment_data TEXT,
            credit_score INTEGER,
            risk_level TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (farmer_id) REFERENCES farmers (id)
        )
    ''')
    
    # Create farming_data table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS farming_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER,
            crop_types TEXT,
            average_yield REAL,
            irrigation_type TEXT,
            soil_health_score INTEGER,
            weather_risk_management INTEGER,
            FOREIGN KEY (farmer_id) REFERENCES farmers (id)
        )
    ''')
    
    # Create financial_data table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS financial_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER,
            monthly_income REAL,
            monthly_expenses REAL,
            existing_loans REAL,
            requested_loan_amount REAL,
            loan_purpose TEXT,
            FOREIGN KEY (farmer_id) REFERENCES farmers (id)
        )
    ''')
    
    # Create community_data table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS community_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER,
            cooperative_member BOOLEAN,
            training_programs INTEGER,
            government_schemes TEXT,
            peer_rating INTEGER,
            FOREIGN KEY (farmer_id) REFERENCES farmers (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database
init_db()

@app.route('/api/farmers', methods=['POST'])
def create_farmer():
    try:
        data = request.json
        
        conn = sqlite3.connect('agricredit.db')
        cursor = conn.cursor()
        
        # Insert farmer personal info
        cursor.execute('''
            INSERT INTO farmers (name, phone, age, location, farm_size, experience_years)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            data['personalInfo']['name'],
            data['personalInfo']['phone'],
            data['personalInfo']['age'],
            data['personalInfo']['location'],
            data['personalInfo']['farmSize'],
            data['personalInfo']['experienceYears']
        ))
        
        farmer_id = cursor.lastrowid
        
        # Insert farming data
        cursor.execute('''
            INSERT INTO farming_data (farmer_id, crop_types, average_yield, irrigation_type, 
                                    soil_health_score, weather_risk_management)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            farmer_id,
            json.dumps(data['farmingData']['cropTypes']),
            data['farmingData']['averageYield'],
            data['farmingData']['irrigationType'],
            data['farmingData']['soilHealthScore'],
            data['farmingData']['weatherRiskManagement']
        ))
        
        # Insert financial data
        cursor.execute('''
            INSERT INTO financial_data (farmer_id, monthly_income, monthly_expenses, 
                                      existing_loans, requested_loan_amount, loan_purpose)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            farmer_id,
            data['financialData']['monthlyIncome'],
            data['financialData']['expensesPerMonth'],
            data['financialData']['existingLoans'],
            data['financialData']['requestedLoanAmount'],
            data['financialData']['loanPurpose']
        ))
        
        # Insert community data
        cursor.execute('''
            INSERT INTO community_data (farmer_id, cooperative_member, training_programs, 
                                      government_schemes, peer_rating)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            farmer_id,
            data['communityData']['cooperativeMember'],
            data['communityData']['trainingPrograms'],
            json.dumps(data['communityData'].get('governmentSchemes', [])),
            data['communityData']['peerRating']
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'farmer_id': farmer_id,
            'message': 'Farmer data saved successfully'
        }), 201
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/calculate-score', methods=['POST'])
def calculate_credit_score():
    try:
        data = request.json
        
        # Calculate credit score using the same logic as frontend
        score = 50  # Base score
        factors = []
        explanation = []
        recommendations = []
        
        # Personal Information Impact
        if data['personalInfo']['experienceYears'] >= 5:
            score += 10
            factors.append({
                'name': 'Farming Experience',
                'impact': 10,
                'value': f"{data['personalInfo']['experienceYears']} years of experience"
            })
            explanation.append('Good farming experience shows stability and knowledge.')
        else:
            score -= 5
            factors.append({
                'name': 'Farming Experience',
                'impact': -5,
                'value': f"{data['personalInfo']['experienceYears']} years of experience"
            })
            recommendations.append('Consider gaining more experience or taking agricultural training programs.')
        
        # Add more scoring logic here...
        
        # Ensure score is within bounds
        score = max(0, min(100, score))
        
        # Determine risk level
        if score >= 70:
            risk_level = 'low'
        elif score >= 50:
            risk_level = 'medium'
        else:
            risk_level = 'high'
        
        # Save assessment to database
        conn = sqlite3.connect('agricredit.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO assessments (farmer_id, assessment_data, credit_score, risk_level)
            VALUES (?, ?, ?, ?)
        ''', (
            data.get('farmer_id'),
            json.dumps(data),
            score,
            risk_level
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'creditScore': {
                'score': score,
                'riskLevel': risk_level,
                'explanation': explanation,
                'recommendations': recommendations,
                'factors': factors
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/farmers/<int:farmer_id>', methods=['GET'])
def get_farmer(farmer_id):
    try:
        conn = sqlite3.connect('agricredit.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT f.*, fd.*, fin.*, cd.*
            FROM farmers f
            LEFT JOIN farming_data fd ON f.id = fd.farmer_id
            LEFT JOIN financial_data fin ON f.id = fin.farmer_id
            LEFT JOIN community_data cd ON f.id = cd.farmer_id
            WHERE f.id = ?
        ''', (farmer_id,))
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return jsonify({
                'success': True,
                'farmer': {
                    'id': result[0],
                    'name': result[1],
                    'phone': result[2],
                    # Add more fields as needed
                }
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Farmer not found'
            }), 404
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/assessments/<int:farmer_id>', methods=['GET'])
def get_farmer_assessments(farmer_id):
    try:
        conn = sqlite3.connect('agricredit.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM assessments WHERE farmer_id = ? ORDER BY created_at DESC
        ''', (farmer_id,))
        
        results = cursor.fetchall()
        conn.close()
        
        assessments = []
        for row in results:
            assessments.append({
                'id': row[0],
                'farmer_id': row[1],
                'credit_score': row[3],
                'risk_level': row[4],
                'created_at': row[5]
            })
        
        return jsonify({
            'success': True,
            'assessments': assessments
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
