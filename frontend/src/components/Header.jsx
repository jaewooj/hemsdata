import './Header.css'
import Navbar from './Navbar';
import Title from './title';

const Header = () => {
    return (
        <header className="header">
            <Title/>
            <Navbar/>
            <div className="inner">
            </div>
        </header>
    );
};

export default Header;