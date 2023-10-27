import {publicRequest} from "../utils/request";
import {useAuth} from "../store";

const useLogout = () => {
    const {setAuth} = useAuth()

    const logout = async () => {
        try {
            setAuth({})
            await publicRequest.get("/auth/logout")
        } catch (error) {
            console.log({messgae: error})
        }
    }
    return logout
}

export default useLogout