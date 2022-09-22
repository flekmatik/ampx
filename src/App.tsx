import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./pages/login/LoginPage";
import {MainPage, Model} from "./pages/main/MainPage";

const authKey = 'auth';

const emptyModel: Model = {
    transactions: [],
};

const getModelKey = (username: string) => `${username}-model`;

function App() {
    const [username, setUsername] = useState(localStorage.getItem(authKey) || '');
    const [model, setModel] = useState<Model>();

    return (
        <div className="App">
            {model
                ? (
                    <MainPage
                        model={model}
                        onChange={m => {
                            setModel(m);
                            localStorage.setItem(getModelKey(username), JSON.stringify(m));
                        }}
                        onLogout={() => {
                            localStorage.removeItem(authKey);
                            setModel(undefined);
                        }}
                    />
                )
                : (
                    <LoginPage
                        onLogin={u => {
                            localStorage.setItem(authKey, u);
                            const modelData = localStorage.getItem(getModelKey(u));
                            setModel(modelData
                                ? JSON.parse(modelData)
                                : emptyModel);
                            setUsername(username);
                        }}
                    />
                )}
        </div>
    );
}

export default App;
