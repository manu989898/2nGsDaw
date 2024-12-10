import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa"
import './topInfo.css'

export default function TopInfo(){
    return (
        <section className="top-info">
            <div className="header-social-container">
                <a href="#" className="social-link">
                    <FaFacebookSquare />
                </a>
                <a href="#" className="social-link">
                    <FaTwitterSquare />
                </a>
                <a href="#" className="social-link">
                    <FaInstagramSquare />
                </a>
                <a href="#" className="social-link">
                    <FaLinkedin />
                </a>
            </div>
            <div className="shipping-text">
                Free Shipping This Week Order Over 55€
            </div>
            <div>
                <select defaultValue="es">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="ca">Catalan</option>
                </select>
            </div>
        </section>
    )
}