import React, { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  variants?: string | string[];
  inStock: boolean;
  category?: string;
}

interface Props {
  product: Product;
  onAddToCart?: (product: Product, variant?: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  const variantArray: string[] = Array.isArray(product.variants)
    ? product.variants
    : (product.variants || "")
        .toString()
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

  const [selectedVariant, setSelectedVariant] = useState<string>(variantArray[0] ?? "");

  useEffect(() => {
    setSelectedVariant(variantArray[0] ?? "");
  }, [product.variants]);

  return (
    <article
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-transform transform-gpu hover:-translate-y-1"
      aria-labelledby={`title-${product.id}`}
    >
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-64 bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-4"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x450?text=No+Image"; }}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 id={`title-${product.id}`} className="text-base sm:text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-gray-600 font-medium">€{product.price.toFixed(2)}</p>

        <div className="mt-3 flex items-center gap-3">
          <label htmlFor={`variant-${product.id}`} className="text-sm text-gray-500 min-w-[60px]">
            Variant
          </label>

          {variantArray.length > 0 ? (
            <select
              id={`variant-${product.id}`}
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="ml-1 border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {variantArray.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-sm text-gray-400">—</span>
          )}
        </div>

        <div className="mt-4">
          {product.inStock ? (
            <button
              onClick={() => onAddToCart?.(product, selectedVariant)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white font-semibold shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          ) : (
            <div className="text-center py-2">
              <span className="text-red-600 font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;