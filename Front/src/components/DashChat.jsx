import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import ChatBox from "./ChatBox.jsx";

export default function DashChat() {


    const {conversationId} = useParams();
    const [conversations, setConversations] = useState([]);

    useEffect(()=>{
        const fetchConversations = async () => {
            try {
                const res = await fetch('/Back/message/conversations');
                const data = await res.json();
                setConversations(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchConversations();
    },[conversationId])


    return(
        
        <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Chat</h1>
        <ChatBox conversationId={conversationId} />
        </div>

    )



}