import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../features/auth/authSlice";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isSuccess, isError, user, message } = useSelector(
    (state) => state.userForm
  );

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validationCheck = (data) => {
    let { password } = data;
    if (password.length < 8) {
      toast.error("Password is less than 8 Character", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      return true;
    }
  };

  const saveForm = (e) => {
    e.preventDefault();

    if (validationCheck(userData)) {
      dispatch(userLogin(userData));
    }
  };

  useEffect(() => {
    if (isLoading) {
      setLoadingSpinner(true);
    }
    if (isSuccess) {
      if (user?.password !== userData.password) {
        setLoadingSpinner(false);
        toast.error("Invalid password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("user Login Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/userProfile");
      }
    }
    if (isError) {
      setLoadingSpinner(false);
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isLoading, message, isError, user]);

  return (
    <main className="auth_form">
      <div className="cent">
        <div className="alert">Login</div>
        <form onSubmit={saveForm}>
          <div className="group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="group">
            <label>Password</label>
            <input
              type={showPass === false ? "password" : "type"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            {showPass === false ? (
              <i
                className="fa-solid fa-eye-slash def"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              ></i>
            ) : (
              <i
                className="fa-sharp fa-solid fa-eye def"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              ></i>
            )}
          </div>

          {loadingSpinner ? (
            <Spinner animation="border" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>

        <p>
        <b>Note:</b>
          <span> Check Users List in </span>
          <a href="https://dummyjson.com/users" target="_blank">
            https://dummyjson.com/users
          </a>{" "}
        </p>
      </div>
    </main>
  );
}

export default Login;
