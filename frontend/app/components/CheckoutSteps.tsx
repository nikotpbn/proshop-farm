import { Link } from "react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const CheckoutSteps = ({
  signin,
  shipping,
  payment,
  placeOrder,
}: {
  signin: boolean;
  shipping: boolean;
  payment: boolean;
  placeOrder: boolean;
}) => {
  return (
    <div className="flex w-full justify-center mb-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {signin ? (
                <Link to="/signin">Sign In</Link>
              ) : (
                <span className="text-gray-500">Sign In</span>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>

          <span>{">"}</span>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {shipping ? (
                <Link to="/signin">Shipping</Link>
              ) : (
                <span className="text-gray-500">Shipping</span>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <span>{">"}</span>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {payment ? (
                <Link to="/signin">Payment</Link>
              ) : (
                <span className="text-gray-500">Payment</span>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <span>{">"}</span>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {placeOrder ? (
                <Link to="/signin">Place Order</Link>
              ) : (
                <span className="text-gray-500">Place Order</span>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CheckoutSteps;
