import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firbaseAuth";
import { removeUser, setUserInfo } from "../ReduxStore/appSlice";
import { useDispatch } from "react-redux";

const useAuthProviderStateChange = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const authStateUnsubscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("google auth found!");
                const { uid, email, displayName, photoURL } = user;
                dispatch(setUserInfo({ uid, email, displayName, photoURL }));
                return user;
            } else {
                // User is signed out
                console.log("google auth not found!");
                dispatch(removeUser());
                return null;
            }
        });
        return () => {
            authStateUnsubscription();
        }
    }, []);
}

export default useAuthProviderStateChange;