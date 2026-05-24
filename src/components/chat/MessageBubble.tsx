import {Message} from "@/src/types/chat"

interface Props {
    message: Message;
    currentUserId: number;
}

export default function MessageBubble({message, currentUserId}: Props) {

    const mine = message.sender_id === currentUserId;

    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-md px-4 py-2 rounded-xl ${mine ? "bg-black tetx-white" : "bg-white border"}`}>
                {message.message}
            </div>
        </div>
    );
}