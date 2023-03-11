//styles
import classes from './ProfilePage.module.css';
//firebase
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
//hooks
import { useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';
//redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/UserSelected';

export const ProfilePage = () => {
    //getting the user
    const user = useUser();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const signUserOut = async () => {
        await signOut(auth);
        dispatch(setUser({}))
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