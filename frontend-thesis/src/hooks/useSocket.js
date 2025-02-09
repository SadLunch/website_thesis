import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [peopleCount, setPeopleCount] = useState({});

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Receive live updates for people count
    newSocket.on("updatePeopleCount", (data) => {
      setPeopleCount(data);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect(); // Cleanup on unmount
  }, []);

  return { socket, peopleCount };
};

export default useSocket;
