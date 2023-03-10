import { useUser } from '../../../../hooks/useUser';
import classes from './UserItem.module.css';

export const UserItem = () => {
    //getting the user
    const user = useUser();

    return (
        <div className={classes.item}>
            <img src={user?.photoURL as string} className={classes.userImage}/>
            <span className={classes.username}>
                {user?.displayName}
            </span>
        </div>
    )
}