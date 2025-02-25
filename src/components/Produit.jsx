import { useEffect, useState } from 'react';
import axios from '../services/axios';

const Produit = () => {
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/produit')
      .then((res) => setProduits(res.data))
      .catch(() => setError('Erreur lors de la récupération des produits.'));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Produits</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Prix</th>
              <th className="py-2 px-4 border">Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{prod.nom}</td>
                <td className="py-2 px-4 border">
                  {prod.description || 'N/A'}
                </td>
                <td className="py-2 px-4 border">{prod.prix} €</td>
                <td className="py-2 px-4 border">
                  {prod.categorie?.nom || 'Non spécifiée'}
                </td>
              </tr>
            ))}
            {produits.length === 0 && (
              <tr>
                <td className="py-2 px-4 text-center border" colSpan="4">
                  Aucun produit disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produit;
