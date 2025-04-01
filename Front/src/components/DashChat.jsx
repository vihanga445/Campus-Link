import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox.jsx";

export default function DashChat() {


    const {conversationId} = useParams();
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState([]);

    useEffect(()=>{
        const fetchConversations = async () => {
            try {
                const res = await fetch(`/Back/message/conversation/${conversationId}`);
                const data = await res.json();
                setConversation(data);
            } catch (error) {
                console.error('Error:', error);
            }finally{
                setLoading(false);
            }
        };
        if(conversationId){
            fetchConversations();
        }

    },[conversationId])

    if(loading) return <div>Loading conversations... </div>

    return(
        
        <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Chat</h1>
        {conversation && <ChatBox conversationId={conversationId} /> }
        
        </div>

    )



}