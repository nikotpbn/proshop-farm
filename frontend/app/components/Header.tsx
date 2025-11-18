import { useState } from "react";
import logo from "../src/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="">
        <div className="flex justify-between py-3 px-4 bg-yellow-500">
          <div className="flex items-center">
            <img src={logo} alt="" />
            <h1>ProShop</h1>
          </div>

          <div className="flex items-center">
            <div className="sm:hidden cursor-pointer">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <span className="material-icons">menu</span>
              </button>
            </div>

            <div className="flex gap-2 items-center hidden sm:flex">
              <span className="material-icons">shopping_cart</span>
              <span>Cart</span>
              <span className="material-icons">person</span>
              <span>Sign In</span>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col py-1 px-6 gap-3 bg-yellow-500">
            <div className="flex align-center">
              <span className="material-icons">shopping_cart</span>
              <span>Cart</span>
            </div>
            <div className="flex align-center">
              <span className="material-icons">person</span>
              <span>Sign In</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
