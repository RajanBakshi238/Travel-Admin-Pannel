import React, { createContext, useContext } from "react";
import { useGetMeQuery } from "../../redux/services/user";
import { IUser } from "../../contracts/IUser";

export interface IUserContext {
    isLoading: boolean;
    user: IUser | undefined
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }

    return context;
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading } = useGetMeQuery();

    return (<UserContext.Provider value={{ user: user?.data, isLoading: isLoading }}>
        {children}
    </UserContext.Provider>)
}

export default UserContext;