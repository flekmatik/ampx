import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export type Page = 'transactions' | 'reports' | 'settings';

interface SiderProps {
    page: Page;
    onChange: (value: Page) => void;
}

const items: { key: Page, title: string, icon: JSX.Element }[] = [
    {
        key: 'transactions',
        title: 'Transactions',
        icon: <ReceiptIcon />,
    },
    {
        key: 'reports',
        title: 'Reports',
        icon: <AssessmentIcon />,

    },
    {
        key: 'settings',
        title: 'Settings',
        icon: <SettingsIcon />,
    },
];

export const Sider = (props: SiderProps) => {
    return (
        <div>
            <Box
                sx={{ width: 250 }}
                role="presentation"
            >
                <List>
                    {items.flatMap(item => (
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={props.page === item.key}
                                onClick={() => props.onChange(item.key)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};
