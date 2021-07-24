import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { useHistory } from 'react-router-dom';

const SignedInLinks = ( ) => {
    const history = useHistory();
    return (  
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
            >
            <ListItemIcon>
                <ExitToAppSharpIcon/>
            </ListItemIcon>
            <ListItemText primary="Sign Out"/>
            </ListItem>
        </List>
    );
}
 
export default SignedInLinks;