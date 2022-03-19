import Head from 'next/head'
import { useState } from 'react/cjs/react.development';
import questions from '../questions.json'

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [pass, setPass] = useState(false);
  const options = ['A', 'B', 'C', 'D']

  // functionality to return to previous question
  const handlePrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex)
    }
  };

  // handles the score and switches to next question when selected an option
  const handleAnswerClick = (response) => {

    if (response === true) {
      setScore(oldScore => oldScore + 1)
    }
    if (currentIndex == questions.length - 1) {
      { score >= 8 ? setPass(true) : setPass(false) }
      setQuizFinished(true);
    }
    else {
      setCurrentIndex(oldIndex => oldIndex + 1)
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Head>
        <title>Quiz app</title>
      </Head>

      <div className='flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center bg-gradient-to-b from-cyan-200 to-cyan-500'>
        {quizFinished ? (
          pass ? (<div className='text-3xl font-semibold text-center bg-white w-8/12 p-4 rounded-xl font-sans font-semibold text-2xl' >
            Congrats!! You passed the quiz <br /> Your score is {score} out of {questions.length}
          </div>
          ) : (<div className='text-3xl font-semibold text-center bg-white w-8/12 p-4 rounded-xl font-sans font-semibold text-2xl'>
            Oops! better luck next time.. <br />Your score is {score} out of {questions.length}
          </div>)
        ) : (
          <>
            {/* progress bar */}
            <div className='w-full bg-gray-200 h-5 rounded-xl'>
              <div className='bg-gradient-to-r from-sky-400 to-indigo-500 h-5 rounded-xl' style={{ width: `${(currentIndex + 1) * 10}%` }}></div>
            </div>

            {/* to display questions */}
            <div className="flex flex-col items-center w-full divide-y-2 text-sky-900 divide-sky-900">
              <h4 className="mt-10 text-sm font-semibold">Question <span className='text-3xl font-bold'>{currentIndex + 1}</span> / {questions.length}</h4>
              <div className="my-4 text-xl font-bold">
                {questions[currentIndex].question}
              </div>
            </div>

            {/* display the options for the current question */}
            <div className="flex flex-col w-full">
              {questions[currentIndex].answerOptions.map((answer, index) => {
                return <button className='w-full flex flex-row text-sky-900 font-semibold p-2 m-2 ml-0 space-x-2 border-2 bg-white border-white/10 rounded-xl options'
                  onClick={() => handleAnswerClick(answer.isCorrect)}
                  key={answer.answerText}
                ><span className='flex w-10 mr-4 bg-white text-black rounded-xl justify-center font-bold optionsIndex'>{options[index]}</span>{answer.answerText}</button>
              })}
            </div>

            {/* previous button */}
            <div className="flex justify-center w-full mt-4 text-white">
              <button className="w-[35%] py-3 rounded-lg previousButton font-semibold text-xl" onClick={handlePrevious}>Previous</button>
            </div>
          </>
        )}

      </div>
    </div >

  )
}
