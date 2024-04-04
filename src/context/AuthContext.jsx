import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")) || null);

	return <AuthContext.Provider value={{ profile, setProfile }}>{children}</AuthContext.Provider>;
}