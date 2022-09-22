import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./pages/login/LoginPage";
import {MainPage, Model} from "./pages/main/MainPage";

const authKey = 'auth';

const emptyModel: Model = {
    transactions: [],
};

const getModelKey = (username: string) => `${username}-model`;
const getModel = (username: string) => {
    const modelKey = getModelKey(username);
    const jsonModel = localStorage.getItem(modelKey);
    return jsonModel && JSON.parse(jsonModel);
}

function App() {
    const [username, setUsername] = useState(localStorage.getItem(authKey) ?? '');
    const [model, setModel] = useState<Model | undefined>(getModel(username));

    return model
        ? (
            <MainPage
                model={model || emptyModel}
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
                    const model = getModel(u);
                    setModel(model ?? emptyModel);
                    setUsername(username);
                }}
            />
        );
}

export default App;
