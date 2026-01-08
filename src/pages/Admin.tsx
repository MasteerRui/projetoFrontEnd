import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Card,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../services/api";
import type { Product, CreateProductDto, UpdateProductDto } from "../types";

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CreateProductDto, string>>>({});
  const [formData, setFormData] = useState<CreateProductDto>({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Erro ao carregar categorias");
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CreateProductDto, string>> = {};
    
    if (!formData.title.trim()) {
      errors.title = "O título é obrigatório";
    }
    if (formData.price <= 0) {
      errors.price = "O preço deve ser maior que 0";
    }
    if (!formData.category.trim()) {
      errors.category = "A categoria é obrigatória";
    }
    if (!formData.image.trim()) {
      errors.image = "A URL da imagem é obrigatória";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image)) {
      errors.image = "URL de imagem inválida";
    }
    if (!formData.description.trim()) {
      errors.description = "A descrição é obrigatória";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        price: 0,
        description: "",
        image: "",
        category: "",
      });
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    });
    setFormErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      if (editingProduct) {
        await updateProduct(editingProduct.id.toString(), formData);
        setSuccess("Produto atualizado com sucesso!");
      } else {
        await createProduct(formData);
        setSuccess("Produto criado com sucesso!");
      }
      handleCloseDialog();
      loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(editingProduct ? "Erro ao atualizar produto" : "Erro ao criar produto");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem a certeza que deseja eliminar este produto?")) return;

    try {
      await deleteProduct(id.toString());
      setSuccess("Produto eliminado com sucesso!");
      loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erro ao eliminar produto");
    }
  };

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={60} sx={{ color: "#09090b" }} />
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary" }}>
          Administração de Produtos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 1, fontWeight: 500 }}
        >
          Adicionar Produto
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: "#fafafa", border: "1px solid #e4e4e7" }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3, bgcolor: "#fafafa", border: "1px solid #e4e4e7" }}>
          {success}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Imagem</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Categoria</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Preço</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Avaliação</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.title}
                    sx={{ width: 50, height: 50, objectFit: "contain" }}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" noWrap>
                    {product.title}
                  </Typography>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.rating?.rate?.toFixed(1)} ({product.rating?.count})
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(product)}
                    sx={{ color: "text.primary" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(product.id)}
                    sx={{ color: "text.secondary" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 600, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          pb: 1.5,
          pt: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingProduct ? "Editar Produto" : "Adicionar Produto"}
          </Typography>
          <IconButton
            onClick={handleCloseDialog}
            sx={{ color: "text.secondary" }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2, pb: 1 }}>
          <Grid container spacing={2}>
            {/* Preview da Imagem à esquerda - mais compacta */}
            <Grid item xs={12} sm={2}>
              <Box>
                {formData.image ? (
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 120,
                      aspectRatio: "1",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      overflow: "hidden",
                      bgcolor: "grey.50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={formData.image}
                      alt="Preview"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 120,
                      aspectRatio: "1",
                      border: "1px dashed",
                      borderColor: "divider",
                      borderRadius: 1,
                      bgcolor: "grey.50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 24, color: "text.secondary" }} />
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Formulário à direita */}
            <Grid item xs={12} sm={10}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Título"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (formErrors.title) setFormErrors({ ...formErrors, title: "" });
                    }}
                    error={!!formErrors.title}
                    helperText={formErrors.title}
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Preço"
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, price: parseFloat(e.target.value) || 0 });
                      if (formErrors.price) setFormErrors({ ...formErrors, price: "" });
                    }}
                    error={!!formErrors.price}
                    helperText={formErrors.price}
                    required
                    inputProps={{ min: 0, step: 0.01 }}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1, color: "text.secondary", fontSize: "0.875rem" }}>$</Typography>,
                    }}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!formErrors.category} size="small">
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={formData.category}
                      label="Categoria"
                      onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        if (formErrors.category) setFormErrors({ ...formErrors, category: "" });
                      }}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                        {formErrors.category}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL da Imagem"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      if (formErrors.image) setFormErrors({ ...formErrors, image: "" });
                    }}
                    error={!!formErrors.image}
                    helperText={formErrors.image || "URL completa da imagem"}
                    required
                    placeholder="https://example.com/image.jpg"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descrição"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (formErrors.description) setFormErrors({ ...formErrors, description: "" });
                    }}
                    error={!!formErrors.description}
                    helperText={formErrors.description}
                    required
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ textTransform: "none", borderRadius: 1 }}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ 
              textTransform: "none", 
              borderRadius: 1, 
              fontWeight: 500,
              minWidth: 100,
            }}
            startIcon={submitting ? <CircularProgress size={16} /> : null}
          >
            {submitting 
              ? "A guardar..." 
              : editingProduct 
                ? "Atualizar" 
                : "Criar"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;

