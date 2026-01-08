import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest } from "../types";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, bgcolor: "#fafafa", border: "1px solid #e4e4e7" }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome de utilizador"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              margin="normal"
              required
              autoComplete="username"
            />
            <TextField
              fullWidth
              label="Palavra-passe"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              margin="normal"
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 500,
              }}
              disabled={loading}
            >
              {loading ? "A entrar..." : "Entrar"}
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Credenciais de teste:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Utilizador: <code>johnd</code>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Palavra-passe: <code>m38rmF$</code>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

