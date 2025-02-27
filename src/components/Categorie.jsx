import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';
import axios from '../services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    const category = categories.find((cat) => cat.id === id);

    if (category?.produits && category.produits.length > 0) {
      alert(
        'Impossible de supprimer cette catégorie, elle contient des produits.'
      );
      return;
    }

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
    <div className="p-4 bg-[#E6F2F5]">
      {/* <h1 className="text-3xl font-extrabold mb-4 text-[black]]">Catégories</h1> */}
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form to add a new category */}
      <form
        onSubmit={handleAddCategory}
        className="bg-[#D8E1F9] mb-4 p-2 border rounded"
      >
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border border-black p-1 m-1 bg-[white]"
          required
        />
        <button
          type="submit"
          className="bg-[#1176EA] text-white pt-1 pb-1 pr-2 pl-2 rounded-full hover:cursor-pointer m-1"
        >
          Ajouter Catégorie
        </button>
      </form>

      {/* Categories table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border bg-[#015C81] text-3xl font-extrabold mb-4 text-[white]">
                Catégories
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border flex items-center justify-between">
                  {editingCategory && editingCategory.id === cat.id ? (
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="border p-1 flex-grow mr-2"
                    />
                  ) : (
                    <span className="flex-grow">{cat.nom}</span>
                  )}

                  {editingCategory && editingCategory.id === cat.id ? (
                    <>
                      <button
                        onClick={handleEditCategory}
                        className="bg-[#219CFF] text-white p-1 m-1 rounded-full hover:cursor-pointer"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="bg-gray-500 text-white p-1 m-1 rounded-full hover:cursor-pointer"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditingCategory(cat)}
                        className="bg-[#219CFF] text-white m-1 pt-1 pb-1 pr-2 pl-2 rounded-full hover:cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="bg-[#FF714F] text-white pt-1 pb-1 pr-2 pl-2 rounded-full hover:cursor-pointer m-1"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td className="py-2 px-4 text-center border">
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
