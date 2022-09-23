import { Button, TextField } from '@mui/material';
import { useState } from 'react';

interface LoginPageProps {
    onLogin: (username: string) => void;
}

export const LoginPage = (props: LoginPageProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 10,
            }}
        >
            <TextField
                value={username}
                label="Username"
                variant="standard"
                onChange={event => setUsername(event.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="standard"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={() => props.onLogin(username)}
                disabled={!password || !username}
            >
                Login
            </Button>
        </form>
    );
};
