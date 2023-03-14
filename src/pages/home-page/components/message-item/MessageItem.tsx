//styles
import classes from './MessageItem.module.css';
//hooks
import { useUser } from '../../../../hooks/useUser';
import { useState } from 'react';
//firebase
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../../../../config/firebase';
//icons
import deleteIcon from '../../../../icons/delete.png';
import replyIcon from '../../../../icons/reply.png';

interface PropsInterface {
    uid: string,
    value: string,
    id: string,
    createdAt: string,
    handleReply():void,
    reply?: string
}

export const MessageItem = (props: PropsInterface) => {
    //user
    const user = useUser()
    //hover state
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const messagesCollection = collection(database, 'messages');

    const handleDelete = async () => {
        const messageRef = doc(messagesCollection, props.id);
        await deleteDoc(messageRef);
    }

    return (
        <div 
            className={props.uid === user?.uid ? classes.myMessage : classes.message}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {props.uid === user?.uid ? 
                <div className={isHovered ? classes.manageDivShown : classes.manageDivHidden}>
                    <button className={classes.manageMyMessage} onClick={props.handleReply}>
                        <img src={replyIcon} width='25px' height='25px'/>
                    </button>
                    <button className={classes.manageMyMessage} onClick={handleDelete}>
                        <img src={deleteIcon} width='25px' height='25px'/>
                    </button>
                </div>
            : null}
            <div className={props.uid === user?.uid ? classes.myMessageBody : classes.messageBody}>
                {props.reply ? 
                    <div className={classes.reply}>{props.reply}</div>
                : null
                }
                <div className={classes.messageValue}>{props.value}</div>
                <div className={classes.messageDate}>{props.createdAt.substring(11,16)}</div>
            </div>
            {props.uid !== user?.uid ? 
                <div className={isHovered ? classes.manageDivShown : classes.manageDivHidden}>
                    <button className={classes.manageMessage} onClick={props.handleReply}>
                        <img src={replyIcon} width='25px' height='25px'/>
                    </button>
                </div>
            : null}
        </div>
    )
}