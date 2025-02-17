export default function Header(){
    return(
       <section className="top-info">
        <div className="header-social-container">
        <a href="#" className="social-link">
          <i className="fa-brands fa-square-facebook"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fa-brands fa-square-twitter"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fa-brands fa-square-instagram"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="shipping-text">
        Free Shipping This Week Order Over 55€
      </div>
      <div>
        <select>
          <option value="en" selected>English</option>
          <option value="en">Spanish</option>
          <option value="ca">Catalan</option>
        </select>
      </div>
      
    </section> 
     

    )
}
