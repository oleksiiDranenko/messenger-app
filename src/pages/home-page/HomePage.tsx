//styles
import classes from './HomePage.module.css';
//components
import { Sidebar } from './components/sidebar/Sidebar';
import { MessagesSection } from './components/messages-section/MessagesSection';

export const HomePage = () => {
    return (
        <div className={classes.page}>
            <Sidebar/>
            <MessagesSection/>
        </div>
    )
}