import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Page, Sider } from '../../components/Sider/Sider';
import { Model } from '../../interfaces';
import { ReportsView } from '../../views/ReportsView/ReportsView';
import { SettingsView } from '../../views/SettingsView/SettingsView';
import { TransactionsView } from '../../views/TransactionsView/TransactionsView';

interface MainPageProps {
    model: Model;
    onChange: (value: Model) => void;
    onLogout: () => void;
}

export const MainPage = (props: MainPageProps) => {
    const [page, setPage] = useState<Page>('transactions');

    const getContent = () => {
        switch (page) {
            case 'transactions':
                return (
                    <TransactionsView
                        items={props.model.transactions}
                        categories={props.model.categories}
                        onChange={value => props.onChange({
                            ...props.model,
                            transactions: value,
                        })}
                    />
                );
            case 'settings':
                return (
                    <SettingsView
                        usedCategoryIds={props.model.transactions
                            .map(t => t.categoryId)
                            .filter((id, index, arr) => arr.indexOf(id) === index)}
                        categories={props.model.categories}
                        onChange={value => props.onChange({
                            ...props.model,
                            categories: value,
                        })}
                    />
                );
            case 'reports':
                return (
                    <ReportsView transactions={props.model.transactions} categories={props.model.categories} />
                );
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <AccountBalanceWalletIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Amp X Expenses tracker
                    </Typography>
                    <Button color="inherit" onClick={() => props.onLogout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex' }}>
                <Sider
                    page={page}
                    onChange={page => setPage(page)}
                />
                <Box sx={{ padding: '16px', flexGrow: 1 }}>
                    {getContent()}
                </Box>
            </Box>
        </Box>
    );
};
