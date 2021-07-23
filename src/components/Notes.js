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
            .orderBy('createdAt', 'desc')
            .get()
            .then(snap => {
                const documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                })
                setNotes(documents);
            })
    }, [])

    console.log(notes)

    return (  
        <div className="notes">
            <Grid container>
                {notes.map(note => (
                    <Grid item key={note.id} xs={12} md={6} lg={4}>
                        <Paper>{ note.Title }</Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
 
export default Notes;