import "./Footer.css";

function Footer(): JSX.Element {

    const now= new Date()
    const year= now.getFullYear()

    return (
        <div className="Footer">
			<p>Privacy Policy</p>
			<p>Cookies</p>
			<p>©️ {year} Tripozo</p>
        </div>
    );
}

export default Footer;
