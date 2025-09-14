import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/Home.tsx"),
  route("/about", "pages/about/about.tsx"),
  route("/sign-up", "pages/user-sign-up/UserSignUp.tsx"),
  route("/sign-in", "pages/user-sign-in/UserSignIn.tsx"),
  route("/admin-sign-up", "pages/admin-sign-up/AdminSignUp.tsx"),
  route("/admin-sign-in", "pages/admin-sign-in/AdminSignIn.tsx"),
  route("/reset-password", "pages/reset-password/ResetPassword.tsx"),
  route("/reset-password/form", "pages/reset-password-form/ResetPasswordForm.tsx"),
  route("/purchase/:nftId", "pages/purchase/Purchase.tsx"),
  route("/cart", "pages/cart/Cart.tsx"),
] satisfies RouteConfig;
