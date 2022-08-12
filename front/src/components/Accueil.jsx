import React from 'react';
import Header from './Header';
import logo from "../assets/logo.png"
const connection = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='image'>
                <img src={logo} alt="" />
            </div>
            <div>
                <h1>Bienvenue sur Groupomania</h1>
            </div>
            <div className='conteneur'>
                <form className="conteneur_champs">
                <div className='conteneur_champs--champ'>
                        <p>Nom :</p>
                        <input type="text" />
                    </div>
                    <div className='conteneur_champs--champ'>
                        <p>Prénom :</p>
                        <input type="text" />
                    </div>
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
            <div className='signup'>
                <button type='submit'>S'inscrire</button>
            </div>
        </>
    );
};

export default connection;