import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/action";

export default function Register() {
  const [formRegister, setFormRegister] = useState({
    name: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  function handleChange(e) {
    const { value, name } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  }

  function submitRegister(e) {
    e.preventDefault();
    dispatch(registerUser(formRegister));
    setFormRegister({
      name: "",
      username: "",
      password: "",
    });
  }
  return (
    <>
      <div className="container" style={{ width: "500px" }}>
        <h1 className="text-center">Register</h1>
        <form onSubmit={submitRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formRegister.name}
              onChange={(e) => handleChange(e)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formRegister.username}
              onChange={(e) => handleChange(e)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formRegister.password}
              onChange={(e) => handleChange(e)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
