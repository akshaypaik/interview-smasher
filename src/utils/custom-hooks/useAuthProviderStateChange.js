import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firbaseAuth";
import { removeUser, setUserInfo } from "../ReduxStore/appSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { VALIDATE_USER_TOKEN } from "../constants/apiConstants";
import { useNavigate } from "react-router-dom";

const useAuthProviderStateChange = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const authStateUnsubscription = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid, email, displayName, photoURL, providerData } = user;
                dispatch(setUserInfo({ uid, email, displayName, profilePicURL: photoURL, phoneNumber: providerData[0].phoneNumber, authProvider: true }));
                return user;
            } else {
                const token = String(Cookies.get("is_token")) || "";
                try {
                    if (token) {
                        const { data } = await axios.get(VALIDATE_USER_TOKEN, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const userInfo = {
                            uid: data.email,
                            email: data.email, displayName: data?.firstName + " " + data?.lastName,
                            photoURL: data?.profilePhotoURL, firstName: data?.firstName,
                            lastName: data?.lastName, phoneNumber: data?.phoneNumber, authProvider: false,
                            profilePicURL: data?.profilePicURL
                        }
                        dispatch(setUserInfo(userInfo));
                        return userInfo;
                    } else {
                        dispatch(removeUser());
                        navigate("/");
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    navigate("/");
                }
            }
        });
        return () => {
            authStateUnsubscription();
        }
    }, []);
}

export default useAuthProviderStateChange;