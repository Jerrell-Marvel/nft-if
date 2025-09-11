import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("pages/home/Home.tsx"), route("/about", "pages/about/about.tsx"), route("/sign-up", "pages/user-sign-up/UserSignUp.tsx")] satisfies RouteConfig;
