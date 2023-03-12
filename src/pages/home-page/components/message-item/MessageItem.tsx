//styles
import classes from './MessageItem.module.css';
//hook
import { useUser } from '../../../../hooks/useUser';

interface PropsInterface {
    uid: string,
    value: string,
    createdAt: string
}

export const MessageItem = (props: PropsInterface) => {
    //user
    const user = useUser()

    return (
        <div className={props.uid === user?.uid ? classes.myMessage : classes.message}>
            <div className={props.uid === user?.uid ? classes.myMessageBody : classes.messageBody}>
                <div className={classes.messageValue}>{props.value}</div>
                <div className={classes.messageDate}>{props.createdAt.substring(11,16)}</div>
            </div>
        </div>
    )
}