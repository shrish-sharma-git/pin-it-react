import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import React from 'react';

const NoteCard = ({ note }) => {
    return (      
        <div>
            <Card elevation={3}>
                <CardHeader
                    action={
                        <IconButton onClick={() => console.log('Delete', note.Title)}>
                            <DeleteOutlined/>
                        </IconButton>
                    }
                    title={note.Title}
                    subheader={note.Category}
                />
                <CardContent>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                    >
                        {note.Content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default NoteCard;