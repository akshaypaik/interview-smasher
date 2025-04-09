import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firbaseAuth";
import { removeUser, setUserInfo } from "../ReduxStore/appSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { VALIDATE_USER_TOKEN } from "../constants/apiConstants";

const useAuthProviderStateChange = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const authStateUnsubscription = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(setUserInfo({ uid, email, displayName, photoURL, authProvider: true }));
                return user;
            } else {
                // User is signed out
                const token = String(Cookies.get("is_token")) || "";
                if (token) {
                    const { data } = await axios.get(VALIDATE_USER_TOKEN, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const userInfo = {
                        uid: data.email,
                        email: data.email, displayName: data.email,
                        photoURL: data?.profilePhotoURL, authProvider: false
                    }
                    dispatch(setUserInfo(userInfo));
                    return userInfo;
                } else {
                    dispatch(removeUser());
                    return null;
                }
            }
        });
        return () => {
            authStateUnsubscription();
        }
    }, []);
}

export default useAuthProviderStateChange;