import React from 'react';
import logo from "../assets/logo.png"
const Header = () => {
    return (
        <>
            <div className='image'>
                <img src={logo} alt="" />
            </div>
            <div>
                <h1>Bienvenue sur Groupomania</h1>
            </div>
        </>
    );
};

export default Header;