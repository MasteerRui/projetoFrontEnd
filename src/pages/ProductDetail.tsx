import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardMedia,
  Rating,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Product } from "../types";
import { getProductById } from "../services/api";
import { useCart } from "../hooks/useCart";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then(setProduct)
      .catch(() => setError("Não foi possível carregar o produto"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={60} sx={{ color: "#09090b" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 4 }}>
        <Alert severity="error" sx={{ bgcolor: "#fafafa", border: "1px solid #e4e4e7" }}>{error}</Alert>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "text.primary" }}>
          Produto não encontrado
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Voltar para a Página Inicial
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3, textTransform: "none", color: "text.primary" }}
      >
        Voltar
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 1,
              overflow: "hidden",
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                p: 4,
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Chip
              label={product.category}
              sx={{
                mb: 2,
                bgcolor: "grey.100",
                color: "text.primary",
                fontWeight: 500,
                border: "1px solid",
                borderColor: "divider",
              }}
            />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}>
              {product.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mb: 3,
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Rating
                value={product.rating?.rate || 0}
                precision={0.1}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "text.primary",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "grey.300",
                  },
                }}
              />
              <Typography variant="body1" color="text.secondary">
                {product.rating?.rate?.toFixed(1)} ({product.rating?.count || 0} avaliações)
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              {product.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  addToCart(product);
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: 500,
                  flex: { xs: "1 1 100%", sm: "0 0 auto" },
                }}
              >
                Adicionar ao Cesto
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}