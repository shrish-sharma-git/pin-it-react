import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { firestore } from '../firebase/config';
import NoteCard from './parts/StickyCard';

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

    console.log(notes);

    return (  
        <Container>
            <Grid container spacing={3}>
                {notes.map(note => (
                    <Grid item key={note.id} xs={12} md={6} lg={4}>
                        <NoteCard note={note}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default Notes;