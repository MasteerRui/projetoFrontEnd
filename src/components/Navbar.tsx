import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: "1400px", width: "100%", mx: "auto", px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "text.primary",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          Loja Online
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: 1,
              color: "text.primary",
              bgcolor: location.pathname === "/" ? "grey.100" : "transparent",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            startIcon={
              <Badge badgeContent={cartItemCount} sx={{ "& .MuiBadge-badge": { bgcolor: "#09090b", color: "#ffffff" } }}>
                <ShoppingCartIcon />
              </Badge>
            }
            sx={{
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: 1,
              color: "text.primary",
              bgcolor: location.pathname === "/cart" ? "grey.100" : "transparent",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Cesto
          </Button>
          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/admin"
                startIcon={<AdminPanelSettingsIcon />}
                sx={{
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  bgcolor: location.pathname === "/admin" ? "grey.100" : "transparent",
                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
              >
                Admin
              </Button>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
              >
                Sair
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              startIcon={<LoginIcon />}
              sx={{
                textTransform: "none",
                px: 2,
                py: 1,
                borderRadius: 1,
                color: "text.primary",
                bgcolor: location.pathname === "/login" ? "grey.100" : "transparent",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              Entrar
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;