//styles
import classes from './MessagesSection.module.css';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
//firebase
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { database } from '../../../../config/firebase';
//hook
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
//element
import { MessageItem } from '../message-item/MessageItem';
//icon
import arrowUpIcon from '../../../../icons/up-arrow.png';

interface MessageInterface {
    roomId: string,
    userId: string,
    value: string,
    createdAt: string,
    id?: string
}

export const MessagesSection = () => {
    //logged in user
    const user = useUser()
    //messages state
    const [messagesArray, setMessagesArray] = useState<MessageInterface[]>([]);
    //redux state
    const userSelected = useSelector((state: RootState) => state.UserSelected);
    const roomId = useSelector((state: RootState) => state.RoomId);
    //input value state
    const [inputValue, setInputValue] = useState<string>('');
    //messages section ref
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const messagesCollection = collection(database, 'messages');

    //query for messages
    useEffect(() => {
        if (roomId?.roomId) { 
            //query for posts with the same room id
            const queryMessages = query(messagesCollection, where('roomId', '==', roomId?.roomId), orderBy('createdAt', 'desc'));
            
            //on change in firebase
            const unsusribe = onSnapshot(queryMessages, (snapshot) => {
                let messages: MessageInterface[] = [];
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id} as MessageInterface)
                })
                setMessagesArray(messages)
            }); 

            //clear input value when swithcing to another chat
            setInputValue('');  

            return () => unsusribe();
        }
    }, [roomId?.roomId]);

    useEffect(() => {
        //scroll to the last message when new is added
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
        }
      }, [messagesArray]);
    
    //input on change
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    //add message
    const addMessage = async () => {
        if(roomId.roomId && user && inputValue.trim() !== ''){
            const newMessage: MessageInterface = {
                roomId: roomId.roomId,
                userId: user?.uid,
                value: inputValue,
                createdAt: new Date().toISOString()
            }

            await addDoc(messagesCollection, newMessage);
        }
    }

    //form on submit
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addMessage();
        setInputValue('');
    }


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

                <div className={classes.messagesSection} ref={messageContainerRef}>
                    {messagesArray.map((message) => {
                        return  <MessageItem
                                    uid={message.userId}
                                    value={message.value}
                                    createdAt={message.createdAt}
                                    key={message.id}
                                />
                    })}
                </div>

                <form className={classes.inputForm} onSubmit={handleForm}>
                        <input 
                            type="text" 
                            className={classes.input} 
                            placeholder='Message'
                            onChange={handleInputValue}
                            value={inputValue}
                        />
                        <button className={classes.button}>
                            <img src={arrowUpIcon} width='16px' height='16px'/>
                        </button>
                </form>
                </>
            }

        </div>
    )
}