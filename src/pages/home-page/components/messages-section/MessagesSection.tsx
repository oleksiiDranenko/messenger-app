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
//react responsive
import { useMediaQuery } from 'react-responsive';
//react router
import { useNavigate } from 'react-router';
//element
import { MessageItem } from '../message-item/MessageItem';
//icon
import arrowUpIcon from '../../../../icons/up-arrow.png';
import replyIcon from '../../../../icons/reply-light.png';
import removeIcon from '../../../../icons/remove.png';
import goBackIcon from '../../../../icons/back.png';

interface MessageInterface {
    roomId: string,
    userId: string,
    value: string,
    createdAt: string,
    id?: string,
    replyTo?: string,
    photoURL?: string
}

export const MessagesSection = () => {
    //logged in user
    const user = useUser();
    //screen width
	const noSidebarScreenSize = useMediaQuery({query: '(max-width: 768px)'});
    //navigation 
    const navigate = useNavigate();
    //messages state
    const [messagesArray, setMessagesArray] = useState<MessageInterface[]>([]);
    //redux state
    const userSelected = useSelector((state: RootState) => state.UserSelected);
    const roomId = useSelector((state: RootState) => state.RoomId);
    //input value state
    const [inputValue, setInputValue] = useState<string>('');
    //reply state
    const [reply, setReply] = useState<null | string>(null);
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
            //clear reply when swithcing to another chat
            setReply(null);

            return () => unsusribe();
        }
    }, [roomId?.roomId]);

    useEffect(() => {
        //scroll to the last message when new is added
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
        }
    }, [messagesArray]);

    useEffect(() => {
        if(!userSelected.uid && noSidebarScreenSize){
            navigate('/');
        }
    }, [])
    
    //input on change
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    //add message
    const addMessage = async () => {
        if(roomId.roomId && user && inputValue.trim() !== ''){
            if(reply){
                const newMessage: MessageInterface = {
                    roomId: roomId.roomId,
                    userId: user?.uid,
                    value: inputValue,
                    createdAt: new Date().toISOString(),
                    photoURL: user?.photoURL as string,
                    replyTo: reply
                }
    
                setReply(null);
                
                await addDoc(messagesCollection, newMessage);
            } else {
                const newMessage: MessageInterface = {
                    roomId: roomId.roomId,
                    userId: user?.uid,
                    value: inputValue,
                    createdAt: new Date().toISOString(),
                    photoURL: user?.photoURL as string
                }
    
                await addDoc(messagesCollection, newMessage);
            }
        }
    }

    //form on submit
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addMessage();
        setInputValue('');
    }

    //reply to message
    const handleReply = (value: string) => {
        setReply(value);
    }

    //cancel reply
    const replyCancel = () => {
        setReply(null);
    }

    //go to the previous page
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className={classes.section}>
            {userSelected.uid ? 
                <>
                <div className={classes.header}>
                    {
                        noSidebarScreenSize ? 
                            <button className={classes.goBackButton} onClick={goBack}>
                                <img src={goBackIcon} width='20px' height='20px'/>
                            </button>
                        : null
                    }
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
                                    id={message.id as string}
                                    key={message.id}
                                    handleReply={() => handleReply(message.value)}
                                    reply={message.replyTo}
                                    photoURL={message.photoURL}
                                />
                    })}
                </div>

                <div className={classes.inputDiv}>
                    {reply ? 
                        <div className={classes.replyDiv}>
                            <img src={replyIcon} width='20px' height='20px'/>
                            <span className={classes.replyValue}>
                                {reply.length <= 30 ? reply : `${reply.substring(0, 30)} ...`}
                            </span>
                            <button onClick={replyCancel} className={classes.cancelReply}>
                                <img src={removeIcon} width='20px' height='20px'/>
                            </button>
                        </div> 
                    : null}

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
                </div>
                </>
            : 
                <div className={classes.noChatDiv}>
                    <span className={classes.noChatMessage}>No chats selected ...</span>
                </div>
            }

        </div>
    )
}