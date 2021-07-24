import React from 'react';
import { Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from '../../context/authContext';

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

    const { currentUser } = useAuth();

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
                            SS
                        </Avatar>
                        <CardContent className={classes.content}>
                            <Typography
                                variant="h4"
                            >
                                Shrish Sharma
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