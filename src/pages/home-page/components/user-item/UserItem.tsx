//styles
import classes from './UserItem.module.css';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setUser } from '../../../../store/slices/UserSelected';
import { setRoomId } from '../../../../store/slices/RoomId';
//hook
import { useUser } from '../../../../hooks/useUser';
//react responsive
import { useMediaQuery } from 'react-responsive';
//react router
import { useNavigate } from 'react-router';

interface PropsInterface {
    displayName: string,
    photoURL: string,
    uid: string
}

export const UserItem = (props: PropsInterface) => {
    //user
    const user = useUser();
    //screen width
	const noSidebarScreenSize = useMediaQuery({query: '(max-width: 768px)'});
    //navigation
    const navigate = useNavigate();
    //redux
    const dispatch = useDispatch();
    const userSelected = useSelector((state: RootState) => state.UserSelected);

    const selectUser = () => {
        dispatch(setUser({
            displayName: props.displayName,
            photoURL: props.photoURL,
            uid: props.uid
        }))

        if(props.uid === 'global'){
            dispatch(setRoomId({
                roomId: 'global'
            }))
        } else if (user?.uid){
            //generating the room id
            const sortedUsers = [user?.uid, props.uid].sort();
            const roomId = sortedUsers.join('_');

            dispatch(setRoomId({
                roomId: roomId
            }))
        }

        if(noSidebarScreenSize){
            navigate('/messages')
        }
    }

    return (
        <div 
            className={
                userSelected.uid === props.uid ? 
                `${classes.item} ${classes.itemSelected}` 
                : `${classes.item} ${classes.itemNotSelected}`
            } 
            onClick={selectUser}
        >
            <img src={props?.photoURL} className={classes.userImage}/>
            <span className={classes.username}>
                {props?.displayName}
            </span>
        </div>
    )
}