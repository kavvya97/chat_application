import React, { useState } from 'react';
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
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import './signupPage.styles.scss';
import { signUpHandler } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';


const SignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
      setUsernameError('');
      setPasswordError('');
      setEmailError('');
      setFormError('')

      if (!username) {
          setUsernameError('Username is required!');
          return;
      }

      if (!email) {
        setEmailError('Email is required!');
        return;
    }

      if (!password) {
          setPasswordError('Password is required!');
          return;
      }
      try {
        const responseJson = await signUpHandler(username, email, password);
        if (responseJson['userId']){
          navigate('/login');
        } 
      } catch (error) {
        setFormError("Error occured when creating account");
        setUsername('');
        setPassword('');
        setEmail('');
      }
    };

    const validateEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
          setEmailError("Invalid email format");
      } else {
          setEmailError("");
      }
    }   
    const validatePassword = (password: string) => {
      if (password.length <= 5) {
          setPasswordError("Password should be more than 5 characters");
      } else {
          setPasswordError(""); 
      }
    }
  
    return (
        <VStack className="login-container">
      
        <Box className="logo-box">
          <img src={`${process.env.PUBLIC_URL}/logo.jpeg`} alt="application logo" />
        </Box>
  
        <Heading className="signup-heading">Sign Up</Heading>
  
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

            <FormControl id="email" mt={4} isRequired isInvalid={!!emailError}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                />
                <Input type="email" placeholder="Email address" value={email} onChange={(e) => {setEmail(e.target.value); validateEmail(e.target.value);}} />
                </InputGroup>
                {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
            </FormControl>

            <FormControl id="password" mt={4} isRequired isInvalid={!!passwordError}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<LockIcon color="gray.300" />}
                />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); validatePassword(e.target.value);}} />
                </InputGroup>
                {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
            </FormControl>
            {formError && <Text color="red.500" mt={3} textAlign="center">{formError}</Text>}
            <Button className="signup-button" colorScheme="brand" onClick={handleSignUp}>
            Create Account
            </Button>
            <Text className="member-text">
                Already a member?{' '}
                <ChakraLink className="login-link" as={ReactRouterLink} to='/login'>
                Login
                </ChakraLink>
            </Text>
        </Box>
      </VStack>
    )
}
export default SignupPage;