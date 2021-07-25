import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { firestore } from '../firebase/config';
import NoteCard from './parts/StickyCard';
import {useAuth} from '../context/authContext';
import Masonry from 'react-masonry-css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    masonryGrid: {
        display: 'flex',
        marginLeft: "-30px",
        width: 'auto'
    },
    masonryGridCol: {
        paddingLeft: "30px",
        backgroundClip: "padding-box"
    },
    masonryDiv: {
        marginBottom: "30px"
    }
})

const Notes = () => {
    // Style Hook
    const classes = useStyles();

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

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (  
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                className={classes.masonryGrid}
                columnClassName={classes.masonryGridCol}
            >
                {notes.map(note => (
                    <div className={classes.masonryDiv} item key={note.id} xs={12} md={6} lg={4}>
                        <NoteCard note={note} handleDelete={handleDelete}/>
                    </div>
                ))}
            </Masonry>
        </Container>
    );
}
 
export default Notes;