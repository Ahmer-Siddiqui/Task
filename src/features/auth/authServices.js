import axios from "axios";

const USER_API_URL = "https://dummyjson.com/users";

const login = async (userData) => {
  console.log(userData);
  const response = await axios.get(`${USER_API_URL}/filter?key=email&value=${userData}`);
  return response.data;
};
const userService = { login };

export default userService;
