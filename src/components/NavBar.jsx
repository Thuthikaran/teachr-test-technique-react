/* eslint-disable react/no-unescaped-entities */
const NavBar = () => {
  return (
    <nav className="rounded-lg bg-[#2F73E2] shadow p-2  flex items-center justify-between">
      <div className="text-2xl font-bold text-white">Teach'r</div>
      <div className="flex items-center">
        <span className="mr-4 text-white font-bold">Thuthikaran Easvaran</span>
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
