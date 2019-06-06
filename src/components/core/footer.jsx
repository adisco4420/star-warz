import React from 'react';

function Footer() {
    return (
      <footer className="footer mt-auto py-3 bg-dark">
      <div className="container">
        <span className="text-light">Star Warz &copy; copyright {new Date().getFullYear()}</span>
      </div>
    </footer>
    )
}
export default Footer;