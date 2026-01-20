import type { CartItem } from "~/models/CartItem";

import { useState } from "react";
import { Link } from "react-router";

import logo from "../src/assets/logo.png";

const Header = ({ cart, user }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="mb-5">
        <div className="flex justify-between py-3 px-20 bg-yellow-500">
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="" />
              <h1>ProShop</h1>
            </div>
          </Link>

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
                  Cart
                  {cart && cart.cartItems.length > 0 && (
                    <span className="bg-white text-yellow-500 px-3 py-1 border rounded-[50%]">
                      {cart.cartItems
                        .map((item: CartItem) => item.qty)
                        .reduce((sum: number, qty: number) => {
                          return sum + qty;
                        })}
                    </span>
                  )}
                </span>
              </Link>

              <Link
                to="/signin"
                className="flex gap-1 items-center hidden sm:flex"
              >
                <span className="material-icons">person</span>
                {user ? <span>{user.username}</span> : <span>Sign In</span>}
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
