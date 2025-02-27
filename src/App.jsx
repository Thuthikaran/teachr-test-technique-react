import Produit from './components/Produit';
import Categorie from './components/Categorie';
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="">
      <div className="rounded">
        <NavBar />
        <Categorie />
        <Produit />
      </div>
    </div>
  );
};
export default App;


