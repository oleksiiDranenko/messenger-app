//styles
import classes from './HomePage.module.css';
//components
import { Sidebar } from './components/sidebar/Sidebar';

export const HomePage = () => {
    return (
        <div className={classes.page}>
            <Sidebar/>
            <h1>aaa</h1>
        </div>
    )
}