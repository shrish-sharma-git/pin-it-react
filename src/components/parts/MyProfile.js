import React, { useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from '../../context/authContext';
import { firestore } from '../../firebase/config';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        marginBottom: 20,
        width: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center"
    },
    avatar: {
        backgroundColor: "red",
        alignSelf: "center"
    },
    header: {
        textAlign: "center"
    },
    content: {
        textAlign: "center",
    }
})

const MyProfile = () => {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    // Fetching UserData
    const userUid = currentUser.uid;
    const [username, setUsername] = useState();

    useEffect(() => {
        firestore.collection('users').doc(userUid).get()
            .then(snap => {
                var data = snap.data();
                console.log(data)
                setUsername(data)
            }).catch((e) => console.log(e))

    }, [])
    
    const [error, setError] = useState("")

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

    return (  
        <div>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Card 
                        className={classes.root}
                    >
                        <CardHeader 
                            title="My Profile"
                            className={classes.header}
                        />
                        <Avatar className={classes.avatar}>
                            {username && username.initials}
                        </Avatar>
                        <CardContent className={classes.content}>
                            <Typography
                                variant="h4"
                            >
                                {username && username.firstName + " " + username.lastName}
                            </Typography>
                            <Typography
                                variant="h6"
                            >
                                {currentUser.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Button 
                    endIcon={<ExitToAppSharpIcon/>}
                    color="primary"
                    variant="contained"
                    onClick={handleLogout}
                >
                    Sign Out
                </Button>
            </Grid>
        </div>  
    );
}
 
export default MyProfile;