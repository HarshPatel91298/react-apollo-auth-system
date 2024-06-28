import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function Logout() {
    const navigate = useNavigate();
    const { updateAuthStatus } = useContext(AuthContext);

    useEffect(() => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('token');

        // Update the authentication context
        updateAuthStatus(false);
        
        // Redirect the user to the login page
        navigate('/login');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures useEffect runs once on component mount

    return null; // Logout component doesn't render anything
}
  
export default Logout;
