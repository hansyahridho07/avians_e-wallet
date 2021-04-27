import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Navbar from "./components/navbar";
import { fetchUser } from "./store/action";

function App() {
  const loginStatus = useSelector((state) => state.loginStatus.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch, loginStatus]);
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (loginStatus ? <Home /> : <Redirect to="/login" />)}
        ></Route>
        <Route
          path="/login"
          render={() => (loginStatus ? <Redirect to="/" /> : <Login />)}
        ></Route>
        <Route
          path="/register"
          render={() => (loginStatus ? <Redirect to="/" /> : <Register />)}
        ></Route>
        <Route
          path="/history"
          render={() => (loginStatus ? <History /> : <Login />)}
        ></Route>
      </Switch>
    </>
  );
}

export default App;
