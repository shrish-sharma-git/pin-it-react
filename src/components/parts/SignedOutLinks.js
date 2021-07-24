import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import { useHistory } from 'react-router-dom';

const SignedOutLinks = () => {
    const history = useHistory();

    return (  
        <List>
            <ListItem
                button
                onClick={() => history.push('/SignIn')}
            >
            <ListItemIcon>
                <LockOpenSharpIcon/>
            </ListItemIcon>
            <ListItemText primary="Login"/>
            </ListItem>
            <ListItem
                button
                onClick={() => history.push('/SignUp')}
            >
            <ListItemIcon>
                <LockOpenSharpIcon/>
            </ListItemIcon>
            <ListItemText primary="Sign Up"/>
            </ListItem>
        </List>
    );
}
 
export default SignedOutLinks;