import React from 'react';
import Header from '../../components/Header'
import Nav from '../../components/Nav'

const signup = () => {
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
                        <label for="nom">Nom : </label>
                        <input type="text" name="nom" id="nom" required />
                        <p id="firstNameErrorMsg" />
                    </div>
                    <div className='conteneur_champs--champ'>
                        <label for="prenom">Prénom : </label>
                        <input type="text" name="prenom" id="prenom" required />
                        <p id="firstNameErrorMsg" />
                    </div>
                    <div className='conteneur_champs--champ'>
                        <label for="email">Email : </label>
                        <input type="text" name="email" id="email" required />
                        <p id="firstNameErrorMsg" />
                    </div>
                    <div className='conteneur_champs--champ'>
                        <label for="mdp">Mot de passe : </label>
                        <input type="text" name="mdp" id="mdp" required />
                        <p id="firstNameErrorMsg" />
                    </div>
                </form>
            </div>
            <div className='conteneur--button'>
                <button type='submit'>S'inscrire</button>
            </div>
        </div>
    );
};

export default signup;