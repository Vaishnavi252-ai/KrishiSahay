from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

account_sid = os.getenv("TWILIO_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE")

# store OTPs in RAM temporarily
otp_store = {}

def generate_otp(length=6):
    return ''.join(str(random.randint(0, 9)) for _ in range(length))

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    phone_number = data.get('phone')
    if not phone_number:
        return jsonify({"error": "Missing phone number"}), 400

    otp = generate_otp()
    otp_store[phone_number] = otp

    try:
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body=f"🔐 Your KrishiSahay OTP is: {otp}",
            from_=twilio_number,
            to=phone_number
        )
        print(f"OTP sent to {phone_number}: {otp}")  # log only in console
        return jsonify({"success": True})   # no OTP leaked to frontend
    except Exception as e:
        print(f"Twilio error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    phone_number = data.get('phone')
    otp = data.get('otp')

    if not phone_number or not otp:
        return jsonify({"error": "Missing data"}), 400

    if otp_store.get(phone_number) == otp:
        return jsonify({"verified": True})
    else:
        return jsonify({"verified": False, "error": "Wrong OTP"}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)
