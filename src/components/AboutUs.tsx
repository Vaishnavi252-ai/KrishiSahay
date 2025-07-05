import React from 'react';
import { ArrowLeft, Target, Users, Award, Shield, TrendingUp, Heart, Code, Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import developer1Image from '../assets/images/vaishnavi.jpg';
import developer2Image from '../assets/images/princy.png';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const { language } = useLanguage();

  const getContent = () => {
    const content = {
      en: {
        title: "About KrishiCredit",
        subtitle: "Empowering farmers through AI-powered credit assessment",
        mission: {
          title: "Our Mission",
          description: "To bridge the gap between traditional banking and agricultural financing by providing fair, transparent, and data-driven credit assessments for farmers who lack conventional credit history."
        },
        vision: {
          title: "Our Vision",
          description: "A world where every farmer has access to fair credit opportunities based on their actual farming capabilities and potential, not just their financial history."
        },
        values: [
          {
            icon: Shield,
            title: "Transparency",
            description: "Every credit score comes with clear explanations of factors that influenced the assessment."
          },
          {
            icon: Users,
            title: "Inclusivity",
            description: "Designed specifically for smallholder farmers who are often excluded from traditional banking."
          },
          {
            icon: TrendingUp,
            title: "Innovation",
            description: "Using cutting-edge AI and alternative data sources to revolutionize agricultural finance."
          },
          {
            icon: Heart,
            title: "Impact",
            description: "Committed to improving rural livelihoods and food security through better access to credit."
          }
        ],
        howItWorks: {
          title: "How It Works",
          steps: [
            {
              step: "1",
              title: "Data Collection",
              description: "Farmers provide information about their farming practices, yields, and community engagement."
            },
            {
              step: "2", 
              title: "AI Analysis",
              description: "Our AI algorithms analyze agricultural data, weather patterns, and farming practices."
            },
            {
              step: "3",
              title: "Credit Scoring",
              description: "Generate a comprehensive credit score with detailed explanations and recommendations."
            },
            {
              step: "4",
              title: "Bank Integration",
              description: "Lenders use these scores to make informed, fair lending decisions."
            }
          ]
        },
        impact: {
          title: "Our Impact",
          stats: [
            { number: "10,000+", label: "Farmers Assessed" },
            { number: "85%", label: "Approval Rate Improvement" },
            { number: "₹50 Cr+", label: "Credit Facilitated" },
            { number: "15", label: "Partner Banks" }
          ]
        },
        developers: {
          title: "Meet the Developers",
          subtitle: "Built by passionate B.E. CSE-AIML students dedicated to solving real-world problems",
          team: [
            {
              name: "Vaishnavi Misal",
              role: "Project Founder & Developer",
              education: "B.E. Computer Science & Engineering - AI/ML",
              college: "Bharat College Of Engineering, Badlapur",
              email: "misalvaishnavi878@gmail.com",
              image: developer1Image,
              skills: ["React", "TypeScript", "AI/ML", "Python", "Flask"],
              description: "Passionate about leveraging AI to solve real-world challenges.",
              achievements: [
                "KrishiSahay is committed to empowering farmers and supporting bankers through a simple ,transparent, and farmer-friendly loan assistance platform"
              ]
            },
            {
              name: "Princy Singh",
              role: "Co-Developer & Research Analyst",
              education: "B.E. Computer Science & Engineering - AI/ML",
              college: "Bharat College Of Engineering, Badlapur",
              email: "princys549@gmail.com",
              image: developer2Image,
              skills: ["Advanced Python","Data Analyst", "AI/ML", "UI/UX"],
              description: "Focused on creating scalable solutions and intuitive user experiences for afuture technology.",
              achievements: [
                "KrishiSahay is committed to empowering farmers and supporting bankers through a simple ,transparent, and farmer-friendly loan assistance platform"
              ]
            }
          ]
        },
        team: {
          title: "Built for Farmers, by Experts",
          description: "Our team combines expertise in agriculture, finance, and technology to create solutions that truly understand the needs of farming communities."
        }
      },
      hi: {
        title: "कृषिक्रेडिट के बारे में",
        subtitle: "AI-संचालित क्रेडिट मूल्यांकन के माध्यम से किसानों को सशक्त बनाना",
        mission: {
          title: "हमारा मिशन",
          description: "पारंपरिक बैंकिंग और कृषि वित्तपोषण के बीच की खाई को पाटना, उन किसानों के लिए निष्पक्ष, पारदर्शी और डेटा-संचालित क्रेडिट मूल्यांकन प्रदान करना जिनके पास पारंपरिक क्रेडिट इतिहास नहीं है।"
        },
        vision: {
          title: "हमारी दृष्टि",
          description: "एक ऐसी दुनिया जहां हर किसान को अपनी वास्तविक कृषि क्षमताओं और संभावनाओं के आधार पर निष्पक्ष क्रेडिट अवसर मिलें, न कि केवल उनके वित्तीय इतिहास के आधार पर।"
        },
        values: [
          {
            icon: Shield,
            title: "पारदर्शिता",
            description: "हर क्रेडिट स्कोर मूल्यांकन को प्रभावित करने वाले कारकों की स्पष्ट व्याख्या के साथ आता है।"
          },
          {
            icon: Users,
            title: "समावेशिता",
            description: "विशेष रूप से छोटे किसानों के लिए डिज़ाइन किया गया जो अक्सर पारंपरिक बैंकिंग से बाहर रह जाते हैं।"
          },
          {
            icon: TrendingUp,
            title: "नवाचार",
            description: "कृषि वित्त में क्रांति लाने के लिए अत्याधुनिक AI और वैकल्पिक डेटा स्रोतों का उपयोग।"
          },
          {
            icon: Heart,
            title: "प्रभाव",
            description: "क्रेडिट तक बेहतर पहुंच के माध्यम से ग्रामीण आजीविका और खाद्य सुरक्षा में सुधार के लिए प्रतिबद्ध।"
          }
        ],
        howItWorks: {
          title: "यह कैसे काम करता है",
          steps: [
            {
              step: "1",
              title: "डेटा संग्रह",
              description: "किसान अपनी कृषि प्रथाओं, उत्पादन और सामुदायिक भागीदारी के बारे में जानकारी प्रदान करते हैं।"
            },
            {
              step: "2",
              title: "AI विश्लेषण",
              description: "हमारे AI एल्गोरिदम कृषि डेटा, मौसम पैटर्न और कृषि प्रथाओं का विश्लेषण करते हैं।"
            },
            {
              step: "3",
              title: "क्रेडिट स्कोरिंग",
              description: "विस्तृत व्याख्या और सिफारिशों के साथ एक व्यापक क्रेडिट स्कोर उत्पन्न करें।"
            },
            {
              step: "4",
              title: "बैंक एकीकरण",
              description: "ऋणदाता सूचित, निष्पक्ष ऋण निर्णय लेने के लिए इन स्कोर का उपयोग करते हैं।"
            }
          ]
        },
        impact: {
          title: "हमारा प्रभाव",
          stats: [
            { number: "10,000+", label: "किसानों का मूल्यांकन" },
            { number: "85%", label: "अनुमोदन दर में सुधार" },
            { number: "₹50 करोड़+", label: "क्रेडिट सुविधा" },
            { number: "15", label: "साझेदार बैंक" }
          ]
        },
        developers: {
          title: "डेवलपर्स से मिलें",
          subtitle: "वास्तविक समस्याओं को हल करने के लिए समर्पित B.E. CSE-AIML छात्रों द्वारा निर्मित",
          team: [
              
           {
  name: "वैष्णवी मिसाळ",
  role: "परियोजना संस्थापक और डेवलपर",
  education: "बी.ई. कंप्यूटर साइंस एंड इंजीनियरिंग - एआई/एमएल",
  college: "भारत कॉलेज ऑफ इंजीनियरिंग, बदलापुर",
  email: "misalvaishnavi878@gmail.com",
  image: developer1Image,
  skills: ["React", "TypeScript", "एआई/एमएल", "Python", "Flask"],
  description: "वास्तविक दुनिया की चुनौतियों को हल करने के लिए एआई का उपयोग करने के लिए उत्साही।",
  achievements: [
    "कृषि सहाय किसानों को सशक्त बनाने और बैंकरों का समर्थन करने के लिए एक सरल, पारदर्शी और किसान-हितैषी ऋण सहायता मंच प्रदान करता है।"
  ]
},
{
  name: "प्रिंसी सिंह",
  role: "सह-डेवलपर और अनुसंधान विश्लेषक",
  education: "बी.ई. कंप्यूटर साइंस एंड इंजीनियरिंग - एआई/एमएल",
  college: "भारत कॉलेज ऑफ इंजीनियरिंग, बदलापुर",
  email: "princys549@gmail.com",
  image: developer2Image,
  skills: ["एडवांस्ड पाइथन","डेटा विश्लेषक", "एआई/एमएल", "यूआई/यूएक्स"],
  description: "भविष्य की तकनीक के लिए स्केलेबल समाधान और सहज उपयोगकर्ता अनुभव बनाने पर केंद्रित।",
  achievements: [
    "कृषि सहाय किसानों को सशक्त बनाने और बैंकरों का समर्थन करने के लिए एक सरल, पारदर्शी और किसान-हितैषी ऋण सहायता मंच प्रदान करता है।"
  ]
}

          ]
        },
        team: {
          title: "किसानों के लिए, विशेषज्ञों द्वारा निर्मित",
          description: "हमारी टीम कृषि, वित्त और प्रौद्योगिकी में विशेषज्ञता को जोड़ती है ताकि ऐसे समाधान बनाए जा सकें जो वास्तव में कृषक समुदायों की जरूरतों को समझते हैं।"
        }
      },
      mr: {
        title: "कृषिक्रेडिट बद्दल",
        subtitle: "AI-संचालित क्रेडिट मूल्यांकनाद्वारे शेतकर्‍यांना सक्षम करणे",
        mission: {
          title: "आमचे ध्येय",
          description: "पारंपारिक बँकिंग आणि कृषी वित्तपुरवठा यांच्यातील अंतर कमी करणे, ज्या शेतकर्‍यांकडे पारंपारिक क्रेडिट इतिहास नाही त्यांच्यासाठी निष्पक्ष, पारदर्शक आणि डेटा-चालित क्रेडिट मूल्यांकन प्रदान करणे."
        },
        vision: {
          title: "आमची दृष्टी",
          description: "असे जग जिथे प्रत्येक शेतकर्‍याला त्यांच्या वास्तविक शेतकी क्षमता आणि संभाव्यतेच्या आधारे निष्पक्ष क्रेडिट संधी मिळतात, केवळ त्यांच्या आर्थिक इतिहासावर आधारित नाही."
        },
        values: [
          {
            icon: Shield,
            title: "पारदर्शकता",
            description: "प्रत्येक क्रेडिट स्कोअर मूल्यांकनावर प्रभाव टाकणार्‍या घटकांच्या स्पष्ट स्पष्टीकरणासह येतो."
          },
          {
            icon: Users,
            title: "समावेशकता",
            description: "विशेषतः लहान शेतकर्‍यांसाठी डिझाइन केलेले जे सहसा पारंपारिक बँकिंगमधून वगळले जातात."
          },
          {
            icon: TrendingUp,
            title: "नावीन्य",
            description: "कृषी वित्तामध्ये क्रांती घडवून आणण्यासाठी अत्याधुनिक AI आणि पर्यायी डेटा स्रोतांचा वापर."
          },
          {
            icon: Heart,
            title: "प्रभाव",
            description: "क्रेडिटच्या चांगल्या प्रवेशाद्वारे ग्रामीण उपजीविका आणि अन्न सुरक्षा सुधारण्यासाठी वचनबद्ध."
          }
        ],
        howItWorks: {
          title: "हे कसे कार्य करते",
          steps: [
            {
              step: "1",
              title: "डेटा संकलन",
              description: "शेतकरी त्यांच्या शेतकी पद्धती, उत्पादन आणि सामुदायिक सहभागाबद्दल माहिती प्रदान करतात."
            },
            {
              step: "2",
              title: "AI विश्लेषण",
              description: "आमचे AI अल्गोरिदम कृषी डेटा, हवामान पॅटर्न आणि शेतकी पद्धतींचे विश्लेषण करतात."
            },
            {
              step: "3",
              title: "क्रेडिट स्कोअरिंग",
              description: "तपशीलवार स्पष्टीकरण आणि शिफारशींसह एक व्यापक क्रेडिट स्कोअर तयार करा."
            },
            {
              step: "4",
              title: "बँक एकीकरण",
              description: "कर्जदाते माहितीपूर्ण, निष्पक्ष कर्ज निर्णय घेण्यासाठी या स्कोअरचा वापर करतात."
            }
          ]
        },
        impact: {
          title: "आमचा प्रभाव",
          stats: [
            { number: "10,000+", label: "शेतकर्‍यांचे मूल्यांकन" },
            { number: "85%", label: "मंजुरी दरात सुधारणा" },
            { number: "₹50 कोटी+", label: "क्रेडिट सुविधा" },
            { number: "15", label: "भागीदार बँका" }
          ]
        },
        developers: {
          title: "डेव्हलपर्सना भेटा",
          subtitle: "वास्तविक समस्या सोडवण्यासाठी समर्पित B.E. CSE-AIML विद्यार्थ्यांनी तयार केलेले",
          team: [
            {
  name: "वैष्णवी मिसाळ",
  role: "प्रकल्प संस्थापक आणि विकासक",
  education: "बी.ई. संगणक शास्त्र व अभियांत्रिकी - एआय/एमएल",
  college: "भारत कॉलेज ऑफ इंजिनिअरिंग, बदलापूर",
  email: "misalvaishnavi878@gmail.com",
  image: developer1Image,
  skills: ["React", "TypeScript", "एआय/एमएल", "Python", "Flask"],
  description: "खऱ्या आयुष्यातील समस्यांवर एआयद्वारे उपाय शोधण्याचा उत्साह.",
  achievements: [
    "कृषी सहाय शेतकऱ्यांना सक्षम बनविण्यासाठी आणि बँकर्सना पाठिंबा देण्यासाठी सोपे, पारदर्शक आणि शेतकरी हितैषी कर्ज सहाय्य व्यासपीठ देण्याचे काम करत आहे."
  ]
},
{
  name: "प्रिंसी सिंग",
  role: "सह-विकासक आणि संशोधन विश्लेषक",
  education: "बी.ई. संगणक शास्त्र व अभियांत्रिकी - एआय/एमएल",
  college: "भारत कॉलेज ऑफ इंजिनिअरिंग, बदलापूर",
  email: "princys549@gmail.com",
  image: developer2Image,
  skills: ["अ‍ॅडव्हान्स्ड पायथन","डेटा विश्लेषक", "एआई/एमएल", "यूआय/यूएक्स"],
  description: "भविष्यातील तंत्रज्ञानासाठी स्केलेबल आणि सुलभ वापरता येणारी प्रणाली तयार करण्यावर लक्ष केंद्रित.",
  achievements: [
    "कृषी सहाय शेतकऱ्यांना सक्षम बनविण्यासाठी आणि बँकर्सना पाठिंबा देण्यासाठी सोपे, पारदर्शक आणि शेतकरी हितैषी कर्ज सहाय्य व्यासपीठ देण्याचे काम करत आहे."
  ]
}

          ]
        },
        team: {
          title: "शेतकर्‍यांसाठी, तज्ञांनी बनवलेले",
          description: "आमची टीम कृषी, वित्त आणि तंत्रज्ञानातील कौशल्य एकत्र करून असे उपाय तयार करते जे खरोखरच शेतकरी समुदायांच्या गरजा समजतात."
        }
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
              <p className="text-lg text-gray-600">{content.subtitle}</p>
            </div>
          </div>

          <div className="p-6 space-y-12">
            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">{content.mission.title}</h2>
                </div>
                <p className="text-gray-700">{content.mission.description}</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">{content.vision.title}</h2>
                </div>
                <p className="text-gray-700">{content.vision.description}</p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Developers Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-lg">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Code className="w-8 h-8 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{content.developers.title}</h2>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">{content.developers.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {content.developers.team.map((developer, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center mb-6">
                      <div className="relative mb-4">
                        <img
                          src={developer.image}
                          alt={developer.name}
                          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-100 shadow-lg"
                          onError={(e) => {
                            // Fallback to a placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&size=128&background=7c3aed&color=ffffff`;
                          }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                          <Code className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{developer.name}</h3>
                      <p className="text-purple-600 font-medium mb-2">{developer.role}</p>
                      <p className="text-sm text-gray-600 mb-1">{developer.education}</p>
                      <p className="text-sm text-gray-500 mb-4">{developer.college}</p>
                    </div>

                    <div className="space-y-4">
                      {/* Technical Skills */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {developer.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-gray-700 text-sm leading-relaxed">{developer.description}</p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
                        <ul className="space-y-1">
                          {developer.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-sm text-gray-600 flex items-start">
                              <Award className="w-3 h-3 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100">
                        <a
                          href={`mailto:${developer.email}`}
                          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">Email</span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">GitHub</span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm">LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Development Journey */}
              <div className="mt-8 bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Our Development Journey</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Problem Identification</h4>
                    <p className="text-sm text-gray-600">Recognized the gap in agricultural credit assessment and farmer financial inclusion</p>
                  </div>
                  <div>
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Solution Development</h4>
                    <p className="text-sm text-gray-600">Built an AI-powered platform using modern web technologies and machine learning</p>
                  </div>
                  <div>
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Impact Focus</h4>
                    <p className="text-sm text-gray-600">Committed to improving farmer livelihoods through better access to fair credit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{content.howItWorks.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.howItWorks.steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{content.impact.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.impact.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                    <div className="text-gray-700 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.team.title}</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">{content.team.description}</p>
            </div>

            {/* Contact */}
            <div className="text-center border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <div className="space-y-2 text-gray-600">
                <p>Email: support@krishisahay.com</p>
                <p>Phone: +91-1800-XXX-XXXX</p>
                <p>Address: Agricultural Technology Center, Mumbai, Maharashtra, India</p>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Built with ❤️ by B.E. CSE-AIML students passionate about technology innovation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;