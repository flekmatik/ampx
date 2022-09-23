import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage, Model } from './pages/MainPage/MainPage';

dayjs.extend(utc);

const authKey = 'auth';

const emptyModel: Model = {
    transactions: [],
    categories: [
        {
            id: 'basic',
            title: 'Basic',
            color: '#0000FF',
        },
        {
            id: 'enhanced',
            title: 'Enhanced',
            color: '#FFFF00',
        },
    ],
};

const getModelKey = (username: string) => `${username}-model`;
const getModel = (username: string) => {
    const modelKey = getModelKey(username);
    const jsonModel = localStorage.getItem(modelKey);
    return jsonModel && JSON.parse(jsonModel);
};

export function App() {
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
                    setUsername(u);
                }}
            />
        );
}
