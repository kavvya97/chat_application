import {
    Flex,
    Text,
    IconButton,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface MessageProps {
    messageId: string;
    username: string;
    content: string;
    onVote: (messageId: string, action: string) => void;
    upvoted: boolean;
    downvoted: boolean;
}

export const Message: React.FC<MessageProps> = ({ messageId, username, content, onVote, upvoted, downvoted }) => {
    const currentUser = sessionStorage.getItem("username");
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
        <Flex className="message-container">
            <Text className="username">{username}</Text>
            <Text flex={1}>{content}</Text>
            {
                (currentUser !== username) && 
                <IconButton 
                    aria-label={voteState === 'upvote' ? 'thumbs up' : 'thumbs down'}
                    icon={
                        voteState === 'neutral' ? <FaRegThumbsUp /> :
                        (voteState === 'upvote' ? <FaThumbsUp /> : <FaThumbsDown />)
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
