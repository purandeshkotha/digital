import React, { useState } from 'react';
import { CheckCircle, X, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface CategoryQuizProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  categoryName: string;
}

const CategoryQuiz: React.FC<CategoryQuizProps> = ({ isOpen, onClose, category, categoryName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const quizData: Record<string, Question[]> = {
    computer: [
      { id: 1, question: "What is the main input device for typing?", options: ["Mouse", "Keyboard", "Monitor", "Speaker"], correct: 1 },
      { id: 2, question: "Which button is used to left-click?", options: ["Right button", "Left button", "Middle button", "Scroll wheel"], correct: 1 },
      { id: 3, question: "What does CPU stand for?", options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"], correct: 1 },
      { id: 4, question: "Which key is used to delete text?", options: ["Enter", "Shift", "Backspace", "Ctrl"], correct: 2 },
      { id: 5, question: "What is a folder used for?", options: ["Playing music", "Storing files", "Browsing internet", "Typing text"], correct: 1 }
    ],
    smartphone: [
      { id: 1, question: "What is a smartphone?", options: ["Old phone", "Mobile computer", "Landline", "Radio"], correct: 1 },
      { id: 2, question: "How do you unlock most smartphones?", options: ["Voice", "Touch screen", "Button", "Shake"], correct: 1 },
      { id: 3, question: "What is an app?", options: ["Phone case", "Application", "Battery", "Screen"], correct: 1 },
      { id: 4, question: "Where do you download apps?", options: ["Website", "App Store", "Email", "SMS"], correct: 1 },
      { id: 5, question: "What is WhatsApp used for?", options: ["Gaming", "Messaging", "Music", "Photos"], correct: 1 }
    ],
    internet: [
      { id: 1, question: "What is the internet?", options: ["A computer", "Global network", "An app", "A phone"], correct: 1 },
      { id: 2, question: "What is a web browser?", options: ["Internet app", "Game", "Photo app", "Calculator"], correct: 0 },
      { id: 3, question: "What is a website?", options: ["App", "Online page", "Photo", "Contact"], correct: 1 },
      { id: 4, question: "What is a URL?", options: ["Password", "Web address", "Email", "Phone number"], correct: 1 },
      { id: 5, question: "What is Google?", options: ["Game", "Search engine", "Photo app", "Calculator"], correct: 1 }
    ],
    apps: [
      { id: 1, question: "What is Google Maps used for?", options: ["Gaming", "Navigation", "Music", "Photos"], correct: 1 },
      { id: 2, question: "What is PayTM?", options: ["Game", "Payment app", "Photo app", "Music app"], correct: 1 },
      { id: 3, question: "What is Aadhaar app used for?", options: ["Gaming", "ID verification", "Music", "Photos"], correct: 1 },
      { id: 4, question: "What is BHIM app?", options: ["Photo app", "Payment app", "Game", "Music app"], correct: 1 },
      { id: 5, question: "What is DigiLocker?", options: ["Game", "Document storage", "Music app", "Photo app"], correct: 1 }
    ]
  };

  const questions = quizData[category] || [];

  if (!isOpen) return null;

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
        const correctAnswers = newAnswers.filter((answer, index) => 
          answer === questions[index].correct
        ).length;
        setScore(correctAnswers);
        setShowResult(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const currentQ = questions[currentQuestion];
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            percentage >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {percentage >= 70 ? (
              <Award className="h-10 w-10 text-green-600" />
            ) : (
              <X className="h-10 w-10 text-red-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {percentage >= 70 ? 'Excellent!' : 'Keep Learning!'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={handleRestart}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{categoryName} Quiz</h2>
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">{currentQ?.question}</h3>
          
          <div className="space-y-3">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
                setSelectedAnswer(answers[currentQuestion - 1] || null);
              }
            }}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryQuiz;