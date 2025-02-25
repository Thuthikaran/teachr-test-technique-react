import { useEffect, useState } from 'react';
import axios from '../services/axios';

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/categorie')
      .then((res) => setCategories(res.data))
      .catch(() => setError('Erreur lors de la récupération des catégories.'));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Catégories</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Produits</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{cat.nom}</td>
                <td className="py-2 px-4 border">
                  {cat.produits && cat.produits.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {cat.produits.map((prod) => (
                        <li key={prod.id}>{prod.nom}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">
                      Aucun produit associé.
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td className="py-2 px-4 text-center border" colSpan="2">
                  Aucune catégorie disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorie;
