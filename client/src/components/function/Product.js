import * as api from '../api/Product'
export const GetProduct = async () => {
    try {
        const { data } = await api.GetProduct();
        return data
    } catch (error) {
        console.log(error)
    }
}

export const AddProduct = async (product) => {
    try {
        const { data } = await api.AddProduct(product);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const UploadProduct = async (product) => {
    try {
        const { data } = await api.UploadProduct(product);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const EditProduct = async (updatedData) => {
    try {
        const { data } = await api.EditProduct(updatedData)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const DeleteProduct = async (productId) => {
    try {
        const { data } = await api.DeleteProduct(productId);
        return data
    } catch (error) {
        console.log(error)
    }
}