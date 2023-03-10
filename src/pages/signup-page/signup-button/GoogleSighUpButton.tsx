//styles
import classes from './GoogleSignUpButton.module.css';
//firebase
import { auth, database, provider } from '../../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
//icon
import googleIcon from '../../../icons/google.png';

interface User {
    uid: string,
    displayName: string | null,
    photoURL: string | null
}

export const GoogleSignUpButton = () => {

    //adding user to the users collection
    const addUser = async (user: User) => {
        const userRef = doc(database, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if(userDoc.exists()){
            return
        } else {
            await setDoc(userRef, {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
              });
        }
    }

    const signUp = async () => {
        const { user } = await signInWithPopup(auth,provider);
        await addUser(user)
    }
    

    return (
        <button 
                className={classes.googleSignUp} 
                onClick={ signUp }
            >
                <div className={classes.logoDiv}>
                    <img 
                        src={googleIcon} 
                        alt="googe icon" 
                        className={classes.icon}
                    />
                </div>
                <div className={classes.textDiv}>
                    Sign up with Google
                </div>
            </button>
    )
}

export default GoogleSignUpButton;