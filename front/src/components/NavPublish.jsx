import { Link } from "react-router-dom"

export default function NavPublish() {
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