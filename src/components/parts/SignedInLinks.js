import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { DashboardRounded } from '@material-ui/icons';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';

const SignedInLinks = () => {
    const history = useHistory();
    const [error, setError] = useState("")

    const { logout } = useAuth();

    // Handling Logout
    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/SignIn")
        } catch {
          setError("Failed to log out")
        }
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
        },
        {
            text: 'My Profile',
            icon: <AccountCircle/>,
            path: '/MyProfile'
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
        </div>
    );
}
 
export default SignedInLinks;