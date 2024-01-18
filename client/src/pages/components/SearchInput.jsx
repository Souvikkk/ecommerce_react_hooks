import React from "react";
import { useSearch } from "../../Contex/SearchContext";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, TextField } from "@mui/material";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const searchSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={searchSubmit}>
        <TextField
          label="Search"
          variant="outlined"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={searchSubmit}>
                <SearchIcon sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
               
                borderColor: "#bdbdbd",
                borderRadius: "20px",
                paddingTop: "4px",
                paddingBottom: "4px",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "#7f8182",
            },
            "& .MuiInputBase-input": {
              color: "#7f8182",
            },
            height: "20px",
            marginTop: "5px",
            marginLeft: "auto",
            borderRadius: "15px",
          }}
        />
      </form>
    </>
  );
};

export default SearchInput;
