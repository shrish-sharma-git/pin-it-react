import React, { useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from '../../context/authContext';
import { firestore } from '../../firebase/config';
import { useState } from 'react';

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

    // Fetching UserData
    const { currentUser } = useAuth();
    const userUid = currentUser.uid;
    const [username, setUsername] = useState();

    useEffect(() => {
        firestore.collection('users')
        .doc(userUid)
        .get()
        .then((doc) => {
            if(doc.exists){
                var data = doc.data();
                setUsername(data);
                console.log(data);
            }
            else {
                console.log("No data fetched")
            }
        }).catch((err) => {
            console.log("error", err);
        })
    }, [])
    
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
                            {username.initials}
                        </Avatar>
                        <CardContent className={classes.content}>
                            <Typography
                                variant="h4"
                            >
                                {username.firstName + " " + username.lastName}
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
                >
                    Sign Out
                </Button>
            </Grid>
        </div>  
    );
}
 
export default MyProfile;