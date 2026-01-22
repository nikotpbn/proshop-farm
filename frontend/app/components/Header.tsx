import type { CartItem } from "~/models/CartItem";

import { useState } from "react";
import { Link } from "react-router";

import { ModeToggle } from "./ModeToogle";

import logo from "../src/assets/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

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
            <div className="flex gap-3">
              <ModeToggle />
              <div className="flex gap-2 hidden md:flex">
                <Link to="/cart" className="flex gap-1 items-center">
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

                <Link to="/signin" className="flex gap-1 items-center">
                  <span className="material-icons">person</span>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{user.username}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Log out{" "}
                            <span className="material-icons md-16">logout</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span>Sign In</span>
                  )}
                </Link>
              </div>
              <div className="flex md:hidden items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <span className="material-icons">menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Log out{" "}
                        <span className="material-icons md-16">logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
