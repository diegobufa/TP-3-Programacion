import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h3>ElectroFest</h3>

        <div className="footer-social">
          <FaFacebook />
          <FaLinkedin />
          <FaYoutube />
          <FaInstagram />
        </div>
      </div>

      <div className="footer-column">
        <h4>Atención al Cliente:</h4>
        <p>0800-123-1234</p>
        <p>0801-123-1234</p>
        <small>LUN-VIE 08:00 a 16:00hs</small>
        <small>SAB 08:00 a 12:00hs</small>
      </div>

      <div className="footer-column">
        <h4>Cobranzas:</h4>
        <p>Cobranzas.Nombre@hotmail.com</p>
      </div>

      <div className="footer-column">
        <h4>Venta Telefónica:</h4>
        <p>0800-123-1235</p>
        <small>LUN-VIE 08:00 a 20:00</small>
        <small>SAB 09:00 a 21:00</small>
      </div>

      <div className="footer-column">
        <h4>Contactanos</h4>
        <p>Whatsapp:</p>
        <p>0800-123-1236</p>
      </div>
    </footer>
  );
};

export default Footer;