import Produit from './components/Produit';
import Categorie from './components/Categorie';
import NavBar from './components/NavBar'
import Showcase from './components/Showcase'

const App = () => {
  return (
    <div className="">
      <div className="rounded">
        <NavBar />
        < Showcase/>
        <Categorie />
        <Produit />
      </div>
    </div>
  );
};
export default App;


