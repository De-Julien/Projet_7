import React from 'react';
import Header from '../../components/Header'
import Nav from '../../components/Nav'

const Login = () => {
    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>
                <Header />
            </div>
            <div className='conteneur'>
                <form className="conteneur_champs">
                    <div className='conteneur_champs--champ'>
                        <p>Email :</p>
                        <input type="text" />
                    </div>
                    <div className='conteneur_champs--champ'>
                        <p>Mot de passe :</p>
                        <input type="text" />
                    </div>
                </form>
            </div>
            <div className='conteneur--button'>
                <button type='submit'>Se connecter</button>
            </div>
        </div>
    );
};

export default Login;