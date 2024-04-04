import { createContext, useContext, useEffect, useState } from "react";
import io  from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import salonApi from "../apis/salon.api";
import { toast } from "react-toastify";
export const SocketContext = createContext()

export const useSocketContext = () =>{
  return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);


  const {profile} = useAuthContext()
  const fetchCheckOwnSalon = async() =>{
     console.log("da logout")
     console.log(profile)
     if(profile !== null){
      console.log("oke")
      let socket = ""
      let res = await salonApi.checkOwnSalon();
      if(res.data.salonId === null){
          socket = io("http://localhost:5000", {
          query: {
            userId:profile.user_id
          }
        });
      }else{
        socket = io("http://localhost:5000", {
          query: {
            userId: profile.user_id,
            salonId : res.data.salonId
          }
        });
      }
      
      setSocket(socket)
      console.log("socket origin : ", socket)
      socket.on("getOnlineUsers", (users) =>{
        console.log("onlineUser : ", users)
        setOnlineUsers(users)
      })
      return () => socket.close();
     }else{
      console.log("đóng socket")
      if(socket) {
        socket.close();
        setSocket(null);
      }
     }
  }
  useEffect(() =>{
    fetchCheckOwnSalon();
  },[profile]);
  return <SocketContext.Provider value={{socket, onlineUsers }}>
    {children}
  </SocketContext.Provider>
}