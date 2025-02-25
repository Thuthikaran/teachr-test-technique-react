import Produit from './components/Produit';
import Categorie from './components/Categorie';

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="text-center bg-white p-4 rounded">
        <p>React 19 is running</p>
        <p>by Thuthikaran.</p>
        <Produit />
        <Categorie />
      </div>
    </div>
  );
};
export default App;
