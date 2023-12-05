import axios from "axios";
import BASE_URL from "../BASE_URL";

//get all products
export const getAllProducts = async () => {
  let products;
  await axios.get(`${BASE_URL}/products`).then((response) => {
    products = response.data;
  });
  return products;
};

//get one product (id)
export const getProductByID = async (id) => {
  let product;
  await axios.get(`${BASE_URL}/products/${id}`).then((response) => {
    product = response.data;
  });
  return product;
};

//post product
export const postProduct = async (payload) => {
  let newProduct;
  await axios.post(`${BASE_URL}/products`, payload).then((response) => {
    newProduct = response.data;
  });
  return newProduct;
};

//put product
export const putProduct = async (payload) => {
  let editedProduct;
  await axios.put(`${BASE_URL}/products`, payload).then((response) => {
    editedProduct = response.data;
  });
  return editedProduct;
};

//delete product
export const deleteProduct = async (productId) => {
  let deletedProduct;
  await axios.delete(`${BASE_URL}/products/${productId}`).then((response) => {
    deletedProduct = response.data;
  });
  return deletedProduct;
};
