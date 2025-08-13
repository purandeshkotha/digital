import React, { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, XCircle, Award } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { useProgress } from '../context/ProgressContext';
import { Quiz } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz | null;
  currentLanguage: string;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quiz, currentLanguage }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { updateQuizScore } = useProgress();
  const t = useMemo(() => getTranslation(currentLanguage), [currentLanguage]);

  // Reset quiz state when modal opens/closes or quiz changes
  useEffect(() => {
    if (isOpen && quiz) {
      resetQuiz();
    }
  }, [isOpen, quiz?.id]);

  const quizData = useMemo(() => ({
    'computer-1': [
      { question: "What is used to point and click on screen?", options: ["Keyboard", "Mouse", "Monitor", "Speaker"], correct: 1 },
      { question: "Which key is used for typing capital letters?", options: ["Ctrl", "Alt", "Shift", "Tab"], correct: 2 },
      { question: "What does left-click do?", options: ["Select item", "Delete item", "Copy item", "Move item"], correct: 0 },
      { question: "What does right-click do?", options: ["Select", "Delete", "Show menu", "Copy"], correct: 2 },
      { question: "Which key deletes text?", options: ["Enter", "Space", "Backspace", "Tab"], correct: 2 }
    ],
    'computer-2': [
      { question: "What is a folder used for?", options: ["Delete files", "Store files", "Print files", "Send files"], correct: 1 },
      { question: "How do you create a new folder?", options: ["Right click > New", "Left click", "Double click", "Press Enter"], correct: 0 },
      { question: "What is a file?", options: ["A folder", "A document", "A program", "All of these"], correct: 3 },
      { question: "How do you open a folder?", options: ["Single click", "Double click", "Right click", "Press Enter"], correct: 1 },
      { question: "How do you rename a file?", options: ["Double click", "Right click > Rename", "Left click", "Delete key"], correct: 1 }
    ],
    'computer-3': [
      { question: "What is MS Word used for?", options: ["Calculations", "Writing documents", "Internet browsing", "Playing games"], correct: 1 },
      { question: "How do you save a document?", options: ["Ctrl+S", "Ctrl+C", "Ctrl+V", "Ctrl+Z"], correct: 0 },
      { question: "How do you copy text?", options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"], correct: 0 },
      { question: "How do you paste text?", options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"], correct: 1 },
      { question: "How do you undo an action?", options: ["Ctrl+Y", "Ctrl+Z", "Ctrl+S", "Ctrl+A"], correct: 1 }
    ],
    'computer-4': [
      { question: "What is Excel used for?", options: ["Writing letters", "Calculations", "Drawing", "Music"], correct: 1 },
      { question: "What is a cell in Excel?", options: ["A row", "A column", "Intersection of row and column", "A formula"], correct: 2 },
      { question: "How do you add numbers in Excel?", options: ["=ADD()", "=SUM()", "=PLUS()", "=TOTAL()"], correct: 1 },
      { question: "What does A1 refer to?", options: ["First cell", "First row", "First column", "First sheet"], correct: 0 },
      { question: "How do you enter a formula?", options: ["Start with =", "Start with +", "Start with *", "Start with /"], correct: 0 }
    ],
    'computer-5': [
      { question: "What is PowerPoint used for?", options: ["Calculations", "Presentations", "Internet", "Games"], correct: 1 },
      { question: "What is a slide?", options: ["A page in presentation", "A calculation", "A folder", "A file"], correct: 0 },
      { question: "How do you add a new slide?", options: ["Ctrl+M", "Ctrl+N", "Ctrl+S", "Ctrl+P"], correct: 0 },
      { question: "How do you start slideshow?", options: ["F5", "F1", "F10", "F12"], correct: 0 },
      { question: "What can you add to slides?", options: ["Text", "Images", "Videos", "All of these"], correct: 3 }
    ],
    'smartphone-1': [
      { question: "Where do you find phone settings?", options: ["Camera", "Messages", "Settings app", "Phone app"], correct: 2 },
      { question: "How do you adjust volume?", options: ["Volume buttons", "Home button", "Power button", "Back button"], correct: 0 },
      { question: "How do you turn on WiFi?", options: ["Settings > WiFi", "Camera", "Messages", "Phone"], correct: 0 },
      { question: "How do you change wallpaper?", options: ["Camera", "Settings > Display", "Messages", "Phone"], correct: 1 },
      { question: "Where do you find battery settings?", options: ["Camera", "Settings > Battery", "Messages", "Phone"], correct: 1 }
    ],
    'smartphone-2': [
      { question: "How do you send a WhatsApp message?", options: ["Tap call", "Tap send button", "Tap camera", "Tap menu"], correct: 1 },
      { question: "How do you add a contact in WhatsApp?", options: ["Tap + button", "Tap camera", "Tap settings", "Tap call"], correct: 0 },
      { question: "How do you make a WhatsApp call?", options: ["Tap phone icon", "Tap camera", "Tap settings", "Tap send"], correct: 0 },
      { question: "How do you send a photo?", options: ["Tap camera icon", "Tap call", "Tap settings", "Tap menu"], correct: 0 },
      { question: "How do you create a group?", options: ["Menu > New Group", "Tap call", "Tap camera", "Tap send"], correct: 0 }
    ],
    'smartphone-3': [
      { question: "How do you take a photo?", options: ["Open camera app", "Open messages", "Open settings", "Open browser"], correct: 0 },
      { question: "Where are photos stored?", options: ["Messages", "Gallery/Photos app", "Settings", "Phone app"], correct: 1 },
      { question: "How do you switch to front camera?", options: ["Tap flip icon", "Volume button", "Power button", "Home button"], correct: 0 },
      { question: "How do you zoom in photo?", options: ["Pinch to zoom", "Volume up", "Power button", "Home button"], correct: 0 },
      { question: "How do you record video?", options: ["Tap video mode", "Volume button", "Power button", "Home button"], correct: 0 }
    ],
    'smartphone-4': [
      { question: "Where do you download apps?", options: ["Settings", "Camera", "App Store/Play Store", "Messages"], correct: 2 },
      { question: "How do you install an app?", options: ["Tap Install", "Tap Delete", "Tap Share", "Tap Call"], correct: 0 },
      { question: "How do you search for apps?", options: ["Use search bar", "Tap camera", "Tap settings", "Tap phone"], correct: 0 },
      { question: "How do you update apps?", options: ["Tap Update", "Tap Delete", "Tap Share", "Tap Call"], correct: 0 },
      { question: "How do you uninstall apps?", options: ["Long press > Uninstall", "Tap Install", "Tap Share", "Tap Call"], correct: 0 }
    ],
    'smartphone-5': [
      { question: "What do you need for mobile banking?", options: ["Camera only", "Internet connection", "Headphones", "USB cable"], correct: 1 },
      { question: "How do you check account balance?", options: ["Call bank", "Use banking app", "Send SMS", "Visit branch only"], correct: 1 },
      { question: "How do you transfer money?", options: ["Use transfer option", "Call bank", "Send SMS", "Visit branch only"], correct: 0 },
      { question: "What is UPI?", options: ["Unified Payment Interface", "User Phone Interface", "Universal Payment Internet", "User Payment Interface"], correct: 0 },
      { question: "How do you pay bills?", options: ["Bill payment option", "Call bank", "Send SMS", "Visit branch only"], correct: 0 }
    ],
    'internet-1': [
      { question: "What is a web browser?", options: ["A game", "App to browse internet", "A calculator", "A camera"], correct: 1 },
      { question: "Which is a web browser?", options: ["WhatsApp", "Chrome", "Calculator", "Camera"], correct: 1 },
      { question: "What is the address bar?", options: ["Where you type website address", "Volume control", "Camera button", "Phone dialer"], correct: 0 },
      { question: "What does refresh button do?", options: ["Reload webpage", "Close browser", "Open new tab", "Delete history"], correct: 0 },
      { question: "How do you go back to previous page?", options: ["Back button", "Forward button", "Home button", "Refresh button"], correct: 0 }
    ],
    'internet-2': [
      { question: "What is Google used for?", options: ["Making calls", "Searching information", "Taking photos", "Playing music"], correct: 1 },
      { question: "How do you search on Google?", options: ["Type and press Enter", "Take a photo", "Make a call", "Send message"], correct: 0 },
      { question: "What are search results?", options: ["List of relevant websites", "Photos", "Videos only", "Games"], correct: 0 },
      { question: "How do you search for images?", options: ["Click Images tab", "Type 'image'", "Use camera", "Make a call"], correct: 0 },
      { question: "What is Google Maps?", options: ["Navigation service", "Email service", "Photo storage", "Music player"], correct: 0 }
    ],
    'internet-3': [
      { question: "What is email used for?", options: ["Taking photos", "Sending messages", "Making calls", "Playing games"], correct: 1 },
      { question: "What do you need to create email?", options: ["Phone number only", "Username and password", "Camera", "Music app"], correct: 1 },
      { question: "What is email address format?", options: ["name@domain.com", "name.domain.com", "name-domain-com", "name_domain_com"], correct: 0 },
      { question: "What is inbox?", options: ["Received emails", "Sent emails", "Deleted emails", "Draft emails"], correct: 0 },
      { question: "How do you compose email?", options: ["Click Compose button", "Click Inbox", "Click Settings", "Click Logout"], correct: 0 }
    ],
    'internet-4': [
      { question: "What should you do with suspicious emails?", options: ["Open them", "Delete them", "Forward them", "Reply to them"], correct: 1 },
      { question: "What makes a strong password?", options: ["123456", "Your name", "Mix of letters and numbers", "password"], correct: 2 },
      { question: "What is phishing?", options: ["Fake emails to steal info", "Fishing for fish", "Email attachment", "Email signature"], correct: 0 },
      { question: "What is two-factor authentication?", options: ["Extra security step", "Two passwords", "Two email accounts", "Two browsers"], correct: 0 },
      { question: "What should you never share online?", options: ["Personal information", "Funny videos", "News articles", "Weather updates"], correct: 0 }
    ],
    'internet-5': [
      { question: "What is Facebook used for?", options: ["Banking", "Social networking", "Shopping only", "Navigation"], correct: 1 },
      { question: "How do you add friends on social media?", options: ["Send friend request", "Call them", "Send SMS", "Email them"], correct: 0 },
      { question: "What is a social media profile?", options: ["Your personal page", "Friend list", "Photo album", "Message inbox"], correct: 0 },
      { question: "What is a post on social media?", options: ["Content you share", "Friend request", "Private message", "Account settings"], correct: 0 },
      { question: "What does 'like' mean on social media?", options: ["Show appreciation", "Send message", "Add friend", "Block user"], correct: 0 }
    ],
    'apps-1': [
      { question: "What does Google Maps help with?", options: ["Shopping", "Navigation", "Messaging", "Photography"], correct: 1 },
      { question: "How do you search for a location?", options: ["Type location name", "Take a photo", "Make a call", "Send message"], correct: 0 },
      { question: "What is GPS?", options: ["Global Positioning System", "Google Photo Service", "General Phone Settings", "Google Play Store"], correct: 0 },
      { question: "How do you get directions?", options: ["Tap Directions button", "Take a photo", "Make a call", "Send message"], correct: 0 },
      { question: "What are different route options?", options: ["Fastest, shortest, avoid tolls", "Only fastest", "Only shortest", "No options"], correct: 0 }
    ],
    'apps-2': [
      { question: "What is YouTube used for?", options: ["Banking", "Shopping", "Watching videos", "Navigation"], correct: 2 },
      { question: "How do you search for videos?", options: ["Take photo", "Type in search box", "Make call", "Send message"], correct: 1 },
      { question: "How do you subscribe to a channel?", options: ["Click Subscribe button", "Like video", "Share video", "Comment on video"], correct: 0 },
      { question: "What does like button do?", options: ["Show you enjoyed video", "Subscribe to channel", "Download video", "Share video"], correct: 0 },
      { question: "How do you adjust video quality?", options: ["Click settings gear", "Volume button", "Like button", "Share button"], correct: 0 }
    ],
    'apps-3': [
      { question: "What are online shopping apps used for?", options: ["Navigation", "Buying products", "Making calls", "Taking photos"], correct: 1 },
      { question: "How do you buy something online?", options: ["Add to cart and pay", "Take a photo", "Make a call", "Send SMS"], correct: 0 },
      { question: "What is shopping cart?", options: ["Items selected for purchase", "Payment method", "Delivery address", "Product reviews"], correct: 0 },
      { question: "How do you search for products?", options: ["Use search bar", "Take a photo", "Make a call", "Send SMS"], correct: 0 },
      { question: "What are product reviews?", options: ["Customer feedback", "Product price", "Delivery time", "Payment options"], correct: 0 }
    ],
    'apps-4': [
      { question: "How do you pay using digital payment apps?", options: ["Scan QR code", "Make a call", "Send SMS", "Take photo"], correct: 0 },
      { question: "What do you need for digital payments?", options: ["Camera only", "Bank account", "Music app", "Games"], correct: 1 },
      { question: "What is UPI ID?", options: ["Unique payment identifier", "User phone interface", "Universal payment internet", "User personal information"], correct: 0 },
      { question: "How do you send money to someone?", options: ["Enter their UPI ID or scan QR", "Make a call", "Send SMS", "Take photo"], correct: 0 },
      { question: "What is transaction PIN?", options: ["Security code for payments", "Phone number", "Account number", "App password"], correct: 0 }
    ],
    'apps-5': [
      { question: "What are government service apps used for?", options: ["Games", "Official services", "Music", "Photos"], correct: 1 },
      { question: "How do you access government services online?", options: ["Use official apps", "Call friends", "Send SMS", "Take photos"], correct: 0 },
      { question: "What is Aadhaar?", options: ["Unique identity number", "Bank account", "Phone number", "Email address"], correct: 0 },
      { question: "What is DigiLocker?", options: ["Digital document storage", "Photo storage", "Music storage", "Game storage"], correct: 0 },
      { question: "How do you apply for certificates online?", options: ["Fill online application", "Call office", "Send SMS", "Take photos"], correct: 0 }
    ]
  }), []);

  if (!isOpen || !quiz) return null;

  const questions = quizData[quiz.id as keyof typeof quizData] || [];
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate score
        const correctAnswers = newAnswers.filter((answer, index) => answer === questions[index].correct).length;
        const finalScore = Math.round((correctAnswers / questions.length) * 100);
        setScore(finalScore);
        
        // Save quiz score
        if (updateQuizScore) {
          updateQuizScore(quiz.id, finalScore);
        }
        
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            {score >= 70 ? (
              <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-4xl font-bold text-blue-600 mb-2">{score}%</p>
            <p className="text-gray-600">
              {score >= 70 ? 'Great job! You passed!' : 'Keep practicing to improve!'}
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                resetQuiz();
                onClose();
              }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{currentQ?.question}</h3>
          </div>

          <div className="space-y-3 mb-6">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              selectedAnswer !== null
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;