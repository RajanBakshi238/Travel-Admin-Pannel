import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetMeQuery } from "../../redux/services/user";
import { IUser } from "../../contracts/IUser";

export interface IUserContext {
    isLoading: boolean;
    user: IUser | null | undefined;
    setUser: (args: IUser | null) => void
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
    const { data, isLoading } = useGetMeQuery();

    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        if (data?.data) {
            setUser(data?.data)
        }
    }, [data])


    return (<UserContext.Provider value={{ user: data?.data ?? user, setUser, isLoading: isLoading }}>
        {children}
    </UserContext.Provider>)
}

export default UserContext;