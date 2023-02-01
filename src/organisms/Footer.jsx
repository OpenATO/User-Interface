import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="usa-footer site-footer">
      <div className="footer-links">
        <a href="https://github.com/CivicActions/atoasap_api">
          About Rapid ATO
        </a>
        <Link to="/help">Rapid ATO Support</Link>
      </div>
    </footer>
  );
};

export default Footer;
