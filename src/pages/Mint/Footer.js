import React from "react";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="copyright-wrapper">
            <div className="copyright">© Meta Star | All rights reserved.</div>
            <div className="copyright powerd-by">
              – Powered by
              <a href="../index-3.htm" className="copyright-link">
                Upper Echelon Studios
              </a>
            </div>
          </div>
          <div className="copyright-wrapper">
            <div className="copyright smart-address">
              Smart Contract -
              <a
                href="../address/0x00FA82eA9BE4E24ec6D7ED86ef93bfe85b9a3e68.html"
                target="_blank"
                className="copyright-link"
              >
                0x00FA82eA9BE4E24ec6D7ED86ef93bfe85b9a3e68
              </a>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <a href="privacy-policy.html" className="legal-link">
              Privacy Policy
            </a>
            <a href="terms-of-service.html" className="legal-link right">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
