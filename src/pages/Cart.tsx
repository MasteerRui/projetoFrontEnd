import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "../hooks/useCart";

const Cart: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getItemSubtotal,
    getTotal,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, sm: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: 120, color: "text.secondary", mb: 3, opacity: 0.2 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}>
          O seu cesto está vazio
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Adicione produtos ao cesto para começar a comprar
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 1,
            fontWeight: 500,
          }}
        >
          Continuar a Comprar
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
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4, color: "text.primary" }}>
        Cesto de Compras
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }} elevation={0}>
              <CardContent>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "contain",
                      bgcolor: "grey.50",
                      borderRadius: 1,
                      p: 1,
                    }}
                    image={item.image}
                    alt={item.title}
                  />
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, color: "text.primary" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "auto" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          sx={{ borderRadius: 0, color: "text.primary" }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body1"
                          sx={{
                            px: 2,
                            minWidth: 50,
                            textAlign: "center",
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          sx={{ borderRadius: 0, color: "text.primary" }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, ml: "auto", color: "text.primary" }}>
                        ${getItemSubtotal(item).toFixed(2)}
                      </Typography>
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: 1, color: "text.secondary" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              position: "sticky",
              top: 100,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}>
              Resumo do Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} itens)
              </Typography>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                ${getTotal().toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Entrega
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grátis
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                Total
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
                ${getTotal().toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mb: 2,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 500,
              }}
            >
              Finalizar Compra
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={clearCart}
              sx={{
                py: 1.5,
                borderRadius: 1,
                fontWeight: 500,
              }}
            >
              Limpar Cesto
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;