import React from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 3, color: "text.secondary", fontWeight: 500 }}>
        {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;