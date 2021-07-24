import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { useHistory } from 'react-router-dom';
import { DashboardRounded } from '@material-ui/icons';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { useAuth } from '../../context/authContext';

const SignedInLinks = () => {
    const history = useHistory();

    const { logout } = useAuth();

    // Handling Logout
    const handleLogout = () => {
        logout()
        console.log('Signed Out Successfully!');
        history.push('/SignIn');
    }

    const menuItems = [
        {
            text: 'My Notes',
            icon: <DashboardRounded/>,
            path: '/'
        },
        {
            text: 'Make Note',
            icon: <AddCircleOutlineSharpIcon/>,
            path: '/MakeNote'
        }
    ]
    return (  
        <div>
            <Divider/>
            <List>
                {menuItems.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem
                    button
                >
                <ListItemIcon>
                    <AccountCircle/>
                </ListItemIcon>
                <ListItemText primary="My Profile"/>
                </ListItem>
                <ListItem
                    button
                    onClick={handleLogout}
                >
                <ListItemIcon>
                    <ExitToAppSharpIcon/>
                </ListItemIcon>
                <ListItemText primary="Sign Out"/>
                </ListItem>
            </List>
        </div>
    );
}
 
export default SignedInLinks;