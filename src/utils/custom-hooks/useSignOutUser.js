import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../ReduxStore/appSlice";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const useSignOutUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return () => {
        Cookies.remove("is_token");
        dispatch(removeUser());
        queryClient.invalidateQueries({
            queryKey: ["companies"]
        })
        navigate("/");
        window.location.reload();
    }
}

export default useSignOutUser;