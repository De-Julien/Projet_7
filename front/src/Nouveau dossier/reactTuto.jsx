import { useState } from "react";

function App() {
  // state (état, données)
  const [compteur, setCompteur] = useState(10);

  // comportements
  const handleClick = () => {
    //sauvegarde la nouvelle valeur de compteur +1
    setCompteur(compteur + 1);
  };

  //affichage (render)
  return (
    <div>
      <h1>{compteur}</h1>
      <button onClick={handleClick}>incremente</button>
    </div>
  );
}

import { useRef, useState } from "react";

function App() {
  // state (état, données)
  const [fruits, setFruits] = useState([
    { id: 1, nom: "abricot" },
    { id: 2, nom: "banane" },
    { id: 3, nom: "cerise" }
  ]);

  const [nouveaufruit, setNouveauFruit] = useState("");

  //comportements
  const handleDelete = (id) => {
    //1. copie du state
    // on destructure le tableau dans un nouveau tableau
    const fruitsCopy = [...fruits];

    //2. manipuler la copy

    const fruitCopyUpdate = fruitsCopy.filter((fruit) => fruit.id !== id);
    //3. modifier le state avec la maj
    setFruits(fruitCopyUpdate);
  };

  const handleChange = (e) => {
    setNouveauFruit(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const fruitscopy = [...fruits]; // destructure le tableau dans un tableau
    const id = new Date().getTime(); // id on fonction du temps
    const nom = nouveaufruit; // nom du nouveau fruit
    fruitscopy.push({ id, nom }); // envoie dans le tableau l'id unique avec le nouveau fruit
    setFruits(fruitscopy); // sauvegarde la copie du tableau dans le tableau pour mettre a jour
    setNouveauFruit(""); // renvoie une chaine vide après l'envoie
  };

  //affichage (render)
  return (
    <div>
      <h1> liste de fruits </h1>
      <ul>
        {fruits.map((fruits) => (
          <li key={fruits.id}>
            {fruits.nom}
            <button onClick={() => handleDelete(fruits.id)}>X</button>
          </li>
        ))}
      </ul>
      <form acton="submit" onSubmit={handelSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="ajouter un fruit"
        />
        <button>ajouter</button>
      </form>
    </div>
  );
}

export default App;
