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
    <div className="bg-[#015C81] text-white py-12 px-6 text-center relative overflow-hidden">
      {/* Subtle SVG Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Content */}
      <div className="max-w-2xl mx-auto relative z-10">
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

        {/* Description */}
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

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#003049] rounded-full opacity-10 -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 bg-[#003049] rounded-full opacity-10 -bottom-48 -right-48"></div>
      </div>
    </div>
  );
};

export default Showcase;
