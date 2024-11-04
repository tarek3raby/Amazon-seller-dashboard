import axios from "axios";

const apiUrl = "https://ahmed-sabry-ffbbe964.koyeb.app";

const getToken = () => localStorage.getItem("token");

// Configure axios instance
const axiosInstance = axios.create({
  headers: {
    get Authorization() {
      return getToken();
    },
  },
});

// Fetch all seller orders
async function getSellerOrders() {
  try {
    const response = await axiosInstance.get(`${apiUrl}/sellers/my/orders`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Fetch specific order by ID
async function getSellerOrderById(id) {
  try {
    const response = await axiosInstance.get(`${apiUrl}/sellers/my/orders/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Error handler
function handleError(error) {
  if (error.response) {
    console.error("Server Error:", error.response.data);
    return error.response.data;
  } else if (error.request) {
    console.error("Network Error:", error.request);
    return { message: "Network error occurred" };
  } else {
    console.error("Error:", error.message);
    return { message: error.message };
  }
}

export default {
  getSellerOrders,
  getSellerOrderById,
  handleError,
}; 