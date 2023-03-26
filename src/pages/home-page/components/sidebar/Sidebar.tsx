//styles
import classes from './Sidebar.module.css';
//hook
import { useUser } from '../../../../hooks/useUser';
//components
import { Link } from 'react-router-dom';
import { UserItem } from '../user-item/UserItem';
//firebase
import { collection, getDocs, query } from 'firebase/firestore';
import { database } from '../../../../config/firebase';
//hooks
import { useEffect, useState } from 'react';
//icons
import globalIcon from '../../../../icons/global.png'

interface UserInterface {
    displayName: string,
    photoURL: string,
    uid: string,
    id: string
}

export const Sidebar = () => {
    //getting the user
    const user = useUser();
    //users array state
    const [usersArray, setUsersArray] = useState<UserInterface[]>([]);

    const usersCollection = collection(database, 'users');

    const getUsers = async () => {
        const users = await getDocs(usersCollection);
        setUsersArray(users.docs.map((doc) => ({...doc.data(), id: doc.id})) as UserInterface[]);
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className={classes.sidebar}>
            <div className={classes.userInfo}>
                <Link to='/profile'>
                    <img src={user?.photoURL as string} className={classes.userImage}/>
                </Link>
                <span className={classes.username}>
                    {user?.displayName}
                </span>
            </div>
            <div className={classes.userList}>
                <UserItem 
                    displayName='Global'
                    photoURL={globalIcon}
                    key={1}
                    uid={'global'}
                />
                {usersArray.map((doc) => {
                    return (
                        doc.uid !== user?.uid && 
                        <UserItem 
                            displayName={doc.displayName}
                            photoURL={doc.photoURL}
                            key={doc.id}
                            uid={doc.uid}
                        />
                    )
                })}
            </div>
        </div>
    )
}