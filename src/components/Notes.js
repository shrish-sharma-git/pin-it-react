import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { firestore } from '../firebase/config';

const Notes = () => {
    // State Hook
    const [notes, setNotes] = useState([]);

    // Fetching Data
    useEffect(() => {
        const data = firestore.collection('notes')
            .get()
            .then((snapshot) => {
                snapshot.forEach(element => {
                    const data = snapshot.docs.map(doc => ({...doc.data(), key: doc.id}));
                    setNotes(data);
                    console.log("Fetched Data", data);
                });
            })
    }, [])

    return (  
        <div className="notes">
            <Grid container>
                {notes && notes.map(note => {
                    return (
                    <Grid item key={note.id} xs={12}>
                        <Paper>{ note.Title }</Paper>
                    </Grid>
                )
                })}
            </Grid>
        </div>
    );
}
 
export default Notes;