"use client"

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from "@/src/redux/features/chat/chatSlice";

export const useChatSocket = (userId: number) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const ws = new WebSocket(
            `ws://127.0.0.1:8000/ws/${userId}`
        );

        ws.onmessage = (event) => {
            const data = JSON.parse(
                event.data
            );

            dispatch(addMessage(data));
        };

        return () => {
            ws.close();
        };
    }, [userId]);
};