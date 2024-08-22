import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useAuthContext = () => {
	return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};