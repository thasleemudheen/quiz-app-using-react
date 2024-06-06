import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { incrementScore,resetScore } from "./store";
import './Quiz.css';

const Quiz = () => {
    const { difficulty } = useParams();
    // const navigate = useNavigate();
    const dispatch=useDispatch()
    const score=useSelector((state)=>state.quiz.score)

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();
            console.log("API Response:", data); // Log the API response
            if (data && data.results) {
                if (data.results.length > 0) {
                    const shuffledQuestions = data.results.map((question) => {
                        const answers = [...question.incorrect_answers, question.correct_answer];
                        return {
                            ...question,
                            answers: shuffleArray(answers),
                        };
                    });
                    setQuestions(shuffledQuestions);
                } else {
                    console.error("No questions returned for the selected difficulty level.");
                }
            } else {
                console.error("Error fetching the questions: Invalid response format.");
            }
        } catch (error) {
            console.error("Error fetching the questions:", error);
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        fetchQuestions();
    }, [difficulty]);

    const handleSelectAnswer = (answer) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answer);
            if (answer === questions[currentQuestionIndex]?.correct_answer) {
                dispatch(incrementScore());
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        dispatch(resetScore());
        fetchQuestions();
    };

    return (
        <div className="quiz-container">
            {showResult ? (
                <div className="result-container">
                    <h1>Quiz Result</h1>

                    <h3>You have completed the quiz!</h3>
                    <h2>You scored <strong id="score">{score} </strong> out of<span id="total"> {questions.length} </span> </h2>

                    <button onClick={handleRetry} className="retry-button">Retry</button>
                </div>
            ) : (
                <div className="question-container">
                    <h1 className="question-heading">Question {currentQuestionIndex + 1}</h1>
                    <h2 className="question-text">{questions[currentQuestionIndex]?.question}</h2>
                    <ol className="answer-list">

                        {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectAnswer(answer)}
                                className={`answer-item ${selectedAnswer
                                    ? answer === questions[currentQuestionIndex]?.correct_answer
                                        ? "correct-answer"
                                        : selectedAnswer === answer
                                        ? "wrong-answer"
                                        : ""
                                    : ""}`}
                            >
                                {answer}
                            </li>
                        ))}
                    </ol>
                    <button onClick={handleNextQuestion} disabled={!selectedAnswer} className="next-button">Next Question</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
