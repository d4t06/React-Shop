import {createContext, useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const initialState = {
    auth: '',
    persist: false,
}

const initialContext = {
    state: initialState,
    setAuth: () => {},
    setPersist: () => {}
}

const AuthContext = createContext(initialContext)

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [persist, setPersist] = useLocalStorage('persist', false)

    return (
        <AuthContext.Provider value={{state: {auth, persist}, setPersist, persist}}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => {
    const {state : {auth, persist}, setPersist, setAuth}  = useContext(AuthContext)
    return {auth, setAuth, persist, setPersist}
}

export default AuthProvider
export {useAuth}