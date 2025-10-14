import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  return (
    <div className='faq-content py-20 px-0'>
        <section>
        <div className="container">
            <div className='text-center mb-12' >
                <h2 className='text-4xl font-semibold mb-4 text-[#212529]'>Frequently Asked Questions</h2>
                <p className='max-w-150 mx-auto text-[#6c757d]'>Find answers to common questions about QuizMaster</p>
            </div>
            
            <div className='max-w-200 mx-auto my-0 ' >
                <div className="  rounded-lg mb-4 shadow-[0 2px 10px (0, 0, 0.05)] card">
                    <div className="p-5 items-center flex cursor-pointer justify-between ">
                        <span>How do I create an account?</span>
                       <ChevronDown/>
                    </div>
                    <div className="px-5 transition:max-h 0.3s, p-0.3s">
                        <p>Creating an account is easy! Simply click on the "Sign Up" button in the top right corner, enter your email address, choose a password, and you're ready to start quizzing!</p>
                    </div>
                </div>
                
                <div className=" rounded-lg mb-4 shadow-[0 2px 10px (0, 0, 0.05)] card">
                    <div className="p-5 items-center flex cursor-pointer justify-between">
                        <span>Is QuizMaster free to use?</span>
                        <ChevronDown/>
                    </div>
                    <div className="px-5 transition:max-h 0.3s, p-0.3s">
                        <p>Yes, QuizMaster offers a free plan with access to thousands of quizzes. We also offer a premium subscription with additional features like ad-free experience, detailed analytics, and exclusive quizzes.</p>
                    </div>
                </div>
                
                <div className="card rounded-lg mb-4 shadow-[0 2px 10px (0, 0, 0.05)]">
                    <div className="p-5 items-center flex cursor-pointer justify-between">
                        <span>Can I create my own quizzes?</span>
                     <ChevronDown/>
                    </div>
                    <div className="px-5 transition:max-h 0.3s, p-0.3s">
                        <p>Absolutely! Our quiz creation tools allow you to easily create custom quizzes on any topic. You can share them with friends or make them public for the entire QuizMaster community to enjoy.</p>
                    </div>
                </div>
                
                <div className="card rounded-lg mb-4 shadow-[0 2px 10px (0, 0, 0.05)]">
                    <div className="p-5 items-center flex cursor-pointer justify-between">
                        <span>How are the leaderboards calculated?</span>
                     <ChevronDown/>
                    </div>
                    <div className="px-5 transition:max-h 0.3s, p-0.3s">
                        <p>Leaderboard rankings are based on a combination of factors including quiz scores, number of quizzes completed, accuracy rate, and difficulty of quizzes attempted. Points are updated in real-time as you complete quizzes.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
