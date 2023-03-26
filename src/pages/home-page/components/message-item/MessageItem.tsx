//styles
import classes from './MessageItem.module.css';
//hooks
import { useUser } from '../../../../hooks/useUser';
import { useState } from 'react';
//firebase
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../../../../config/firebase';
//react responsive
import { useMediaQuery } from 'react-responsive';
//icons
import deleteIcon from '../../../../icons/delete.png';
import replyIcon from '../../../../icons/reply.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

interface PropsInterface {
    uid: string,
    value: string,
    id: string,
    createdAt: string,
    handleReply():void,
    reply?: string,
    photoURL?: string
}

export const MessageItem = (props: PropsInterface) => {
    //user
    const user = useUser()
    //screen width
	const noSidebarScreenSize = useMediaQuery({query: '(max-width: 768px)'})
    //hover state
    const [isHovered, setIsHovered] = useState<boolean>(false);
    //room id
    const roomSelected = useSelector((state: RootState) => state.RoomId)

    const messagesCollection = collection(database, 'messages');

    const handleDelete = async () => {
        const messageRef = doc(messagesCollection, props.id);
        await deleteDoc(messageRef);
    }

    return (
        <div 
            className={props.uid === user?.uid ? classes.myMessage : classes.message}
            onMouseEnter={() => !noSidebarScreenSize ? setIsHovered(true) : null}
            onMouseLeave={() => !noSidebarScreenSize ? setIsHovered(false) : null}
            onClick={() => noSidebarScreenSize ? setIsHovered(!isHovered) : null}
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
            {roomSelected.roomId === 'global' && props.uid !== user?.uid ?
                <div>
                    <img src={props.photoURL} className={classes.userPhoto}/>
                </div>
            : null}
            <div 
                className={props.uid === user?.uid ? classes.myMessageBody :
                            props.uid !== user?.uid && roomSelected.roomId === 'global' ?
                            classes.globalMessageBody : classes.messageBody}
            >
                {props.reply ? 
                    <div className={classes.reply}>
                        {props.reply.length <= 200 ?
                            props.reply 
                        : `${props.reply.substring(0, 200)} ...`
                        }
                    </div>
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