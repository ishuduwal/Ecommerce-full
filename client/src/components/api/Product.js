import axios from "axios";
const URL = "http://localhost:5000/product";

export const GetProduct = () => axios.get(URL);
export const AddProduct = (product) => axios.post(`${URL}/`, product);
export const UploadProduct = (product) => axios.post(`${URL}/upload`, product);
export const EditProduct = (product) => axios.put(`${URL}/${product._id}`, product);
export const DeleteProduct = (id) => axios.delete(`${URL}/${id}`);
