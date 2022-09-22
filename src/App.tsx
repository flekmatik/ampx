import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./pages/login/LoginPage";
import {MainPage} from "./pages/main/MainPage";

const authKey = 'auth';

function App() {
    const [username, setUsername] = useState(localStorage.getItem(authKey) || '');
    return (
        <div className="App">
            {username
                ? <MainPage />
                : (
                    <LoginPage
                        onLogin={username => {
                            localStorage.setItem(authKey, username);
                            setUsername(username);
                        }}
                    />
                )}
        </div>
    );
}

export default App;
