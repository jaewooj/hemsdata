import './Header.css'
import Title from './Title.jsx';

const Header = () => {
    return (
        <header className="header">
            <Title/>
            {/* <Navbar/> */}
            <div className="inner">
            </div>
        </header>
    );
};

export default Header;