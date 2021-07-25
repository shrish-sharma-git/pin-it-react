import React, { useState } from 'react';
import { useEffect } from 'react';
import { firestore } from '../firebase/config';

const useProfile = (uid) => {
    const [user, setUser] = useState();

    useEffect(() => {
        firestore.collection('users')
            .doc(uid)
            .get()
            .then(snap => {
                var userData = snap.data();
                setUser(userData)
            }).catch((err) => console.log(err + "In Profile Hook"))
    }, [])

    return { user };
}
 
export default useProfile;