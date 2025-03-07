import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';
import axios from '../services/axios';
import AddProductForm from './AddProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

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
    if (!editDescription) {
      alert('Entrer une description valide')
    }
    if (!editNom) {
      alert('Entrer une description valide');
    }
    if (editPrix == 0) {
      alert('Prix peut pas etre 0');
    }
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

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...produits].sort((a, b) => {
    if (sortCriteria === 'prix') {
      return sortDirection === 'asc' ? a.prix - b.prix : b.prix - a.prix;
    } else if (sortCriteria === 'categorie') {
      const catA = a.categorie?.nom || '';
      const catB = b.categorie?.nom || '';
      return sortDirection === 'asc'
        ? catA.localeCompare(catB)
        : catB.localeCompare(catA);
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((prod) =>
    prod.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#E6F2F5]">
      <h1 className="text-3xl font-extrabold mb-4 text-[#2F73E2]">Produits</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="🔍 Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 mb-3 w-72 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#015C81] focus:border-[#015C81] hover:shadow-md transition-shadow duration-200 bg-white"
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
            <tr className="bg-[#2F74E2] text-white">
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">
                <div className="flex items-center justify-center">
                  <span>Prix</span>
                  <button
                    onClick={() => handleSort('prix')}
                    className="ml-2 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={
                        sortCriteria === 'prix' && sortDirection === 'asc'
                          ? faSortUp
                          : faSortDown
                      }
                      className={`text-xl ${
                        sortCriteria === 'prix'
                          ? 'text-[#FF704F]'
                          : 'text-[#FF704F]'
                      }`}
                    />
                  </button>
                </div>
              </th>
              <th className="py-2 px-4 border">Date de création</th>
              <th className="py-2 px-4 border">
                <div className="flex items-center justify-center">
                  <span>Catégorie</span>
                  <button
                    onClick={() => handleSort('categorie')}
                    className="ml-2 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={
                        sortCriteria === 'categorie' && sortDirection === 'asc'
                          ? faSortUp
                          : faSortDown
                      }
                      className={`text-xl ${
                        sortCriteria === 'categorie'
                          ? 'text-[#FF704F]'
                          : 'text-[#FF704F]'
                      }`}
                    />
                  </button>
                </div>
              </th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">
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
                <td className="py-2 px-4 border text-center">
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
                <td className="py-2 px-4 border text-center">
                  {editingProduct?.id === prod.id ? (
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={editPrix}
                      onChange={(e) => setEditPrix(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    prod.prix + ' €'
                  )}
                </td>
                <td className="py-2 px-4 border text-center">
                  {prod.dateCreation
                    ? new Date(prod.dateCreation).toLocaleDateString('fr-FR')
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border text-center">
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
                <td className="py-2 px-4 border text-center">
                  {editingProduct?.id === prod.id ? (
                    <>
                      <button
                        onClick={handleEditSubmit}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600l hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 m-1 hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTimes} />
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
