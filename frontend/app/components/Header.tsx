import { useState, useEffect } from "react";
import { Link } from "react-router";

import logo from "../src/assets/logo.png";

const Header = ({ cart }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="mb-5">
        <div className="flex justify-between py-3 px-20 bg-yellow-500">
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

            <div className="flex gap-3">
              <Link
                to="/cart"
                className="flex gap-1 items-center hidden sm:flex"
              >
                <span className="material-icons">shopping_cart</span>
                <span>
                  Cart{" "}
                  <span className="bg-white text-yellow-500 px-3 py-1 border rounded-[50%]">
                    {cart && cart.cartItems.length}
                  </span>
                </span>
              </Link>

              <Link
                to="/signin"
                className="flex gap-1 items-center hidden sm:flex"
              >
                <span className="material-icons">person</span>
                <span>Sign In</span>
              </Link>
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
