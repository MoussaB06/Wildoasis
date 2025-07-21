import { footer, copyright } from "./Footer.module.css";

function Footer() {
  return (
    <footer className={footer}>
      <p className={copyright}>
        &copy; Copywright {new Date().getFullYear()} by Worldwise Inc.
      </p>
    </footer>
  );
}

export default Footer;
