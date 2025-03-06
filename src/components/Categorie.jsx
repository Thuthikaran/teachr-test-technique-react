import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';
import axios from '../services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    const trimmedValue = newCategoryName.trim();
    if (!trimmedValue) {
      alert('Veuillez entrer un nom de catégorie valide.');
      return;
    } 
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
     const trimmedValue = editCategoryName.trim();
     if (!trimmedValue) {
       alert('Veuillez entrer un nom de catégorie valide.');
       return; // Stop execution if input is invalid
     }
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
      <h1 className="text-3xl font-extrabold mb-4 text-[#2F73E2]">
        Catégories
      </h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form to add a new category */}
      <form
        onSubmit={handleAddCategory}
        className="bg-[#D8E1F9] mb-4 p-4 border rounded-lg shadow-md flex items-center"
      >
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border border-black p-2 flex-grow mr-2 rounded-lg bg-white"
          required
        />
        <button
          type="submit"
          className="bg-[#1176EA] text-white py-2 px-4 rounded-lg hover:bg-[#0E5BAF] hover:cursor-pointer"
        >
          Ajouter Catégorie
        </button>
      </form>

      {/* Categories displayed as cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#2F74E2] shadow-md p-4 rounded-lg flex justify-between text-white items-center"
          >
            {editingCategory && editingCategory.id === cat.id ? (
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="border p-2 rounded-lg flex-grow mr-2"
              />
            ) : (
              <span className="font-semibold">{cat.nom}</span>
            )}
            <div className="flex space-x-2">
              {editingCategory && editingCategory.id === cat.id ? (
                <>
                  <button
                    onClick={handleEditCategory}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditingCategory(cat)}
                    className="bg-[#219CFF] text-white p-2 rounded-lg hover:bg-[#0F75C6] hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="bg-[#FF714F] text-white p-2 rounded-lg hover:bg-[#015C81] hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="text-center text-gray-500">Aucune catégorie disponible</p>
      )}
    </div>
  );
};

export default Categorie;
