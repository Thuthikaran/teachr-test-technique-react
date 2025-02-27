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
    setEditCategorie(product.categorie ? product.categorie.id : ''); // Store ID
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      nom: editNom,
      description: editDescription,
      prix: parseInt(editPrix, 10),
      categorie: parseInt(editCategorie, 10), // Send ID instead of name
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
        refreshCategories(); // Refresh categories after update
      })
      .catch((err) => console.error('Update error', err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/produit/${id}`)
      .then(() => {
        setProduits(produits.filter((prod) => prod.id !== id));
        refreshCategories(); // ✅ Refresh categories after deleting a product
      })
      .catch((err) => console.error('Delete error', err));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Produits</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <AddProductForm
        onProductAdded={(newProduct) => {
          setProduits((prev) => [...prev, newProduct]);
          refreshCategories(); // Refresh categories after adding a new one
        }}
      />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse bg-white shadow">
          <thead>
            <tr className="bg-[#015C81] text-white">
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Prix</th>
              <th className="py-2 px-4 border">Catégorie</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((prod) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produit;
