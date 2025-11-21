import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Landing.tsx"),
  route("product/:productId", "./pages/ProductDetail.tsx"),
] satisfies RouteConfig;
