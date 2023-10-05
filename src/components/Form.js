import React, { useEffect, useState } from "react";
// import sendData from "./SendFile";
import Header from "./header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyForm,
  getSingleFormData,
  updateMyForm,
} from "../features/FormData/formSlice";
import { useNavigate, useParams } from "react-router-dom";

const MyForm = () => {
  const id = useParams();
  const [errShow, setErrShow] = useState(false);
  const dispatch = useDispatch();
  const myNavigate = useNavigate();
  const { editData } = useSelector((state) => state.userForm);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (window.location.pathname === `/${id.id}`) {x`x`
  //     dispatch(getSingleFormData(id));
  //   }
  // }, []);

  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     ...editData,
  //   });
  // }, [editData]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validationCheck = (data) => {
    // console.log(formData);
    let { password } = data;
    if (password.length < 8) {
      alert("Password is less than 8 Character");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    validationCheck(formData);
    let { userName, password, email } = formData;
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: userName,
        lastName: "Ovi",
        age: 250,
        /* other user data */
        email,
        password,
      }),
    })
    // fetch("https://dummyjson.com/users/101")
      .then((res) => res.json())
      .then(console.log);
    // if (id.id) {
    //   dispatch(updateMyForm(formData));
    // } else {
    //   dispatch(addMyForm(formData));
    // }
    // myNavigate("/tabledata");
  };

  return (
    <>
      <div>
        <Header header={id.id ? "Update Form" : "Form"} />
        <div className="container">
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="UserName"
                name="userName"
                required
                onChange={onChangeHandler}
                value={formData.userName}
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                required
                onChange={onChangeHandler}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Phone Number"
                name="password"
                value={formData.password}
                required
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MyForm;
