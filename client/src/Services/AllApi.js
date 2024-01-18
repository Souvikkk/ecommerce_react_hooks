import {axiosInstance}  from "./AxiosInstance";

export const GetAllProduct = async()=>{
    try{
          return axiosInstance.get(`api/product/get-product`)
    }catch(error){
        console.log("error fetching all products",error);
    }
}

export const GetAllCategory = async()=>{
    try{
          return axiosInstance.get(`api/category/all-category`)
    }catch(error){
        console.log("error fetching all products",error);
    }
}
export const FilterProducts = async(data,dataa)=>{
    try{
          return axiosInstance.post(`api/product/filter-product`,data,dataa)
    }catch(error){
        console.log("error fetching all products",error);
    }
}