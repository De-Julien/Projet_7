// importations des modules
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Nav from '../components/Nav'

// exportation de la fonction Signup
export default function Signup() {
    // state (état, données) //
    const navigate = useNavigate()
    // model utilisé par formValues
    const signupFrom = {
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: ""
    }
    const [formValues, setFromValues] = useState(signupFrom)
    const [formErrors, setFormErrors] = useState({})
    
    // comportements //
    const handleChange = (e) => {
        const formValuesCopy = { ...formValues };
        const { name, value } = e.target;
        setFromValues({ ...formValuesCopy, [name]: value });
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        fetch(`http://localhost:3001/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        })
            .then(response => {
                if(response.status === 201) {
                  alert('Votre compte à bien été créé !')
                  navigate('/login')
                } else {
                    alert(`L'adresse email entré est déjà utilisé !`)
                }
            })
            .catch(err=> {
                alert(err)
            })
    };
/*
    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
           alert("Votre compte à bien été créé")
        }
    })
*/

    const validate = (values) => {
        const errors = {};
        const regexNom = /^[a-zA-Z]{2,}$/;
        const regexPrenom = /^[a-zA-Z]+-{0,1}[a-zA-Z]+$/;
        const regexEmail = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-]{2,}[.][a-z]{2,3}$/;
        if (!values.nom) {
            errors.nom = "Veuillez entrer un nom valide !"
        } else if (!regexNom.test(values.nom)) {
            errors.nom = "Le format de votre nom est incorrecte !"
        }
        if (!values.prenom) {
            errors.prenom = "Veuillez entrer un prénom valide !"
        } else if (!regexPrenom.test(values.prenom)) {
            errors.prenom = "Le format de votre prénom est incorrecte !"
        }
        if (!values.email) {
            errors.email = "Veuillez entrer un email valide !"
        } else if (!regexEmail.test(values.email)) {
            errors.email = "Le format de votre email est incorrecte !"
        }
        if (!values.mot_de_passe) {
            errors.mot_de_passe = "Veuillez entrer mot de passe !"
        } else if (values.mot_de_passe.length < 4) {
            errors.mot_de_passe = "Veuillez entrer mot de passe d'aux moins 4 caractères !"
        }
        return errors;
    };

    // affichage (render) //
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
                        <p id="msgError">{ formErrors.nom }</p>
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="prenom">Prénom : </label>
                        <input type="text" name="prenom" id="prenom" required onChange={handleChange} value={formValues.prenom} />
                        <p id="msgError">{ formErrors.prenom }</p>
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="email">Email : </label>
                        <input type="email" name="email" id="email" required onChange={handleChange} value={formValues.email} />
                        <p id="msgError">{ formErrors.email }</p>
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="mdp">Mot de passe : </label>
                        <input type="password" name="mot_de_passe" id="mot_de_passe" required onChange={handleChange} value={formValues.mot_de_passe} />
                        <p id="msgError">{ formErrors.mot_de_passe }</p>
                    </div>
                    <div className='form--submit'>
                        <button className='inscription' type='submit'>S'inscrire</button>
                    </div>
                </form>
            </section>

        </>
    );
};