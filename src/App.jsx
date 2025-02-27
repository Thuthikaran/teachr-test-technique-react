import Produit from './components/Produit';
import Categorie from './components/Categorie';
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="bg-[#004066]">
      <div className="bg-white rounded">
        <NavBar />
        <Categorie />
        <Produit />
      </div>
    </div>
  );
};
export default App;


