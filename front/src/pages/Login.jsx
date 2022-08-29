// importations des modules
import Header from '../components/Header'
import Nav from '../components/Nav'
import LoginForm from '../components/LoginForm';

// exportation de la fonction Login
export default function Login() {
    // affichage (render) //
    return (
        <>
            <header>
                <Nav />
                <Header />
            </header>
            <section className='form'>
                <LoginForm />
            </section>
        </>
    );
};