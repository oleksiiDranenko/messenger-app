//styles
import classes from './MessagesSection.module.css';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export const MessagesSection = () => {
    //redux state
    const userSelected = useSelector((state: RootState) => state.UserSelected);

    return (
        <div className={classes.section}>
            {userSelected.uid && 
                <div className={classes.header}>
                    <img src={userSelected?.photoURL} className={classes.userImage}/>
                    <span className={classes.username}>
                        {userSelected?.displayName}
                    </span>
                </div>
            }

        </div>
    )
}