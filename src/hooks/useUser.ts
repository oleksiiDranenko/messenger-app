import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export const useUser = () => {
    //getting the user
    const [user] = useAuthState(auth);

    return user;
}