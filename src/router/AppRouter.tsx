import { Redirect, useRoutes } from "raviger";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";
import Login from "../pages/Login";
import AppContainer from "../AppContainer";
import Board from "../pages/Board";

export const checkLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default function AppRouter() {
  const routes = {
    "/": () => (checkLoggedIn() ? <Home /> : <Redirect to="/login" />),
    "/todos": () => (checkLoggedIn() ? <ToDo /> : <Redirect to="/login" />),
    "/login": () => <Login />,
    "/board/:id": ({ id }: { id: string }) =>
      checkLoggedIn() ? <Board id={Number(id)} /> : <Redirect to="/login" />,
  };
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
