import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import axios from '../services/axios';

const Produit = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  // Local state for editing a product
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNom, setEditNom] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrix, setEditPrix] = useState('');
  const [editCategorie, setEditCategorie] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Delete product (using axios; you could also dispatch a Redux action)
  const handleDelete = (id) => {
    axios
      .delete(`/produit/${id}`)
      .then(() => {
        // Re-fetch products after deletion
        dispatch(fetchProducts());
      })
      .catch((err) => console.error('Delete error', err));
  };

  // Start editing a product: fill local state with product data
  const startEditing = (product) => {
    setEditingProduct(product);
    setEditNom(product.nom);
    setEditDescription(product.description);
    setEditPrix(product.prix);
    setEditCategorie(product.categorie ? product.categorie.id : '');
  };

  // Submit the edited product update
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      nom: editNom,
      description: editDescription,
      prix: parseInt(editPrix, 10),
      categorie: editCategorie,
    };
    axios
      .put(`/produit/${editingProduct.id}`, updatedProduct)
      .then((res) => {
        dispatch(fetchProducts());
        setEditingProduct(null);
      })
      .catch((err) => console.error('Update error', err));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Produits</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Prix</th>
              <th className="py-2 px-4 border">Catégorie</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
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
                        className="bg-green-500 text-white p-1 m-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white p-1 m-1"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(prod)}
                        className="bg-yellow-500 text-white p-1 m-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-red-500 text-white p-1 m-1"
                      >
                        Delete
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
