import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../Firebase';
import { useDispatch } from 'react-redux';
import {signInSuccess} from '../Redux/User/userslice';
import { useNavigate } from 'react-router-dom';
export default function Outh() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handelGoogleClick = async ()=>{
        try{
            const provider =new GoogleAuthProvider();
            const auth = getAuth(app);


            const result = await signInWithPopup(auth,provider)
            //send google data for database
            const res =  await fetch('/api/auth/google',{
                method:"POST",
                headers: {
                    'Content-Type':'appliction/json',
                },
                body:JSON.stringify({name:result.user.displayName,
                     email:result.user.email,
                    photo:result.user.photoURL}),
                })
                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate('/')

        }catch(error){
            console.log('could not sign in with google',error.message);
            }

        }
    
  return (
    <button
    onClick={handelGoogleClick}
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
  >
    Continue with google
  </button>
  )
}
