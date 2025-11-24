function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Checkly</p>
    </footer>
  );
}

export default Footer;