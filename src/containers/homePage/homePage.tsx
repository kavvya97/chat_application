// pages/HomePage.tsx

import { Box, Container } from '@chakra-ui/react';
import Navbar from './navbar'; // Ensure the casing of your component filenames matches the imports
import ChatBox from './chatBox';

const HomePage: React.FC = () => {
    return (
        <Box>
            <Navbar />
            <Container maxW="container.xl" pt={6}>
                <ChatBox />
            </Container>
        </Box>
    );
}

export default HomePage;
