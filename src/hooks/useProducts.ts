import { useEffect, useState } from "react";
import type { Product } from "../types";
import { getProducts, getCategories, getProductsByCategory } from "../services/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "rating_asc" | "rating_desc" | "">("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Não foi possível carregar categorias");
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let fetchedProducts: Product[];
        
        // A API só suporta ordenação por preço (asc/desc), então para rating fazemos no cliente
        const apiSortOrder = sortOrder === "rating_asc" || sortOrder === "rating_desc" ? undefined : sortOrder || undefined;
        
        if (filterCategory) {
          fetchedProducts = await getProductsByCategory(filterCategory, {
            sort: apiSortOrder,
          });
        } else {
          fetchedProducts = await getProducts({
            sort: apiSortOrder,
          });
        }
        
        setProducts(fetchedProducts);
        setError("");
      } catch (err) {
        setError("Não foi possível carregar produtos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filterCategory, sortOrder]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesSearch;
  });

  // Ordenar por rating se necessário
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "rating_asc") {
      return (a.rating?.rate || 0) - (b.rating?.rate || 0);
    }
    if (sortOrder === "rating_desc") {
      return (b.rating?.rate || 0) - (a.rating?.rate || 0);
    }
    return 0; // Mantém ordem original se não for ordenação por rating
  });

  return {
    products: sortedProducts,
    categories,
    loading,
    error,
    filterCategory,
    setFilterCategory,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
  };
}