import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            className="pagines"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/male" className="pagines">
            Male
          </NavLink>
        </li>
        <li>
          <NavLink to="/female" className="pagines">
            Female
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="pagines">
            About Us
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/contact" className="pagines">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
