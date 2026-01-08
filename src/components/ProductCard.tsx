import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box, Chip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "grey.50",
          pt: 2,
          pb: 1,
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "background.paper",
            color: "text.primary",
            fontWeight: 500,
            fontSize: "0.7rem",
            border: "1px solid",
            borderColor: "divider",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3.5em",
            color: "text.primary",
          }}
        >
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Rating
            value={product.rating?.rate || 0}
            precision={0.1}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "text.primary",
              },
              "& .MuiRating-iconEmpty": {
                color: "grey.300",
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
            ({product.rating?.count || 0})
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontWeight: 600,
            mt: "auto",
            mb: 1,
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="outlined"
          fullWidth
          endIcon={<ArrowForwardIcon />}
          sx={{
            py: 1.25,
            borderRadius: 1,
            fontWeight: 500,
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              borderColor: "text.primary",
              bgcolor: "grey.50",
            },
          }}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;