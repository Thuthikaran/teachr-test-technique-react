import { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/categorySlice';

// eslint-disable-next-line react/prop-types
const AddProductForm = ({ onProductAdded }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [dateCreation, setDateCreation] = useState(''); // New state for date

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories from Redux
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      nom,
      description,
      prix: parseInt(prix, 10),
      categorie: categorieId,
      dateCreation, // If you send it, you'll have to handle it on the backend
    };

    try {
      const res = await axios.post('/produit', newProduct);
      onProductAdded(res.data);
      setNom('');
      setDescription('');
      setPrix('');
      setCategorieId('');
      setDateCreation('');
      dispatch(fetchCategories()); // Refresh categories after adding a new one
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-2 border rounded bg-[#D8E1F9] text-black"
    >
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="border p-1 m-1"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 m-1"
        required
      />
      <input
        type="number"
        step="1"
        placeholder="Prix"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        className="border p-1 m-1"
        required
      />
      <select
        value={categorieId}
        onChange={(e) => setCategorieId(e.target.value)}
        className="border p-1 m-1"
        required
      >
        <option value="">-- Choisir une catégorie --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nom}
          </option>
        ))}
      </select>
      {/* Optional: Manual Date Creation Field */}
      <input
        type="date"
        placeholder="Date de création"
        value={dateCreation}
        onChange={(e) => setDateCreation(e.target.value)}
        className="border p-1 m-1"
      />

      <button
        type="submit"
        className="bg-[#1176EA] rounded-full text-white pt-1 pb-1 pr-2 pl-2 hover:cursor-pointer m-1"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
