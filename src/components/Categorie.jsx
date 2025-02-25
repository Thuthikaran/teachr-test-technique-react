import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';
import axios from '../services/axios';

const Categorie = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.category);

  // Local state for adding and editing categories
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Add a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    axios
      .post('/categorie', { nom: newCategoryName })
      .then(() => {
        dispatch(fetchCategories());
        setNewCategoryName('');
      })
      .catch((err) => console.error(err));
  };

  // Delete a category
  const handleDeleteCategory = (id) => {
    axios
      .delete(`/categorie/${id}`)
      .then(() => {
        dispatch(fetchCategories());
      })
      .catch((err) => console.error(err));
  };

  // Start editing a category
  const startEditingCategory = (cat) => {
    setEditingCategory(cat);
    setEditCategoryName(cat.nom);
  };

  // Submit the edited category
  const handleEditCategory = (e) => {
    e.preventDefault();
    axios
      .put(`/categorie/${editingCategory.id}`, { nom: editCategoryName })
      .then(() => {
        dispatch(fetchCategories());
        setEditingCategory(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Catégories</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form to add a new category */}
      <form onSubmit={handleAddCategory} className="mb-4 p-2 border rounded">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border p-1 m-1"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-1 m-1">
          Ajouter Catégorie
        </button>
      </form>

      {/* Categories table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">
                  {editingCategory && editingCategory.id === cat.id ? (
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    cat.nom
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingCategory && editingCategory.id === cat.id ? (
                    <>
                      <button
                        onClick={handleEditCategory}
                        className="bg-green-500 text-white p-1 m-1"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="bg-gray-500 text-white p-1 m-1"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditingCategory(cat)}
                        className="bg-yellow-500 text-white p-1 m-1"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="bg-red-500 text-white p-1 m-1"
                      >
                        Supprimer
                      </button>
                    </>
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
