import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';
import axios from '../services/axios';
import AddProductForm from './AddProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const Produit = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNom, setEditNom] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrix, setEditPrix] = useState('');
  const [editCategorie, setEditCategorie] = useState('');

  useEffect(() => {
    axios
      .get('/produit')
      .then((res) => setProduits(res.data))
      .catch(() => setError('Error fetching products'));

    dispatch(fetchCategories()); // Fetch categories from Redux
  }, [dispatch]);

  const refreshCategories = () => {
    dispatch(fetchCategories()); // Re-fetch categories when a new one is added or product is deleted
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setEditNom(product.nom);
    setEditDescription(product.description);
    setEditPrix(product.prix);
    setEditCategorie(product.categorie ? product.categorie.id : '');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      nom: editNom,
      description: editDescription,
      prix: parseInt(editPrix, 10),
      categorie: parseInt(editCategorie, 10),
    };

    axios
      .put(`/produit/${editingProduct.id}`, updatedProduct)
      .then((res) => {
        setProduits(
          produits.map((prod) =>
            prod.id === editingProduct.id ? res.data : prod
          )
        );
        setEditingProduct(null);
        refreshCategories();
      })
      .catch((err) => console.error('Update error', err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/produit/${id}`)
      .then(() => {
        setProduits(produits.filter((prod) => prod.id !== id));
        refreshCategories();
      })
      .catch((err) => console.error('Delete error', err));
  };

  // ✅ Filter products based on search term (case-insensitive)
  const filteredProducts = produits.filter((prod) =>
    prod.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Produits</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* ✅ Search Input */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <AddProductForm
        onProductAdded={(newProduct) => {
          setProduits((prev) => [...prev, newProduct]);
          refreshCategories();
        }}
      />

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse bg-white shadow">
          <thead>
            <tr className="bg-[#015C81] text-white">
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Prix</th>
              <th className="py-2 px-4 border">Date de création</th>{' '}
              {/* ✅ Added Column */}
              <th className="py-2 px-4 border">Catégorie</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">
                  {editingProduct?.id === prod.id ? (
                    <input
                      value={editNom}
                      onChange={(e) => setEditNom(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    prod.nom
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingProduct?.id === prod.id ? (
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    prod.description
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingProduct?.id === prod.id ? (
                    <input
                      type="number"
                      step="1"
                      value={editPrix}
                      onChange={(e) => setEditPrix(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    prod.prix + ' €'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {' '}
                  {/* ✅ Display Date */}
                  {prod.dateCreation
                    ? new Date(prod.dateCreation).toLocaleDateString('fr-FR')
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border">
                  {editingProduct?.id === prod.id ? (
                    <select
                      value={editCategorie}
                      onChange={(e) => setEditCategorie(e.target.value)}
                      className="border p-1"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nom}
                        </option>
                      ))}
                    </select>
                  ) : (
                    prod.categorie?.nom || 'Non spécifiée'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingProduct?.id === prod.id ? (
                    <>
                      <button
                        onClick={handleEditSubmit}
                        className="bg-green-500 text-white p-1 m-1 rounded-full hover:cursor-pointer"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white p-1 m-1 rounded-full hover:cursor-pointer"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(prod)}
                        className="bg-[#219CFF] text-white pt-1 pb-1 pr-2 pl-2 rounded-full hover:cursor-pointer m-1"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-[#FF714F] text-white pt-1 pb-1 pr-2 pl-2 rounded-full hover:cursor-pointer m-1"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td className="py-2 px-4 text-center border" colSpan="6">
                  Aucun produit trouvé.
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
