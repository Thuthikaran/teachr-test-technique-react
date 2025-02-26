/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
  return (
    <footer className="rounded-md bg-[#2F73E2] text-white py-4 px-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Teach'r SAS Test technique
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://thuthikaran.com"
            className="text-sm hover:text-gray-400"
          >
            thuthikaran.com
          </a>
          <a href="#" className="text-sm hover:text-gray-400">
            Github Repo
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
