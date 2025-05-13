import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

// LOGOUT 
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  toast.success('You have logged out successfully!');
  navigate('/');
};

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/feedback" className="flex-shrink-0 font-semibold text-xl">
              Feedback System
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/feedback"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Submit Feedback
              </Link>
              <Link
                to="/history"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Feedback History
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-primary-900 hover:bg-primary-950 transition-colors"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-800">
            <Link
              to="/feedback"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Feedback
            </Link>
            <Link
              to="/history"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback History
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary-900 hover:bg-primary-950 transition-colors"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
