import { Link } from "react-router-dom";
const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and description */}
            <div className="md:mb-0">
            <Link to="/" className="hover:underline">
          <img src="/logo.png" alt="logo" className="w-24 h-18"/>
        </Link>
            </div>
  
            {/* Navigation links */}
            <nav className="flex flex-wrap justify-center space-x-6 md:mb-0">
              <a href="/" className="text-sm hover:text-white transition">
                Inicio
              </a>
              <a href="#" className="text-sm hover:text-white transition">
                Servicios
                </a>    
              <a href="/contact" className="text-sm hover:text-white transition">
                Contacto
              </a>
            </nav>
  
            {/* Social media icons */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M22 12a10 10 0 10-11 9.95v-7.03h-2v-2.92h2v-1.9c0-2.1 1.22-3.31 3.1-3.31.9 0 1.85.16 1.85.16v2h-1.04c-1.03 0-1.35.63-1.35 1.27v1.78h2.3l-.37 2.92h-1.93V22A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.67 2a4.48 4.48 0 00-4.49 4.48c0 .35.04.69.1 1A12.8 12.8 0 013 4.08a4.48 4.48 0 001.39 5.98 4.47 4.47 0 01-2-.56v.06a4.48 4.48 0 003.6 4.4 4.48 4.48 0 01-2 .07 4.48 4.48 0 004.2 3.12A9 9 0 010 19.54 12.7 12.7 0 006.92 22c8.1 0 12.53-6.72 12.53-12.53 0-.19 0-.37-.01-.56A8.93 8.93 0 0023 3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm8.5 1.5a4.25 4.25 0 014.25 4.25v8.5a4.25 4.25 0 01-4.25 4.25h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5h8.5zm-4.25 3a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm0 1.5a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5zm5.5-.9a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1z" />
                </svg>
              </a>
            </div>
          </div>
  
          <div className=" text-center text-sm text-sm text-white-400">
          &copy; 2025 Baleart. Todos los derechos reservados.

          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  