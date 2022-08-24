// importations des modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Nav from '../components/Nav'



// exportation de la fonction Login
export default function Login() {
    // state (état, données) //
    const navigate = useNavigate()
    const loginFrom = {
        email: "",
        mot_de_passe: ""
    }
    const [formValues, setFromValues] = useState(loginFrom)
    const [Data, setData] = useState({})
    // comportements //
    const handleChange = (e) => {
        const formValuesCopy = { ...formValues };
        const { name, value } = e.target;
        setFromValues({ ...formValuesCopy, [name]: value });
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        })
            .then(response => { response.json()
                .then((data) => {
                    if (response.status === 200) {
                    const dataCopy = data;
                    setData(dataCopy);
                    navigate("/publish");
                } else {
                    alert(`L'identifiant ou le mot de passe est incorrecte !`)
                }
                } )
                
            })
            .catch(e => {
                console.log(e)
            })
    }
    // affichage (render) //
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
                        <input type="email" name="email" id="email" required onChange={handleChange} value={formValues.email} />
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="mdp">Mot de passe : </label>
                        <input type="password" name="mot_de_passe" id="mot_de_passe" required onChange={handleChange} value={formValues.mot_de_passe} />
                    </div>
                    <div className='form--submit'>
                    <button type='submit'>Se connecter</button>
                    </div>
                </form>
            </section>

        </>
    );
};