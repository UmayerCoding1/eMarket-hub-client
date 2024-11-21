import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from './../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';


export const  AuthContext = createContext(null);
const AuthProvider = ({children}) => {
   const [user,setUser] = useState(null);
   const [loading,setLoading] = useState(true);
   const axiosPublic = useAxiosPublic();
   const googleProvider = new GoogleAuthProvider();

   const createUser = (email,password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
   }

   const signInUser = (email,password) => {
     setLoading(true);
     return signInWithEmailAndPassword(auth,email,password);
   }

   const googleSignIn = () => {
   setLoading(true);
    return signInWithPopup(auth, googleProvider)
   }

   const logout = () => {
    setLoading(true);
    signOut(auth)
    .then(result => {}).catch(error => console.log(error.code))
   }


   useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log('currentUser', currentUser);
          setUser(currentUser);
          if(currentUser){
            const user = {email: currentUser.email};
            axiosPublic.post('/jwt', user)
            .then(res => {
                console.log(res.data.token);
                if(res.data.token){
                    localStorage.setItem('eMarketHub-Access-Token', res.data.token);
                    setLoading(false);
                }
            })
          }else{
            localStorage.removeItem('eMarketHub-Access-Token');
            setLoading(false);
          }
          return () => unSubscribe();
    })
   },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;