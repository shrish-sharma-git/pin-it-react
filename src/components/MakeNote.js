import React from 'react';
import { Button, Container, Typography, TextField, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { firestore } from '../firebase/config';

import { useAuth } from '../context/authContext';
import { useHistory } from 'react-router-dom';

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

    const [category, setCategory] = useState('Miscellaneous');

    const { currentUser } = useAuth();

    const history = useHistory();

    const authorId = currentUser.uid;

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
            firestore.collection('notes').add({
                Title: title,
                Content: content,
                Category: category,
                authorId: authorId,
                createdAt: new Date()
            }).then(() => {
                console.log('Note Added Successfully!');
                history.push('/');
            }).catch((err) => {
                console.error("Error Adding Note.", err);
            })
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

                <FormControl className={classes.field}>
                    <FormLabel>Categories</FormLabel>
                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="Todo" control={<Radio />} label="Todo" />
                    <FormControlLabel value="Study" control={<Radio />} label="Study" />
                    <FormControlLabel value="Work" control={<Radio />} label="Work" />
                    <FormControlLabel value="Reminder" control={<Radio />} label="Reminder" />
                    <FormControlLabel value="Miscellaneous" control={<Radio />} label="Miscellaneous" />
                    </RadioGroup>
                </FormControl>

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