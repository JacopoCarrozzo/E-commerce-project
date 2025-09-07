// ProductList.tsx
import React, { useEffect, useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import axios from "axios"; 

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const BACKEND_URL = "https://backend-ecommerce-production-e3f9.up.railway.app";

    const url = category === "all" ? `${BACKEND_URL}/products` : `${BACKEND_URL}/products?category=${category}`;


    setLoading(true);
    axios.get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati:", error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  const visible = products || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Jacopo E-Commerce Demo</h1>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="category" className="text-sm text-gray-500">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All</option>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visible.length > 0 ? (
                visible.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))
            ) : (
                <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        </main>
      )}
    </section>
  );
};

export default ProductList;