// import React, { useEffect, useState } from 'react'
// import { GetAllCategory } from '../Services/AllApi'
// import { Box, Button, Checkbox, Container, Paper, Radio, Typography } from '@mui/material'
// import { Prices } from './components/PriceFilter'
// import { axiosInstance } from '../Services/AxiosInstance'
// const CategoryFilter = () => {
//   const [category,setCategory] = useState([])
//   const [checked,setChecked] =useState([])
//   const [radio,setRadio] = useState([])
//   const [loading,setLoading] = useState(false)
//   const getCategory = async()=>{
//     try{
//       setLoading(true)
//        const response = await GetAllCategory()
//        setCategory(response?.data?.category)
//        setLoading(false)
//     }catch(error){
//           console.log("error fetching cat",error);
//     }
//   }
//   useEffect(()=>{
//     GetProductList()
//       getCategory()
//       getTotal()
//   },[])
//   const handleFilter=(value,id)=>{
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   }
//   useEffect(() => {
//     console.log('Current Radio Value:', radio);
//   }, [radio]);
//   const handleRadio = (value) => {
//     setRadio(value);
//   };

//   useEffect(() => {
//     console.log('Current Checkbox Value:', checked);
//   }, [checked]);

//   useEffect(() => {
//     console.log('Current Radio Value:', radio);
//   }, [radio]);
//   const filterProduct = async()=>{
//     try{
//       const response = await axiosInstance.post(`/api/product/filter-product`,{
//         checked,radio
//       })
//       // console.log("Response:", response);
//       setProducts(response?.data?.products)
//     }catch(error){
//       console.error("Error Filtering:", error);
//     }
//   }
//   useEffect(()=>{
//     if(!checked.length || !radio.length)GetProductList() 
//    },[checked.length,radio.length])
 
//    useEffect(()=>{
//      if(!checked.length || !radio.length)filterProduct() 
//     },[checked,radio])
//   // console.log("set",radio);
//   return (
//     <>
//     {/* <Container>
   
//       <Paper elevation={10} sx={{padding:'10px',margin:'20px 0px',borderRadius:'15px'}}>
//         <Typography sx={{fontWeight:'bold',margin:'10px 0px'}}>Filter By Category </Typography>
//         {
//           category?.map((items,index)=>{
//             return(
//               <>
//               <li key={index} style={{listStyle:'none'}}>
//               <Checkbox   onChange={(e)=>handleFilter(e.target.checked,items._id)} color="success"/>{items.name}
//               </li>
        
        

//               </>
//             )
//           })
//         }
//       </Paper>
//       <Paper elevation={10} sx={{margin:'20px 0px',padding:"10px",borderRadius:'15px'}}>
//         <Typography sx={{fontWeight:'bold',margin:'10px 0px'}}>Filter By Price</Typography>
       
//         {Prices?.map((p) => (
//             <div key={p._id}>
//               <Radio
//                 checked={radio === p.array}
//                 onChange={() => handleRadio(p.array)}
//                 color="primary"
//               />
//               {p.name}
//             </div>
//           ))}
    
//   <Box>
//     <Button variant='contained' size='small' color='error' onClick={()=>window.location.reload()}> RESET FILTER</Button>
//   </Box>
//       </Paper>

//     </Container> */}
//     </>
//   )
// }

// export default CategoryFilter