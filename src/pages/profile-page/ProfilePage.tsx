//styles
import classes from './ProfilePage.module.css';
//firebase
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
//hooks
import { useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';

export const ProfilePage = () => {
    //getting the user
    const user = useUser();

    const navigate = useNavigate();

    const signUserOut = async () => {
        await signOut(auth);
        navigate('/');
    }

    return (
        <div className={classes.page}>
            <div>
                <button onClick={() => navigate('/')}>back</button>
            </div>
            <div>
                <h1>{user?.displayName}</h1>
                <p>{user?.email}</p>
                <button onClick={signUserOut}>sign out</button>
            </div>
        </div>
    )
}