import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Landing.tsx"),
  route("product/:productId", "./pages/ProductDetail.tsx"),
  route("cart", "./pages/Cart.tsx"),
  route("signin", "./pages/SignIn.tsx"),
  route("register", "./pages/Register.tsx"),
  route("*", "./pages/NotFound.tsx")
] satisfies RouteConfig;
