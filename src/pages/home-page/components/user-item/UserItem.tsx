//styles
import classes from './UserItem.module.css';
//redux
import { useDispatch, useSelector} from 'react-redux';
import { setUser } from '../../../../store/slices/UserSelected';
import { RootState } from '../../../../store/store';

interface PropsInterface {
    displayName: string,
    photoURL: string,
    uid: string
}

export const UserItem = (props: PropsInterface) => {

    const userSelected = useSelector((state: RootState) => state.UserSelected);
    const dispatch = useDispatch();

    const selectUser = () => {
        dispatch(setUser({
            displayName: props.displayName,
            photoURL: props.photoURL,
            uid: props.uid
        }))
        console.log(userSelected)
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