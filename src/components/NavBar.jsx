const NavBar = () => {
  return (
    <nav className="bg-[#015C81] shadow p-2  flex items-center justify-between">
      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent">
        StackShelf
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/Thuthikaran/teachr-test-technique"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 flex items-center font-bold bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent hover:border-b-2 hover:border-white
"
        >
          PHP
        </a>
        <a
          href="https://github.com/Thuthikaran/teachr-test-technique-react"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 flex items-center font-bold bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent hover:border-b-2 hover:border-white
"
        >
          React
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
