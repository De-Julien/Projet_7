// importations des modules
import { useState } from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'

// exportation de la fonction Signup
export default function Signup() {
    // state (état, données)
    const signupFrom = {
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: ""
    }
    const [formValues, setFromValues] = useState(signupFrom)
    // comportements
    const handleChange = (e) => {
        const formValuesCopy = { ...formValues };
        const { name, value } = e.target;
        setFromValues({...formValuesCopy, [name] :value });
        console.log(formValues);
    };
    const handelSubmit = (e) => {
        fetch(`http://localhost:3001/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(signupFrom)
        })
            .then(response => console.log(response))
            .catch(e => {
                console.log(e)
            })
    };   
    /*
    const handelClick = (e) => {
        fetch(`http://localhost:3001/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(signupFrom)
        })
            .then(response => console.log(response))
            .catch(e => {
                console.log(e)
            })
    };
    */
    /*
    const validate = (values) => {

    }
    */
    // affichage (render)
    return (
        <>
            <header>
                <Nav />
                <Header />
            </header>
            <section className='form'>
                <form className="form_container" onSubmit={handelSubmit}>
                    <div className='form_container--value'>
                        <label htmlFor="nom">Nom : </label>
                        <input type="text" name="nom" id="nom" required onChange={handleChange} value={formValues.nom} />
                        <p id="nomErreur">Veuillez entrer un nom valide !</p>
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="prenom">Prénom : </label>
                        <input type="text" name="prenom" id="prenom" required onChange={handleChange} value={formValues.prenom} />
                        <p id="prenomErreur">Veuillez entrer un prenom valide !</p>
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="email">Email : </label>
                        <input type="email" name="email" id="email" required onChange={handleChange} value={formValues.email} />
                        <p id="emailErreur">Veuillez entrer un email valide !</p>
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="mdp">Mot de passe : </label>
                        <input type="password" name="mot_de_passe" id="mot_de_passe" required onChange={handleChange} value={formValues.mot_de_passe} />
                        <p id="mdpErreur">Veuillez entrer mot de passe !</p>
                    </div>
                    <div className='form--submit'>
                        <button className='inscription' type='submit' /*onClick={handelClick}*/>S'inscrire</button>
                    </div>
                </form>
            </section>

        </>
    );
};