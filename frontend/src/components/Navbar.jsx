import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav">
            <ul>
                <li><Link to="/">MAIN</Link></li>
                <li><Link to="/hems">HEMS</Link></li>
                <li><Link to="/rems">REMS</Link></li>
                <li><Link to="/audit">AUDIT</Link></li>
                <li><Link to="/dataview">DATAVIEW</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;