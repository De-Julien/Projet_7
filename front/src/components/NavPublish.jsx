// importations des modules
import { Link } from "react-router-dom"

// exportation de la fonction NavPublish
export default function NavPublish() {
  // affichage (render) //
  return (
    <nav>
      <ul>
        <li className='bar'>
          |
        </li>
        <li>
          <Link className="link" to="/login">Se Déconnecter</Link>
        </li>
        <li className='bar'>
          |
        </li>
      </ul>
    </nav>
  );
};