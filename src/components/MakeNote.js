import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';

const MakeNote = () => {
    return (  
        <Container>
            <Typography
                variant="h6"
                component="h2"
                color="primary"
                gutterBottom
            >
                Create a Sticky Note
            </Typography>
            <Button
                onClick={() => console.log('Clicked!')}
                type="submit"
                color="secondary"
                variant="contained">
                Make Note        
            </Button>        
        </Container>
    );
}
 
export default MakeNote;