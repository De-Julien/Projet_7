// importations des modules
import logo from "../assets/logo.png"

// exportation de la fonction Header
export default function Header() {
    // affichage (render) //
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