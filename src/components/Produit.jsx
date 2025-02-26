import { useEffect, useState } from 'react';
import axios from '../services/axios';
import AddProductForm from './AddProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const Produit = () => {
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNom, setEditNom] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrix, setEditPrix] = useState('');
  const [editCategorie, setEditCategorie] = useState('');

  const fetchProducts = () => {
    axios
      .get('/produit')
      .then((res) => setProduits(res.data))
      .catch(() => setError('Error fetching products'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Callback for when a new product is added
  const handleProductAdded = (newProduct) => {
    setProduits((prev) => [...prev, newProduct]);
  };

  // Delete a product
  const handleDelete = (id) => {
    axios
      .delete(`/produit/${id}`)
      .then(() => {
        setProduits(produits.filter((prod) => prod.id !== id));
      })
      .catch((err) => console.error('Delete error', err));
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingProduct(product);
    setEditNom(product.nom);
    setEditDescription(product.description);
    setEditPrix(product.prix);
    setEditCategorie(product.categorie ? product.categorie.id : '');
  };

  // Submit the edited product
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      nom: editNom,
      description: editDescription,
      prix: parseInt(editPrix, 10),
      categorie: editCategorie,
    };
    // Using `/produit/${editingProduct.id}` because axios base URL is already set to `/api`
    axios
      .put(`/produit/${editingProduct.id}`, updatedProduct)
      .then((res) => {
        setProduits(
          produits.map((prod) =>
            prod.id === editingProduct.id ? res.data : prod
          )
        );
        setEditingProduct(null);
      })
      .catch((err) => console.error('Update error', err));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Produits</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Form to add a new product */}
      <AddProductForm onProductAdded={handleProductAdded} />

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Prix</th>
              <th className="py-2 px-4 border">Date de création</th>
              <th className="py-2 px-4 border">Catégorie</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">
                  {editingProduct && editingProduct.id === prod.id ? (
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
                  {editingProduct && editingProduct.id === prod.id ? (
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
                  {editingProduct && editingProduct.id === prod.id ? (
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
                  {prod.dateCreation
                    ? new Date(prod.dateCreation).toLocaleString('fr-FR')
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border">
                  {editingProduct && editingProduct.id === prod.id ? (
                    <input
                      value={editCategorie}
                      onChange={(e) => setEditCategorie(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    prod.categorie?.nom || 'Non spécifiée'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingProduct && editingProduct.id === prod.id ? (
                    <>
                      <button
                        onClick={handleEditSubmit}
                        className="bg-green-500 text-white p-1 m-1 rounded-full hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white p-1 m-1 rounded-full hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
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
            {produits.length === 0 && (
              <tr>
                <td className="py-2 px-4 text-center border" colSpan="6">
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
