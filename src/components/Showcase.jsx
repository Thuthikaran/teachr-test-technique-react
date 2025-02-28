/* eslint-disable react/no-unescaped-entities */
const Showcase = () => {
  return (
    <div className="bg-[#015C81] text-white py-12 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">
          Bienvenue sur StackShelf
        </h1>
        <p className="text-lg mb-6">
          StackShelf est une application de gestion des produits et catégories,
          développée pour le test technique de Teach'r avec React.js et PHP
          Symfony.
        </p>

        {/* Cloudinary Image */}
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/drxas1wpe/image/upload/t_teachr/v1740703017/FirstImage_hdhzms.png"
            alt="StackShelf Showcase"
            className="w-64 h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
