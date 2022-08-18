import React from 'react';
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/signup">S'inscrire</Link>
          </li>
          <li className='bar'>
            |
          </li>
          <li>
            <Link className="link" to="/login">Se Connecter</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;