import {createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthProvider.jsx';
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({children}) => {
    
    const [socket, setSocket] = useState(null);
    const [authUser] = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if(authUser){
            const socket = io('https://chatterverse-6hcp.onrender.com/',{
                query:{
                    userId: authUser.user._id,
                },
            });
            setSocket(socket);
            socket.on("getonline", (users) => {
                setOnlineUsers(users);
                console.log("Online users updated:", users);
            });

            return () => {
                socket.close();
            }
        }   else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
 
    return(
        <socketContext.Provider value={{ socket, onlineUsers}}>
            {children}
        </socketContext.Provider>
    );
};