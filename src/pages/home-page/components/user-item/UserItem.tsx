//styles
import classes from './UserItem.module.css';

interface PropsInterface {
    displayName: string,
    photoURL: string
}

export const UserItem = (props: PropsInterface) => {

    return (
        <div className={classes.item}>
            <img src={props?.photoURL} className={classes.userImage}/>
            <span className={classes.username}>
                {props?.displayName}
            </span>
        </div>
    )
}