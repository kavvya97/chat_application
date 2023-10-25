import {
    Flex,
    Text,
    IconButton,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import './homePage.styles.scss';

interface MessageProps {
    messageId: string;
    username: string;
    content: string;
    timestamp: string;
    onVote: (messageId: string, action: string) => void;
    upvoted: boolean;
    downvoted: boolean;
}

const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

export const Message: React.FC<MessageProps> = ({ messageId, username, content, timestamp, onVote, upvoted, downvoted }) => {
    const currentUser = sessionStorage.getItem("username");
    const timeDifference = formatTime(timestamp);
    const getVoteState = (): 'neutral' | 'upvote' | 'downvote' => {
        if (upvoted) {
            return 'upvote';
        } else if (downvoted) {
            return 'downvote';
        }
        return 'neutral';
    }

    const [voteState, setVoteState] = useState<'neutral' | 'upvote' | 'downvote'>(getVoteState());
    useEffect(() => {
        setVoteState(getVoteState());
    }, [upvoted, downvoted]);

    const handleVoteToggle = () => {
        if (voteState === 'neutral' || voteState === 'downvote') {
            setVoteState('upvote');
            onVote(messageId, 'upvote');
        } else {
            setVoteState('downvote');
            onVote(messageId, 'downvote');
        }
    };

    
    return (
        <Flex className={`message-container ${currentUser === username ? "self" : "other"}`}>
            <Flex direction="column" className="message-content">
                <Text className="username">{username}</Text>
                <Text>{content}</Text>
                <Text className="timestamp">{timeDifference}</Text>
            </Flex>
            {(currentUser !== username) && 
                    <IconButton 
                        aria-label={voteState === 'upvote' ? 'thumbs up' : 'thumbs down'}
                        icon={
                            voteState === 'neutral' ? <FaRegThumbsUp size="1em" /> :
                            (voteState === 'upvote' ? <FaThumbsUp size="1em" /> : <FaThumbsDown size="1em" />)
                        }
                        className={
                            voteState === 'neutral' ? 'neutral-icon-btn' :
                            (voteState === 'upvote' ? 'upvote-icon-btn' : 'downvote-icon-btn')
                        }
                        onClick={handleVoteToggle}
                    />
                }
        </Flex>
    );
}
