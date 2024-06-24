import Footer from './Footer'
import Header from './Header'
import { Outlet }  from 'react-router-dom'
import Navibar from './Navibar';
import './Layout.css'

const Layout = () => {
    return (
        <div id="wrap">
            <Header />
                <main className="main">
                    <Navibar/>
                    <Outlet />
                </main>
            <Footer />
        </div>
    );
};

export default Layout;