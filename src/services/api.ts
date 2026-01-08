import type { Product, CreateProductDto, UpdateProductDto, LoginRequest, LoginResponse, User } from "../types";

const BASE_URL = "https://fakestoreapi.com";

// GET /products - Listar todos os produtos
export async function getProducts(options?: {
  limit?: number;
  sort?: "asc" | "desc";
}): Promise<Product[]> {
  let url = `${BASE_URL}/products`;
  const params = new URLSearchParams();
  
  if (options?.limit) {
    params.append("limit", options.limit.toString());
  }
  if (options?.sort) {
    params.append("sort", options.sort);
  }
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao carregar produtos");
  return res.json();
}

// GET /products/:id - Obter produto por ID
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Erro ao carregar produto");
  return res.json();
}

// GET /products/categories - Listar todas as categorias
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Erro ao carregar categorias");
  return res.json();
}

// GET /products/category/:category - Filtrar produtos por categoria
export async function getProductsByCategory(
  category: string,
  options?: {
    limit?: number;
    sort?: "asc" | "desc";
  }
): Promise<Product[]> {
  let url = `${BASE_URL}/products/category/${encodeURIComponent(category)}`;
  const params = new URLSearchParams();
  
  if (options?.limit) {
    params.append("limit", options.limit.toString());
  }
  if (options?.sort) {
    params.append("sort", options.sort);
  }
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao carregar produtos da categoria");
  return res.json();
}

// POST /products - Adicionar novo produto
export async function createProduct(product: CreateProductDto): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

// PUT /products/:id - Atualizar produto
export async function updateProduct(
  id: string,
  product: UpdateProductDto
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

// PATCH /products/:id - Atualizar produto parcialmente
export async function patchProduct(
  id: string,
  product: UpdateProductDto
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

// DELETE /products/:id - Deletar produto
export async function deleteProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao eliminar produto");
  return res.json();
}

// POST /auth/login - Login de utilizador
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Credenciais inválidas" }));
    throw new Error(error.message || "Erro ao fazer login");
  }
  return res.json();
}

// GET /users/:id - Obter utilizador por ID
export async function getUser(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao carregar utilizador");
  return res.json();
}