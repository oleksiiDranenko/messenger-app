//styles
import classes from './Loading.module.css';
//react responsive
import { useMediaQuery } from 'react-responsive';
//gif
import loadingGifLight from '../../../../gifs/loading.gif';
import loadingGitDark from '../../../../gifs/loading-dark.gif'

export const Loading = () => {
    //screen width
	const noSidebarScreenSize = useMediaQuery({query: '(max-width: 768px)'})
    return (
        <div className={classes.sidebar}>
            <div className={classes.userInfo}></div>
            <div className={classes.userList}>
                <img src={noSidebarScreenSize ? loadingGitDark : loadingGifLight} className={classes.loading}/> 
            </div>
        </div>
    )
}