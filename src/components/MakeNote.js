import React from 'react';
import { Button, Container, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Custom CSS Hook
const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

const MakeNote = () => {
    // Custom CSS Hook Ref
    const classes = useStyles();

    // State Hooks for TextFields
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setTitleError(false);
        setContentError(false);

        if(title === ''){
            setTitleError(true);
        }

        if(content === ''){
            setContentError(true);
        }

        if(title && content){
            console.log(title, content);
        }
    }

    return (  
        <Container>
            <Typography
                variant="h6"
                component="h2"
                color="primary"
                align="center"
                gutterBottom
            >
                Create a Sticky Note
            </Typography>
            
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.field}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    error={titleError}
                />
                <TextField 
                    className={classes.field}
                    onChange={(e) => setContent(e.target.value)}
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={contentError}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained">
                    Make Note        
                </Button>     
            </form>   
        </Container>
    );
}
 
export default MakeNote;