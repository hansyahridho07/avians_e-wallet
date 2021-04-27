import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginFalse, setUserSaldo, setUsernameName } from "../store/action";
import convertToRupiah from "../helpers/convertRupiah";

export default function Navbar() {
  const loginStatus = useSelector((state) => state.loginStatus.isLoggedIn);
  const dispatch = useDispatch();
  const saldo = useSelector((state) => state.user.saldo);
  const name = useSelector((state) => state.user.name);

  function handleLogout(e) {
    if (loginStatus) {
      e.preventDefault();
      dispatch(setLoginFalse());
      dispatch(setUserSaldo(0));
      dispatch(setUsernameName(""));
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            E-Wallet
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loginStatus ? (
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!loginStatus ? (
                  <>
                    <li className="nav-item me-3">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item me-3">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <span></span>
                )}
                {loginStatus ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="!"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello, {name}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li className="dropdown-item">
                        Saldo: <b>{convertToRupiah(saldo)}</b>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/history">
                          History Transactions
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-link" style={{ color: "white" }}>
                    Hello guest!
                  </li>
                )}
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
