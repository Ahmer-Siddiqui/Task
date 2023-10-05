import React, { useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user,isSuccess } = useSelector((state) => state.userForm);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(reset());
    navigate("/");
  };
  
  useEffect(()=>{
    if(!isSuccess){
      dispatch(reset());
      navigate("/");
    }
  },[])

  return (
    <div className="userPorfile_sec">
      <Card>
      <Alert>User Profile</Alert>
        <Card.Img variant="top" src={user.image} alt="Profile Pic" />
        <Card.Body>
          <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
          <Card.Text className="d-flex flex-column">
           <span> <b>UserName:</b> {user.username}</span>
           <span> <b>Email:</b> {user.email}</span>
           <span><b>Phone Number:</b> {user.phone}</span>
           <span> <b>Gender:</b> {user.gender}</span>
          </Card.Text>
          <Button variant="primary" onClick={logOut}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
