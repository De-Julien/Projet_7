import React from 'react';

function signup(){
  console.log("je suis inscrit");
}

function login(){
  console.log("je suis log");
}

const Header = () => {
  return (
    <>
      <nav>
        <p onClick={signup}>S'inscrire</p>
        <p onClick={login}>Se Connecter</p>
      </nav>
    </>
  );
};

export default Header;