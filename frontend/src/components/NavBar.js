import { useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function NavBar() {
  
  const { isAuthenticated } = useContext(AuthContext);


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container flex justify-between m-auto">
        <div className="text-white ml-1">
          Logo
        </div>
        <div className="space-x-5">
          <Link to="/profile" className="text-white">Profile</Link>
          {isAuthenticated ? (
            <Link to="/logout" className="text-white">Logout</Link>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/signup" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
