//styles
import classes from './UserItem.module.css';
//redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/slices/UserSelected';
import { setRoomId } from '../../../../store/slices/RoomId';
//hook
import { useUser } from '../../../../hooks/useUser';

interface PropsInterface {
    displayName: string,
    photoURL: string,
    uid: string
}

export const UserItem = (props: PropsInterface) => {
    //user
    const user = useUser();
    //redux
    const dispatch = useDispatch();

    const selectUser = () => {
        dispatch(setUser({
            displayName: props.displayName,
            photoURL: props.photoURL,
            uid: props.uid
        }))

        //generating the room id
        const sortedUsers = [user?.uid, props.uid].sort();
        const roomId = sortedUsers.join('_');

        dispatch(setRoomId({
            roomId: roomId
        }))
    }

    return (
        <div className={classes.item} onClick={selectUser}>
            <img src={props?.photoURL} className={classes.userImage}/>
            <span className={classes.username}>
                {props?.displayName}
            </span>
        </div>
    )
}