/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Showcase = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Votre gestionnaire de produits', 'Simplifiez votre stock'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      startDelay: 100,
      loop: false, 
      showCursor: false,
    });

    return () => {
      typed.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="bg-[#015C81] text-white py-12 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Static "Bienvenue sur StackShelf" */}
        <h1 className="text-4xl font-extrabold mb-2">
          Bienvenue sur{' '}
          <span className="font-pacifico text-orange-300">StackShelf</span>
        </h1>

        {/* Typed.js Animation Below */}
        <h2
          ref={typedRef}
          className="text-2xl font-semibold text-orange-300 h-8"
        ></h2>

        <p className="text-lg mt-4">
          StackShelf est une application de gestion des produits et catégories,
          développée pour le test technique de{' '}
          <span className="italic text-white">
            Teach
            <span className="text-orange-500">'</span>r
          </span>{' '}
          avec React.js et PHP Symfony.
        </p>

        {/* Cloudinary Image */}
        <div className="flex justify-center mt-6">
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
