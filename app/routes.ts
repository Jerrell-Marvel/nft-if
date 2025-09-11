import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/Home.tsx"),
  route("/about", "pages/about/about.tsx"),
  route("/sign-up", "pages/user-sign-up/UserSignUp.tsx"),
  route("/sign-in", "pages/user-sign-in/UserSignIn.tsx"),
  route("/admin-sign-up", "pages/admin-sign-up/AdminSignUp.tsx"),
] satisfies RouteConfig;
