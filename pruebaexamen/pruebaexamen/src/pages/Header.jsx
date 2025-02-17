import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation(); // Hook que obtiene la ruta actual

  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <Link 
              to="/" 
              className={`pagines ${location.pathname === '/' ? 'destacar' : ''}`}
            >
              Characters
            </Link>
          </li>
          <li>
            <Link 
              to="/male" 
              className={`pagines ${location.pathname === '/male' ? 'destacar' : ''}`}
            >
              Male
            </Link>
          </li>
          <li>
            <Link 
              to="/female" 
              className={`pagines ${location.pathname === '/female' ? 'destacar' : ''}`}
            >
              Female
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`pagines ${location.pathname === '/about' ? 'destacar' : ''}`}
            >
              About us
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`pagines ${location.pathname === '/contact' ? 'destacar' : ''}`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
