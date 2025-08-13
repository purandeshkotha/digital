import React, { useState } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface ChatbotProps {
  currentLanguage: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  const t = getTranslation(currentLanguage);

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Voice input not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'te' ? 'te-IN' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      const errorMessages = {
        'not-allowed': 'Microphone access denied. Please allow microphone access.',
        'network': 'Network error. Please check your connection.',
        'no-speech': 'No speech detected. Please try again.',
        'aborted': 'Speech recognition was aborted.',
        'audio-capture': 'Audio capture failed. Please check your microphone.',
        'service-not-allowed': 'Speech service not allowed.'
      };
      const message = errorMessages[event.error as keyof typeof errorMessages] || 'Voice input failed. Please try again.';
      console.error('Speech recognition error:', message);
    };

    recognition.start();
  };

  const getResponses = (lang: string) => {
    const responses: { [key: string]: any } = {
      en: {
        greetings: ['Hello! How can I help you today?', 'Hi there! What would you like to learn?', 'Welcome! I am here to assist you with digital skills.'],
        computer: ['To use a mouse, hold it gently and move it on a flat surface. The cursor on screen will follow your movements.', 'The keyboard has letters, numbers, and special keys. Press keys gently to type.', 'To turn on a computer, press the power button and wait for it to start up.'],
        smartphone: ['To unlock your phone, swipe up or press the home button depending on your model.', 'Apps are small programs. Tap an app icon to open it.', 'To make a call, open the phone app and dial the number, then press the green call button.'],
        internet: ['To browse the internet, open a web browser like Chrome or Safari and type a website address.', 'Be careful with personal information online. Never share passwords or bank details.', 'Use strong passwords with letters, numbers, and symbols.'],
        help: ['I can help you with computer basics, smartphone usage, internet safety, and digital skills.', 'Try asking me about specific topics like how to use mouse or smartphone apps.', 'Feel free to ask any questions about technology - I am here to help!']
      },
      hi: {
        greetings: ['नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?', 'हैलो! आप क्या सीखना चाहते हैं?', 'स्वागत है! मैं डिजिटल कौशल में आपकी सहायता के लिए यहां हूं।'],
        computer: ['माउस का उपयोग करने के लिए, इसे धीरे से पकड़ें और समतल सतह पर हिलाएं। स्क्रीन पर कर्सर आपकी गति का पालन करेगा।', 'कीबोर्ड में अक्षर, संख्याएं और विशेष कुंजियां होती हैं। टाइप करने के लिए कुंजियों को धीरे से दबाएं।', 'कंप्यूटर चालू करने के लिए, पावर बटन दबाएं और इसके शुरू होने का इंतजार करें।'],
        smartphone: ['अपना फोन अनलॉक करने के लिए, अपने मॉडल के आधार पर ऊपर स्वाइप करें या होम बटन दबाएं।', 'ऐप्स छोटे प्रोग्राम हैं। ऐप खोलने के लिए ऐप आइकन पर टैप करें।', 'कॉल करने के लिए, फोन ऐप खोलें और नंबर डायल करें, फिर हरे कॉल बटन को दबाएं।'],
        internet: ['इंटरनेट ब्राउज़ करने के लिए, Chrome या Safari जैसा वेब ब्राउज़र खोलें और वेबसाइट का पता टाइप करें।', 'ऑनलाइन व्यक्तिगत जानकारी के साथ सावधान रहें। कभी भी पासवर्ड या बैंक विवरण साझा न करें।', 'अक्षरों, संख्याओं और प्रतीकों के साथ मजबूत पासवर्ड का उपयोग करें।'],
        help: ['मैं कंप्यूटर की बुनियादी बातों, स्मार्टफोन के उपयोग, इंटरनेट सुरक्षा और डिजिटल कौशल में आपकी मदद कर सकता हूं।', 'माउस का उपयोग कैसे करें या स्मार्टफोन ऐप्स जैसे विशिष्ट विषयों के बारे में पूछने का प्रयास करें।', 'तकनीक के बारे में कोई भी प्रश्न पूछने में संकोच न करें - मैं मदद के लिए यहां हूं!']
      },
      te: {
        greetings: ['నమస్కారం! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?', 'హలో! మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?', 'స్వాగతం! డిజిటల్ నైపుణ్యాలలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను।'],
        computer: ['మౌస్ ఉపయోగించడానికి, దానిని మెల్లగా పట్టుకుని చదునైన ఉపరితలంపై కదిలించండి। స్క్రీన్‌పై కర్సర్ మీ కదలికలను అనుసరిస్తుంది।', 'కీబోర్డ్‌లో అక్షరాలు, సంఖ్యలు మరియు ప్రత్యేక కీలు ఉంటాయి। టైప్ చేయడానికి కీలను మెల్లగా నొక్కండి।', 'కంప్యూటర్ ఆన్ చేయడానికి, పవర్ బటన్ నొక్కి అది ప్రారంభం కావడానికి వేచి ఉండండి।'],
        smartphone: ['మీ ఫోన్ అన్‌లాక్ చేయడానికి, మీ మోడల్ ఆధారంగా పైకి స్వైప్ చేయండి లేదా హోమ్ బటన్ నొక్కండి।', 'యాప్‌లు చిన్న ప్రోగ్రామ్‌లు. యాప్ తెరవడానికి యాప్ ఐకాన్‌పై ట్యాప్ చేయండి।', 'కాల్ చేయడానికి, ఫోన్ యాప్ తెరిచి నంబర్ డయల్ చేసి, ఆపై ఆకుపచ్చ కాల్ బటన్ నొక్కండి।'],
        internet: ['ఇంటర్నెట్ బ్రౌజ్ చేయడానికి, Chrome లేదా Safari వంటి వెబ్ బ్రౌజర్ తెరిచి వెబ్‌సైట్ చిరునామా టైప్ చేయండి।', 'ఆన్‌లైన్‌లో వ్యక్తిగత సమాచారంతో జాగ్రత్తగా ఉండండి. ఎప్పుడూ పాస్‌వర్డ్‌లు లేదా బ్యాంక్ వివరాలను పంచుకోవద్దు।', 'అక్షరాలు, సంఖ్యలు మరియు చిహ్నాలతో బలమైన పాస్‌వర్డ్‌లను ఉపయోగించండి।'],
        help: ['నేను కంప్యూటర్ బేసిక్స్, స్మార్ట్‌ఫోన్ వాడకం, ఇంటర్నెట్ భద్రత మరియు డిజిటల్ నైపుణ్యాలలో మీకు సహాయం చేయగలను।', 'మౌస్ ఎలా ఉపయోగించాలి లేదా స్మార్ట్‌ఫోన్ యాప్‌లు వంటి నిర్దిష్ట అంశాల గురించి అడగడానికి ప్రయత్నించండి।', 'టెక్నాలజీ గురించి ఏవైనా ప్రశ్నలు అడగడానికి సంకోచించవద్దు - నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను!']
      }
    };
    return responses[lang] || responses.en;
  };

  const getResponse = (userInput: string): string => {
    const responses = getResponses(currentLanguage);
    const input = userInput.toLowerCase();
    
    if (input.includes('your name') || input.includes('who are you') || input.includes('what is your name')) {
      const nameResponses = {
        en: "I am your Digital Learning Assistant! I am here to help you learn computer, smartphone, and internet skills.",
        hi: "मैं आपका डिजिटल लर्निंग असिस्टेंट हूं! मैं आपको कंप्यूटर, स्मार्टफोन और इंटरनेट स्किल्स सीखने में मदद करने के लिए यहां हूं।",
        te: "నేను మీ డిజిటల్ లెర్నింగ్ అసిస్టెంట్! కంప్యూటర్, స్మార్ట్‌ఫోన్ మరియు ఇంటర్నెట్ నైపుణ్యాలు నేర్చుకోవడంలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను."
      };
      return nameResponses[currentLanguage as keyof typeof nameResponses] || nameResponses.en;
    }

    if (input.includes('my name is') || input.includes('i am') || input.includes('call me')) {
      const nameMatch = input.match(/(?:my name is|i am|call me)\s+([a-zA-Z]+)/i);
      if (nameMatch) {
        setUserName(nameMatch[1]);
        return currentLanguage === 'hi' ? `नमस्ते ${nameMatch[1]}! आपसे मिलकर खुशी हुई। मैं आपकी डिजिटल स्किल्स सीखने में मदद करूंगा।` : 
               currentLanguage === 'te' ? `నమస్కారం ${nameMatch[1]}! మిమ్మల్ని కలవడం ఆనందంగా ఉంది। నేను మీ డిజిటల్ నైపుణ్యాలు నేర్చుకోవడంలో సహాయం చేస్తాను।` :
               `Nice to meet you, ${nameMatch[1]}! I am here to help you learn digital skills.`;
      }
    }

    setConversationContext(prev => [...prev.slice(-3), input]);
    
    const keywords = {
      greetings: currentLanguage === 'hi' ? ['नमस्ते', 'हैलो', 'हाय'] : currentLanguage === 'te' ? ['నమస్కారం', 'హలో', 'హాయ్'] : ['hello', 'hi', 'hey'],
      computer: currentLanguage === 'hi' ? ['कंप्यूटर', 'माउस', 'कीबोर्ड'] : currentLanguage === 'te' ? ['కంప్యూటర్', 'మౌస్', 'కీబోర్డ్'] : ['computer', 'mouse', 'keyboard'],
      smartphone: currentLanguage === 'hi' ? ['फोन', 'स्मार्टफोन', 'ऐप'] : currentLanguage === 'te' ? ['ఫోన్', 'స్మార్ట్‌ఫోన్', 'యాప్'] : ['phone', 'smartphone', 'app'],
      internet: currentLanguage === 'hi' ? ['इंटरनेट', 'ब्राउज़र', 'वेबसाइट'] : currentLanguage === 'te' ? ['ఇంటర్నెట్', 'బ్రౌజర్', 'వెబ్‌సైట్'] : ['internet', 'browser', 'website'],
      help: currentLanguage === 'hi' ? ['मदद', 'क्या', 'कैसे'] : currentLanguage === 'te' ? ['సహాయం', 'ఏమిటి', 'ఎలా'] : ['help', 'what', 'how'],
      thanks: currentLanguage === 'hi' ? ['धन्यवाद', 'शुक्रिया'] : currentLanguage === 'te' ? ['ధన్యవాదాలు'] : ['thank', 'thanks']
    };
    
    if (keywords.thanks.some(word => input.includes(word))) {
      const thankResponses = {
        en: [`You are welcome${userName ? `, ${userName}` : ''}! Happy to help you learn.`],
        hi: [`आपका स्वागत है${userName ? `, ${userName}` : ''}! आपकी सीखने में मदद करके खुशी हुई।`],
        te: [`మీకు స్వాగతం${userName ? `, ${userName}` : ''}! మీకు నేర్చుకోవడంలో సహాయం చేయడంలో ఆనందం.`]
      };
      const langResponses = thankResponses[currentLanguage as keyof typeof thankResponses] || thankResponses.en;
      return langResponses[0];
    }
    
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => input.includes(word))) {
        const categoryResponses = responses[category];
        if (categoryResponses) {
          return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        }
      }
    }
    
    const fallbacks = {
      en: "That is a great question! Could you be more specific? I can help with computers, smartphones, or internet topics.",
      hi: "यह एक बेहतरीन सवाल है! क्या आप और स्पष्ट हो सकते हैं? मैं कंप्यूटर, स्मार्टफोन या इंटरनेट विषयों में मदद कर सकता हूं।",
      te: "అది గొప్प ప్రశ్న! మీరు మరింత స్పష్టంగా చెప్పగలరా? నేను కంప్యూటర్‌లు, స్మార్ట్‌ఫోన్‌లు లేదా ఇంటర్నెట్ అంశాలలో సహాయం చేయగలను."
    };
    
    return fallbacks[currentLanguage as keyof typeof fallbacks] || fallbacks.en;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsTyping(true);
    
    const response = getResponse(userMessage);
    const typingDelay = Math.min(response.length * 50, 3000) + Math.random() * 1000;
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, typingDelay);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">
              {currentLanguage === 'hi' ? 'डिजिटल लर्निंग असिस्टेंट' :
               currentLanguage === 'te' ? 'డిజిటల్ లెర్నింగ్ అసిస్టెంట్' :
               'Digital Learning Assistant'}
            </h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 h-64 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-gray-600 text-sm">
                  {currentLanguage === 'hi' ? '👋 नमस्ते! मैं आपका डिजिटल लर्निंग असिस्टेंट हूं।' :
                   currentLanguage === 'te' ? '👋 నమస్కారం! నేను మీ డిజిటల్ లెర్నింగ్ అసిస్టెంట్!' :
                   '👋 Hello! I am your Digital Learning Assistant.'}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {currentLanguage === 'hi' ? 'कंप्यूटर, स्मार्टफोन या इंटरनेट सुरक्षा के बारे में पूछें!' :
                   currentLanguage === 'te' ? 'కంప్యూటర్లు, స్మార్ట్‌ఫోన్లు లేదా ఇంటర్నెట్ భద్రత గురించి అడగండి!' :
                   'Ask me about computers, smartphones, or internet safety!'}
                </p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-3 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.isUser 
                    ? 'bg-blue-600 text-white rounded-br-md' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-3">
                <div className="inline-block bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? 
                  (currentLanguage === 'hi' ? 'सुन रहा हूं...' :
                   currentLanguage === 'te' ? 'వింటున్నాను...' : 'Listening...') :
                  (currentLanguage === 'hi' ? 'अपना प्रश्न टाइप करें...' :
                   currentLanguage === 'te' ? 'మీ ప్రశ్నను టైప్ చేయండి...' : 'Type your question...')
                }
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                disabled={isListening}
              />
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button
                onClick={handleSend}
                disabled={isListening}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;