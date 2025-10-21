import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { getTranslation } from '../utils/translations';

const Chatbot = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const t = getTranslation(currentLanguage);

  const handleSendMessage = (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', content: message };
    const botResponse = getBotResponse(message);
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage('');
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    let response = getLanguageResponse('default');
    
    if (lowerMessage.includes('computer') || lowerMessage.includes('कंप्यूटर') || lowerMessage.includes('కంప్యూటర్')) {
      response = getLanguageResponse('computer');
    } else if (lowerMessage.includes('whatsapp')) {
      response = getLanguageResponse('whatsapp');
    } else if (lowerMessage.includes('internet') || lowerMessage.includes('इंटरनेट') || lowerMessage.includes('ఇంటర్నెట్')) {
      response = getLanguageResponse('internet');
    } else if (lowerMessage.includes('email') || lowerMessage.includes('ईमेल') || lowerMessage.includes('ఇమెయిల్')) {
      response = getLanguageResponse('email');
    } else if (lowerMessage.includes('phone') || lowerMessage.includes('फोन') || lowerMessage.includes('ఫోన్')) {
      response = getLanguageResponse('phone');
    }

    return { type: 'bot', content: response };
  };

  const getLanguageResponse = (topic) => {
    const responses = {
      en: {
        default: "I understand you're asking about digital skills. Let me help you with that!",
        computer: "Great question about computers! Start with our Computer Basics lessons to learn about mouse, keyboard, and essential software.",
        whatsapp: "WhatsApp is covered in our Smartphone Skills category! You'll learn how to send messages, make calls, and share photos safely.",
        internet: "Internet safety is very important! Check out our Internet & Safety lessons to learn about browsing safely and protecting your information.",
        email: "Email lessons are in our Internet & Safety category. You'll learn how to create accounts and send messages securely.",
        phone: "Phone basics are covered in Smartphone Skills! Learn about settings, apps, and digital communication."
      },
      hi: {
        default: "मैं समझ गया कि आप डिजिटल कौशल के बारे में पूछ रहे हैं। मैं आपकी मदद करूंगा!",
        computer: "कंप्यूटर के बारे में बेहतरीन सवाल! माउस, कीबोर्ड और आवश्यक सॉफ्टवेयर सीखने के लिए हमारे कंप्यूटर बेसिक्स पाठ शुरू करें।",
        whatsapp: "WhatsApp हमारी स्मार्टफोन स्किल्स श्रेणी में शामिल है! आप संदेश भेजना, कॉल करना और सुरक्षित रूप से फोटो साझा करना सीखेंगे।",
        internet: "इंटरनेट सुरक्षा बहुत महत्वपूर्ण है! सुरक्षित ब्राउज़िंग और अपनी जानकारी की सुरक्षा के लिए हमारे इंटरनेट और सुरक्षा पाठ देखें।",
        email: "ईमेल पाठ हमारी इंटरनेट और सुरक्षा श्रेणी में हैं। आप खाते बनाना और सुरक्षित रूप से संदेश भेजना सीखेंगे।",
        phone: "फोन की बुनियादी बातें स्मार्टफोन स्किल्स में शामिल हैं! सेटिंग्स, ऐप्स और डिजिटल संचार के बारे में सीखें।"
      },
      te: {
        default: "మీరు డిజిటల్ నైపుణ్యాల గురించి అడుగుతున్నారని నేను అర్థం చేసుకున్నాను. నేను మీకు సహాయం చేస్తాను!",
        computer: "కంప్యూటర్ల గురించి అద్భుతమైన ప్రశ్న! మౌస్, కీబోర్డ్ మరియు అవసరమైన సాఫ్ట్వేర్ నేర్చుకోవడానికి మా కంప్యూటర్ బేసిక్స్ పాఠాలను ప్రారంభించండి.",
        whatsapp: "WhatsApp మా స్మార్ట్ఫోన్ స్కిల్స్ వర్గంలో ఉంది! మీరు సందేశాలు పంపడం, కాల్స్ చేయడం మరియు సురక్షితంగా ఫోటోలు పంచుకోవడం నేర్చుకుంటారు.",
        internet: "ఇంటర్నెట్ భద్రత చాలా ముఖ్యం! సురక్షితంగా బ్రౌజింగ్ మరియు మీ సమాచారాన్ని రక్షించడం గురించి మా ఇంటర్నెట్ & భద్రత పాఠాలను చూడండి.",
        email: "ఇమెయిల్ పాఠాలు మా ఇంటర్నెట్ & భద్రత వర్గంలో ఉన్నాయి. మీరు ఖాతాలు సృష్టించడం మరియు సురక్షితంగా సందేశాలు పంపడం నేర్చుకుంటారు.",
        phone: "ఫోన్ బేసిక్స్ స్మార్ట్ఫోన్ స్కిల్స్లో కవర్ చేయబడ్డాయి! సెట్టింగ్లు, యాప్లు మరియు డిజిటల్ కమ్యూనికేషన్ గురించి నేర్చుకోండి."
      }
    };
    
    return responses[currentLanguage]?.[topic] || responses.en[topic];
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40">
      <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">{t.digitalLearningAssistant}</h3>
            <p className="text-xs opacity-90">{t.askAnything}</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
          className="p-1 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center">
            <Bot className="h-12 w-12 text-blue-500 mx-auto mb-3" />
            <p className="text-gray-600 text-sm mb-4">{t.chatbotGreeting}</p>
            <div className="space-y-2">
              {t.quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.chatbotPlaceholder}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={() => handleSendMessage()}
            aria-label="Send message"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;