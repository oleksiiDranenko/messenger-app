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
//icons
import goBackIcon from '../../icons/back.png';
//gif
import loadingGif from '../../gifs/loading-dark.gif'

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
            <div className={classes.header}>
                <button onClick={() => navigate('/')} className={classes.goBackButton}>
                    <img src={goBackIcon} width='20px' height='20px'/>
                </button>
            </div>
            {user ? 
            <div className={classes.userInfoDiv}>
                <img src={user?.photoURL as string} className={classes.userPhoto}/>
                <h1 className={classes.username}>{user?.displayName}</h1>
                <p className={classes.userEmail}>{user?.email}</p>
                <button className={classes.signOutButton} onClick={signUserOut}>
                    Sign out
                </button>
            </div>
            : <img src={loadingGif} width='50px' height='50px'/>
            }
        </div>
    )
}