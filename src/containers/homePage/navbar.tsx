import { Flex, Box, Image, Text, Menu, MenuButton, MenuList, MenuItem, Button, Icon } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import './homePage.styles.scss';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <Flex className="navbar-container">
            <Box className="logo-container">
                <Image 
                    src={`${process.env.PUBLIC_URL}/logo.jpeg`} 
                    alt="App Logo" 
                    className="navbar-logo"
                />
                <Text className='appName'>chatTime</Text>
            </Box>
            
            <Box className="profile-menu">
                <Menu>
                    <MenuButton as={Button} rightIcon={<Icon as={FaUser} />} className="profile-button">
                        Profile
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
}
export default Navbar;
