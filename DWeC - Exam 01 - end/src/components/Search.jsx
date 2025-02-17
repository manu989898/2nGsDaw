export default function Search () {
  return (
      <header>
          <section className="top-header">
              <div className="logo-container" style={{ width: '20%' }}>
                  <img src="./assets/images/logo/dress.svg" className="logo" alt="" />
              </div>
              <div className="search-container">
                  <input type="text" name="search" placeholder="Enter your product name..." />
                  <i className="fa-solid fa-magnifying-glass search-btn"></i>
              </div>
              <div className="icons-container">
                  <i className="fa-regular fa-user"></i>
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-sharp fa-solid fa-bag-shopping"></i>
              </div>
          </section>
          <nav className="main-nav">
              <a href="#">Home</a>
              <a href="#">Categories</a>
              <a href="#">Mens</a>
              <a href="#">Womens</a>
              <a href="#">Jewelry</a>
              <a href="#">Blog</a>
              <a href="#">Hot Offers</a>
          </nav>
      </header>
  )
}
