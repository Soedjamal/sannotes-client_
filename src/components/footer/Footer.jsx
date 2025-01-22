import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <h4 className="footer-title">
          &copy; {new Date().getFullYear()} SanNotes. All rights Reserved
        </h4>
      </footer>
    </>
  );
};

export default Footer;
