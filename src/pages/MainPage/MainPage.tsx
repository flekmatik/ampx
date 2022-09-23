import {useState} from "react";
import {Transaction, TransactionsView} from "../../views/TransactionsView/TransactionsView";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Page, Sider} from "../../components/Sider/Sider";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {SettingsView} from "../../views/SettingsView/SettingsView";
import {ReportsView} from "../../views/ReportsView/ReportsView";

export interface Category {
    id: string;
    title: string;
    color: string;
}

export interface Model {
    transactions: Transaction[];
    categories: Category[];
}

interface MainPageProps {
    model: Model;
    onChange: (value: Model) => void;
    onLogout: () => void;
}

export const MainPage = (props: MainPageProps) => {
    const [page, setPage] = useState<Page>('transactions');

    const getContent = () => {
        switch (page) {
            case "transactions":
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
            case "settings":
                return (
                    <SettingsView
                        usedCategoryIds={props.model.transactions
                            .map(t => t.categoryId)
                            .filter((id, index, arr) => arr.indexOf(id) === index)}
                        categories={props.model.categories}
                        onChange={value => props.onChange({
                            ...props.model,
                            categories: value
                        })}
                    />
                );
            case "reports":
                return (
                    <ReportsView transactions={props.model.transactions} categories={props.model.categories}/>
                );
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <AccountBalanceWalletIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'left'}}>
                        Amp X Expenses tracker
                    </Typography>
                    <Button color="inherit" onClick={() => props.onLogout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{display: 'flex'}}>
                <Sider
                    page={page}
                    onChange={page => setPage(page)}
                />
                <Box sx={{padding: '16px', flexGrow: 1}}>
                    {getContent()}
                </Box>
            </Box>
        </Box>
    );
}
