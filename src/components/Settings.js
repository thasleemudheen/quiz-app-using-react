import React from "react";
import './Settings.css'
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();

    const handleDifficultySelect = (difficulty) => {
        navigate(`/questions/${difficulty}`);
    }

    return (
        <div className="container">
            <h1 className="heading">Quiz App</h1>
            <button className="button" onClick={() => handleDifficultySelect('easy')}>Easy</button>
            <button className="button" onClick={() => handleDifficultySelect('medium')}>Medium</button>
            <button className="button" onClick={() => handleDifficultySelect('hard')}>Hard</button>
        </div>
    );
}

export default Settings;
