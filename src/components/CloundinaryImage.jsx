const CloudinaryImage = () => {
  const imageUrl =
    'https://res.cloudinary.com/drxas1wpe/image/upload/t_teachr/v1740703017/FirstImage_hdhzms.png';

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">Image from Cloudinary</h2>
      <img
        src={imageUrl}
        alt="Cloudinary Image"
        className="w-64 h-64 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default CloudinaryImage;
