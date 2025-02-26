const NavBar = () => {
  return (
    <nav className="bg-[#DAE3F9] shadow p-2  flex items-center justify-between">
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        StackShelf
      </div>
      <div className="flex items-center">
        <a
          href="https://thuthikaran.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 flex items-center font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Portfolio
        </a>
        <a
          href="https://thuthikaran.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 flex items-center font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Github
        </a>
        <img
          src="/src/Untitled.png"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default NavBar;
