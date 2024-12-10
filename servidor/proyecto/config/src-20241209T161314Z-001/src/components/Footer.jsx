import './footer.css'

export default function Footer(){
  return (
    <footer>
      <nav className="footer-nav">
        <ul className="footer-nav-list">
          <li>
            <h2 className="nav-title">Categories</h2>
          </li>
          <li><a href="#">Fashion</a></li>
          <li><a href="#">Electronic</a></li>
          <li><a href="#">Cosmetic</a></li>
          <li><a href="#">Health</a></li>
          <li><a href="#">Watches</a></li>
        </ul>

        <ul className="footer-nav-list">
          <li>
            <h2 className="nav-title">Products</h2>
          </li>
          <li><a href="#">Prices drop</a></li>
          <li><a href="#">New products</a></li>
          <li><a href="#">Best sales</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>

        <ul className="footer-nav-list">
          <li>
            <h2 className="nav-title">Our Company</h2>
          </li>
          <li><a href="#">Delivery</a></li>
          <li><a href="#">Legal Notice</a></li>
          <li><a href="#">Terms and conditions</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Secure payment</a></li>
        </ul>

        <ul className="footer-nav-list">
          <li>
            <h2 className="nav-title">Services</h2>
          </li>
          <li><a href="#">Prices drop</a></li>
          <li><a href="#">New products</a></li>
          <li><a href="#">Best sales</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </nav>

      <section className="footer-bottom">
        <img src="/assets/images/payment.png" alt="payment method" className="payment-img"/>
        <p className="copyright">
          Copyright &copy; Dress all rights reserved.
        </p>
      </section>
    </footer>
  )
}