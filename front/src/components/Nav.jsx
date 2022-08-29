// importations des modules
import { Link } from "react-router-dom"

// exportation de la fonction Nav
export default function Nav() {
  // affichage (render) //
  return (
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
  );
};