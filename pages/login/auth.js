import React from 'react'
import axios from 'axios'
import app from './firebase'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
const auth = getAuth(app);
const Googleprovider =  new GoogleAuthProvider()
const signupwithgoogle = () => {
  signInWithPopup(auth,Googleprovider);
}
export default function Loginpage() {
  return (
    <div>
      <button onClick={signupwithgoogle}>login from google</button>
    </div>
  )
}
