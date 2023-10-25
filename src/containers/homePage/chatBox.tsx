import {
    Box,
    Flex,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from './message';
import './homePage.styles.scss';
import { 
    createMessageHandler, 
    getMessageHandler, 
    getVoteHandler, 
    getAllVotes 
} from '../../utils/message';

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [upvotes, setUpvotes] = useState<string[]>([]);
    const [downvotes, setDownvotes] = useState<string[]>([]);
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");
    const toast = useToast();

    useEffect(() => {
        if (!username) {
            navigate('/login');
            return
        }
        const fetchData = async () => {
            const responseJson = await getMessageHandler();
            setMessages(responseJson['messages']);
        };
        fetchData();
        const getVotesByUsername = async () => {
            const responseJson = await getAllVotes(username);
            setUpvotes(responseJson['upvotes']);
            setDownvotes(responseJson['downvotes']);
        }
        getVotesByUsername();
    }, [username]);

    const handleVote = async (messageId: string, action: string) => {
        try {
            if (!username) {
                navigate('/login');
                return
            }
            await getVoteHandler(username, messageId, action)
        } catch (error: any) {
            console.log("Error occured when registering vote")
            toast({
                title: error.message || 'Error occured when registering vote',
                status: "error"
            });
        }
    };

    const createMessage = async(message: string) => {
        try {
            if (!username) {
                navigate('/login')
                return
            }
            await createMessageHandler(username, message);  
            const responseJson = await getMessageHandler();
            setMessages(responseJson['messages']);          
            setMessage('');
        } catch (error: any) {
            console.error('There was an error sending the message:', error);
            toast({
                title: error.message || 'Unknown error',
                status: "error"
            });
        }
    };

    return (
        <>
            <Box className="chat-container">
                {(!messages || messages.length === 0) &&  (
                    <Flex className="empty-chat-prompt">
                        <div>Time to chat!!</div>
                    </Flex>
                )}
                {messages.length > 0 && messages.map((msg: any) => (
                    <Message 
                        key={msg._id}
                        messageId={msg._id}
                        username={msg.username}
                        content={msg.content}
                        onVote={handleVote}
                        upvoted={upvotes.includes(msg._id)}
                        downvoted={downvotes.includes(msg._id)}
                    />
                ))}
            </Box>
            <Box className="message-input-box">
                <Flex className="message-input-flex">
                    <Input 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        className="input-message" 
                    />
                    <Button 
                        className="send-button"
                        onClick={() => createMessage(message)}
                        leftIcon={<FaPaperPlane />}
                    >
                        Send
                    </Button>
                </Flex>
            </Box>
        </>
    );

}

export default ChatBox;
