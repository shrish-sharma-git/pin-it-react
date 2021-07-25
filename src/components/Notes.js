import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { firestore } from '../firebase/config';
import NoteCard from './parts/StickyCard';
import {useAuth} from '../context/authContext';

const Notes = () => {
    // State Hook
    const [notes, setNotes] = useState([]);
    const { currentUser } = useAuth();
    const userUid = currentUser.uid;

    // Fetching Data
    useEffect(() => {
        const data = firestore.collection('notes')
            .where('authorId', '==', userUid)     
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

    const handleDelete = async (id) => {
        await firestore.collection('notes').doc(id).delete()
            .then(() => {
                console.log('Note Deleted.')
                const newNotes = notes.filter(note => note.id != id)
                setNotes(newNotes);
            })
    }

    return (  
        <Container>
            <Grid container spacing={3}>
                {notes.map(note => (
                    <Grid item key={note.id} xs={12} md={6} lg={4}>
                        <NoteCard note={note} handleDelete={handleDelete}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default Notes;