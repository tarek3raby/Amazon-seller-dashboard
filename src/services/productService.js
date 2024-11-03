// productService.js
import axios from "axios";

const apiUrl = "https://ahmed-sabry-ffbbe964.koyeb.app/products";
const uploadUrl = "https://ahmed-sabry-ffbbe964.koyeb.app/upload/image";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkc2FicmloaW5kYXdpQGdtYWlsLmNvbSIsImlkIjoiNjZmNWI2NWM0NWU0MjBiNDQ0NDc1NWYzIiwicm9sZSI6InNlbGxlciIsImlzQWN0aXZlIjp0cnVlLCJuYW1lIjoiQWhtZWQgc2FicnkiLCJpYXQiOjE3MzA2NTUzMDMsImV4cCI6MTczMDc0MTcwM30.PvXmyeO-7zmiAB8JFSTmjrVUYzO2Qdj9u9QyxaE_sEg`;
// Configure axios defaults if needed
const axiosInstance = axios.create({
  headers: {
    Authorization: token,
  },
});

// Fetch all products
async function getProducts() {
  try {
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Upload image
async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(uploadUrl, formData);

    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Fetch products with pagination
async function getProductsWithPagination(page, limit) {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/seller/products?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Fetch product by ID
async function getProductById(id) {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Add new product
async function addProduct(product) {
  try {
    const response = await axiosInstance.post(apiUrl, product);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Update product
async function updateProduct(id, productData) {
  try {
    const response = await axiosInstance.put(`${apiUrl}/${id}`, productData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

// Delete product by ID
async function deleteProduct(id) {
  try {
    await axiosInstance.delete(`${apiUrl}/${id}`);
  } catch (error) {
    throw handleError(error);
  }
}

// Error handler
function handleError(error) {
  if (error.response) {
    // Server responded with error
    console.error("Server Error:", error.response.data);
    return error.response.data;
  } else if (error.request) {
    // Request made but no response
    console.error("Network Error:", error.request);
    return { message: "Network error occurred" };
  } else {
    // Other errors
    console.error("Error:", error.message);
    return { message: error.message };
  }
}

export default {
  getProducts,
  uploadImage,
  getProductsWithPagination,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  handleError,
};
