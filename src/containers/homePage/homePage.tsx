import { Box, Container } from '@chakra-ui/react';
import Navbar from './navbar';
import ChatBox from './chatBox';

const HomePage: React.FC = () => {
    return (
        <Box>
            <Navbar />
            <Container maxW="container.lg" pt={6}>
                <ChatBox />
            </Container>
        </Box>
    );
}

export default HomePage;
