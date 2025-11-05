import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        'Creating an account is easy! Simply click on the "Sign Up" button in the top right corner, enter your email address, choose a password, and you\'re ready to start quizzing!',
    },
    {
      question: "Is QuizTech free to use?",
      answer:
        "Yes, QuizTech offers a free plan with access to thousands of quizzes. We also offer a premium subscription with additional features like ad-free experience, detailed analytics, and exclusive quizzes.",
    },
    // {
    //   question: "Can I create my own quizzes?",
    //   answer:
    //     "Absolutely! Our quiz creation tools allow you to easily create custom quizzes on any topic. You can share them with friends or make them public for the entire QuizMaster community to enjoy.",
    // },
    {
      question: "How are the leaderboards calculated?",
      answer:
        "Leaderboard rankings are based on a combination of factors including quiz scores, number of quizzes completed, accuracy rate, and difficulty of quizzes attempted. Points are updated in real-time as you complete quizzes.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-content py-20 px-0">
      <section>
        <div className="container ">
          <div className="text-center mb-12 ">
            <h2 className="text-4xl font-semibold mb-4 ">
              Frequently Asked Questions
            </h2>
            <p className="max-w-150 mx-auto ">
              Find answers to common questions about QuizTech
            </p>
          </div>

          <div className="max-w-2xl lg:mx-auto mx-3 ">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg mb-4 shadow-md border  overflow-hidden"
              >
                <div
                  className="p-5 flex items-center justify-between cursor-pointer transition"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`px-5 overflow-hidden transition-all duration-500 ${
                    openIndex === index ? "max-h-40 py-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
