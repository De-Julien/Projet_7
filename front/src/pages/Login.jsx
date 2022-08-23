// importations des modules
import { useState } from 'react';
import Header from '../components/Header'
import Nav from '../components/Nav'


// exportation de la fonction Login
export default function Login() {
    // state (état, données)
    const loginFrom = {
        email: "",
        mot_de_passe: ""
    }
    const [formValues, setFromValues] = useState(loginFrom)
    // comportements
    const handleChange = (e) => {
        const formValuesCopy = { ...formValues };
        const { name, value } = e.target;
        setFromValues({...formValuesCopy, [name] :value });
        console.log(formValues);
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(loginFrom),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    // affichage (render)
    return (
        <>
            <header>
                <Nav />
                <Header />
            </header>
            <section className='form'>
                <form className='form_container' onSubmit={handelSubmit}>
                    <div className='form_container--value'>
                        <label htmlFor="email">Email : </label>
                        <input type="email" name="email" id="email" required onChange={handleChange} />
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="mdp">Mot de passe : </label>
                        <input type="password" name="mot_de_passe" id="mot_de_passe" required onChange={handleChange} />
                    </div>
                    <div className='form--submit'>
                        <button type='submit'>Se connecter</button>
                    </div>
                </form>
            </section>

        </>
    );
};