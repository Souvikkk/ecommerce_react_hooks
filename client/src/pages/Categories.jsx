import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Box, Container } from "@mui/material";
import useCategory from "../Contex/UseCategory";
const Categories = () => {
  const categories = useCategory();
  return (
    <Container>
      <Box sx={{ marginTop: "100px" }}>
        <Box >
          {categories.map((c) => (
            <Box  key={c._id}>
              <Box >
                <Link to={`/category/${c.slug}`} >
                  {c.name}
                </Link>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Categories;
