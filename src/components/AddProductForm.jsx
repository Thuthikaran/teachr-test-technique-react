import { useState, useEffect } from 'react';
import axios from '../services/axios';

// eslint-disable-next-line react/prop-types
const AddProductForm = ({ onProductAdded }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorieId, setCategorieId] = useState('');

  // Store all categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories to populate the dropdown
    axios
      .get('/categorie')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      nom,
      description,
      prix: parseInt(prix, 10), // Using integer values now
      categorie: categorieId, // The chosen category ID
    };

    try {
      const res = await axios.post('/produit', newProduct);
      onProductAdded(res.data);
      setNom('');
      setDescription('');
      setPrix('');
      setCategorieId('');
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded">
      <h2 className="text-lg font-bold mb-2">Add New Product</h2>

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

      <button type="submit" className="bg-blue-500 text-white p-1 m-1">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
