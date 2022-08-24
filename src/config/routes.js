import Home from "../screens/Home";
import Login from "../screens/Login";
import AddRecipe from "../screens/AddRecipe";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/add-recipe",
    component: AddRecipe,
    name: "Add recipe",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
];

export default routes;
