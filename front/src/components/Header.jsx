import logo from "../assets/logo.png"

export default function Header() {
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