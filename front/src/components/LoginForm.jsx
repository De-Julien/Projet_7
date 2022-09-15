// importations des modules
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

// exportation de la fonction LoginForm
export default function LoginForm() {
    // state (état, données) //
    const navigate = useNavigate()
    // model utilisé par formValues
    const loginFrom = {
        email: "",
        mot_de_passe: ""
    }
    const [formValues, setFromValues] = useState(loginFrom)
    // comportements //
    // fonction qui créer une copie du tableau, récupère les valeurs de name et value et sauvegarde dans le state
    const handleChange = (e) => {
        const formValuesCopy = { ...formValues };
        const { name, value } = e.target;
        setFromValues({ ...formValuesCopy, [name]: value });
    };
    // fonction qui envoie les données, sauvegarde le token dans le sessionStorage
    const handelSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        if (response.status === 200) {   
                            sessionStorage.setItem('isAdmin', data.isAdmin)                   
                            sessionStorage.setItem('token', data.token)
                            sessionStorage.setItem('userId', data.userId)
                            navigate("/publish");
                        } else {
                            alert(`L'identifiant ou le mot de passe est incorrecte !`)
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    // affichage (render) //
    return (
        <form className='form_container' onSubmit={handelSubmit}>
            <div className='form_container--value'>
                <label htmlFor="email">Email : </label>
                <input type="email" name="email" id="email" required onChange={handleChange} value={formValues.email} />
            </div>
            <div className='form_container--value'>
                <label htmlFor="mot_de_passe">Mot de passe : </label>
                <input type="password" name="mot_de_passe" id="mot_de_passe" required onChange={handleChange} value={formValues.mot_de_passe} />
            </div>
            <div className='form--submit'>
                <button type='submit'>Se connecter</button>
            </div>
        </form>
    )
}

