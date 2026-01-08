import React from "react";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Paper,
  CircularProgress,
  Alert,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import SortIcon from "@mui/icons-material/Sort";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";

const Home: React.FC = () => {
  const {
    products,
    loading,
    error,
    categories,
    filterCategory,
    setFilterCategory,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
  } = useProducts();

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

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: { xs: 4, sm: 5, md: 6 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 2,
          }}
        >
          Bem-vindo à Loja Online
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", fontSize: "1.1rem" }}>
          Descubra produtos incríveis com os melhores preços
        </Typography>
      </Box>

      {/* Filtros */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 5,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <TextField
            select
            label="Categoria"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{ flex: { xs: 1, sm: "0 0 200px" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">Todas as categorias</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ flex: { xs: 1, sm: "0 0 200px" } }}>
            <InputLabel>Ordenar</InputLabel>
            <Select
              value={sortOrder}
              label="Ordenar"
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "rating_asc" | "rating_desc" | "")}
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon sx={{ color: "text.secondary", ml: 1 }} />
                </InputAdornment>
              }
            >
              <MenuItem value="">Padrão</MenuItem>
              <MenuItem value="asc">Menor Preço</MenuItem>
              <MenuItem value="desc">Maior Preço</MenuItem>
              <MenuItem value="rating_desc">Maior Avaliação</MenuItem>
              <MenuItem value="rating_asc">Menor Avaliação</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Lista de produtos */}
      {products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Nenhum produto encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tente ajustar os filtros de pesquisa
          </Typography>
        </Box>
      ) : (
        <ProductList products={products} />
      )}
    </Box>
  );
};

export default Home;