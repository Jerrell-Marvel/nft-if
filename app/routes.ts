import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("pages/home/home.tsx"), route("/about", "pages/about/about.tsx"), route("/todo", "pages/todo/todo.tsx")] satisfies RouteConfig;
