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
        <Flex mt={4} align="center" borderWidth="1px" borderRadius="md" padding="10px">
            <Text fontWeight="bold" mr={2}>{username}</Text>
            <Text flex={1}>{content}</Text>
            <IconButton 
                aria-label={voteState === 'upvote' ? 'thumbs up' : 'thumbs down'}
                icon={
                    voteState === 'neutral' ? <FaRegThumbsUp /> : // <-- Use a different icon or the same for neutral if you prefer
                    (voteState === 'upvote' ? <FaThumbsUp /> : <FaThumbsDown />)
                }
                bg={
                    voteState === 'neutral' ? 'gray.300' :
                    (voteState === 'upvote' ? 'green.300' : 'red.300')
                }
                _hover={{
                    bg: voteState === 'neutral' ? 'gray.200' :
                    (voteState === 'upvote' ? 'green.200' : 'red.200')
                }}
                onClick={handleVoteToggle}
            />
        </Flex>
    );
}
