// importations des modules
import Header from '../components/Header'
import Nav from '../components/Nav'

// exportation de la fonction Home
export default function Home() {
  // affichage (render) //
  return (
    <header>
      <Nav />
      <Header />
    </header>
  );
}
