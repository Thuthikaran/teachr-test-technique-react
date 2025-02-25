import Produit from './components/Produit';
import Categorie from './components/Categorie';

const App = () => {
  return (
    <div className="min-h-screen bg-blue-500 p-4">
      <div className="bg-white p-4 rounded">
        <Categorie />
        <Produit />
      </div>
    </div>
  );
};
export default App;


