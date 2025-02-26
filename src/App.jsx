import Produit from './components/Produit';
import Categorie from './components/Categorie';
import NavBar from './components/NavBar'
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-[#004066] min-h-screen p-4">
      <div className="bg-white p-4 rounded">
        <NavBar />
        <Categorie />
        <Produit />
        < Footer />
      </div>
    </div>
  );
};
export default App;


