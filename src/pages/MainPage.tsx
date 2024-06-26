import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../src/css/style.css';

interface Props {}

interface State {
    nickname: string;
}

const MainPage: React.FC<Props> = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [nickname, setNickname] = React.useState<string>('');

    React.useEffect(() => {
        const storedNickname = localStorage.getItem('nickname');
        if (storedNickname) {
            setNickname(storedNickname);
        }
    }, []);

    const handleButtonClick = () => {
        const inputElement = inputRef.current;
        if (!inputElement) return;

        const nickname = inputElement.value.trim();

        if (nickname === '') {
            window.alert('닉네임을 입력해주세요!');
        } else {
            localStorage.setItem('nickname', nickname);
            // Replace '/portfolio' with your desired route
            window.location.href = '/portfolio';
        }
    };

    return (
        <>
            <div className="container">
                <div className="mainContainer">
                    {!nickname && (
                        <input
                            ref={inputRef}
                            className="mainNickname"
                            placeholder="닉네임을 입력해주세요!"
                        />
                    )}
                    {nickname ? (
                        <Link to="/portfolio">
                            <button className="mainBtn">{`Welcome, ${nickname}!`}</button>
                        </Link>
                    ) : (
                        <button className="mainBtn" onClick={handleButtonClick}>
                            Welcome
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default MainPage;
