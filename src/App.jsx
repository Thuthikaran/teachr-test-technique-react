import Produit from './components/Produit';
import Categorie from './components/Categorie';
import NavBar from './components/NavBar'
// import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-[#004066]">
      <div className="bg-white rounded">
        <NavBar />
        <Categorie />
        <Produit />
        {/* < Footer /> */}
      </div>
    </div>
  );
};
export default App;


