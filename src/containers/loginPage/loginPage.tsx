import React , { useState } from 'react';
import {
  Box,
  Input,
  VStack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  FormErrorMessage
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { LockIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { loginHandler } from '../../utils/auth';
import './loginPage.styles.scss';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setUsernameError('');
        setPasswordError('');
        setFormError('');

        if (!username) {
            setUsernameError('Username is required!');
            return;
        }

        if (!password) {
            setPasswordError('Password is required!');
            return;
        }
        try {
          const responseJson = await loginHandler(username, password);
          sessionStorage.setItem("username", username);
          if (responseJson['userId']){
            navigate('/home', { state: { username } });
          } 
        } catch (error) {
            setFormError("Error occured when logging in");
            setUsername('');
            setPassword('');
        }
    };

    return (
        <VStack className="login-container">
            <Box className="logo-box">
                <img src={`${process.env.PUBLIC_URL}/logo.jpeg`} alt="application logo" />
            </Box>
            <Heading className="login-heading">Login</Heading>
            <Box className="input-box">
                <FormControl id="username" isRequired isInvalid={!!usernameError}>
                    <FormLabel>Username</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Icon as={FaUser} color="gray.300" />}
                        />
                        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </InputGroup>
                    {usernameError && <FormErrorMessage>{usernameError}</FormErrorMessage>}
                </FormControl>

                <FormControl id="password" mt={4} isRequired isInvalid={!!passwordError}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        children={<LockIcon color="gray.300" />}
                        />
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </InputGroup>
                    {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
                </FormControl>
                {formError && <Text color="red.500" mt={3} textAlign="center">{formError}</Text>}
                <Button className="login-button" colorScheme='brand' onClick={handleLogin}>
                Login
                </Button>
                <Text className="signup-text">
                    Don't have an account?{' '}
                    <ChakraLink as={ReactRouterLink} to='/signup'>
                    Sign Up
                    </ChakraLink>
                </Text>
            </Box>
        </VStack>
    );
};

export default LoginPage;
