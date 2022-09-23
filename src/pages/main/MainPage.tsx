import {useState} from "react";
import {Transaction, Transactions} from "../../components/transactions/Transactions";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Page, Sider} from "../../components/Sider/Sider";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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
                    <Transactions
                        items={props.model.transactions}
                        categories={props.model.categories}
                        onChange={value => props.onChange({
                            ...props.model,
                            transactions: value,
                        })}
                    />
                );
        }
    }

    return (
        <Box>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
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
            <Sider
                page={page}
                onChange={page => setPage(page)}
            />
            <Box>
                <Toolbar/>
                {getContent()}
            </Box>
        </Box>
    );
}
