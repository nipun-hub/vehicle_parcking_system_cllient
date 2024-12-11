
import { createContext, useState } from "react"


export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')))

    const refreshToken = () => {
        setToken(JSON.parse(localStorage.getItem('user')))
    }

    const saveToken = async (user) => {
        try {
            await localStorage.setItem('user', JSON.stringify(user));
            await refreshToken();
            console.log('Saved token:');
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const resetToken = () => {
        console.log("reset")
        console.log(token)
        localStorage.removeItem('user');
        refreshToken()
    }

    const contextValue = {
        token,
        saveToken,
        resetToken,
        refreshToken,
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )


}

export default AuthContextProvider;