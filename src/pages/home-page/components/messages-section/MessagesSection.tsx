//styles
import classes from './MessagesSection.module.css';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
//firebase
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { database } from '../../../../config/firebase';
//hook
import { useEffect, useState } from 'react';
//element
import { MessageItem } from '../message-item/MessageItem';

interface MessageInterface {
    roomId: string,
    userId: string,
    value: string,
    createdAt: string,
    id: string
}

export const MessagesSection = () => {
    //messages state
    const [messagesArray, setMessagesArray] = useState<MessageInterface[]>([]);
    //redux state
    const userSelected = useSelector((state: RootState) => state.UserSelected);
    const roomId = useSelector((state: RootState) => state.RoomId);

    const messagesCollection = collection(database, 'messages');


    useEffect(() => {
        if (roomId?.roomId) { 
          const queryMessages = query(messagesCollection, where('roomId', '==', roomId?.roomId), orderBy('createdAt', 'desc'));
          const unsusribe = onSnapshot(queryMessages, (snapshot) => {
            let messages: MessageInterface[] = [];
            snapshot.forEach((doc) => {
              messages.push({...doc.data(), id: doc.id} as MessageInterface)
            })
            setMessagesArray(messages)
          });

          return () => unsusribe();
        }
      }, [roomId?.roomId]); 
      

    return (
        <div className={classes.section}>
            {userSelected.uid && 
                <>
                <div className={classes.header}>
                    <img src={userSelected?.photoURL} className={classes.userImage}/>
                    <span className={classes.username}>
                        {userSelected?.displayName}
                    </span>
                </div>

                <div className={classes.messagesSection}>
                    {messagesArray.map((message) => {
                        return <MessageItem
                                    uid={message.userId}
                                    value={message.value}
                                    createdAt={message.createdAt}
                                    key={message.id}
                                />
                    })}
                </div>

                <form className={classes.inputForm}>
                    
                </form>
                </>
            }

        </div>
    )
}