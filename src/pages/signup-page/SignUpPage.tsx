import classes from './SignUpPage.module.css';
import GoogleSignUpButton from './signup-button/GoogleSighUpButton';

export const SignUpPage = () => {
    return (
        <div className={classes.page}>
            <GoogleSignUpButton/>
        </div>
    )
}