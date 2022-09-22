import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export type Page = 'transactions' | 'reports' | 'settings' | 'logout';

interface SiderProps {
    page: Page;
    onChange: (value: Page) => void;
}

export const Sider = (props: SiderProps) => {
    return (
        <Drawer open variant="permanent">
            <Box
                sx={{width: 250}}
                role="presentation"
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton selected={props.page === 'transactions'} onClick={() => props.onChange('transactions')}>
                            <ListItemIcon>
                                <ReceiptIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Transactions" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={props.page === 'reports'} onClick={() => props.onChange('reports')}>
                            <ListItemIcon>
                                <AssessmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Reports" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton selected={props.page === 'settings'} onClick={() => props.onChange('settings')}>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton selected={props.page === 'logout'} onClick={() => props.onChange('logout')}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
