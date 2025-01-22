import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-head">
          <img className="logos" src="/sannotes.svg" />
          <div className="main-title">
            <h4 className="first-title">san</h4>
            <h4 className="second-title">notes.</h4>
          </div>
        </div>

        <div className="footer-content">
          <h4>Support</h4>
          <p>Hubungi Kami</p>
          <p>Syarat dan Ketentuan</p>
          <p>Kebijakan Privasi</p>
        </div>

        <h4 className="footer-title">
          &copy; {new Date().getFullYear()} SanNotes. All Rights Reserved
        </h4>
      </footer>
    </>
  );
};

export default Footer;
