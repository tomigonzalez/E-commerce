"use client";

import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import IconButton from "@/components/icon-button";
import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [stockAvailable, setStockAvailable] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Selecciona automáticamente el talle más chico con stock
  useEffect(() => {
    const firstAvailable = product.size_stock
      .filter((s) => s.stock > 0)
      .sort((a, b) => a.size.localeCompare(b.size))[0];

    if (firstAvailable) {
      setSelectedSize(firstAvailable.size);
      setStockAvailable(firstAvailable.stock);
    }
  }, [product.size_stock]);

  const handleSizeClick = (size: string, stock: number) => {
    setSelectedSize(size);
    setStockAvailable(stock);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || stockAvailable === 0) {
      alert("Seleccioná un talle con stock.");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm p-6">
      <CardContent className="flex flex-col items-center">
        <img
          src={
            product.images?.[0]
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`
              : "/subirImg.png"
          }
          alt={product.productName}
          className="w-full h-40 object-contain"
        />

        <h3 className="text-lg font-bold mt-4">{product.productName}</h3>

        <div className="flex gap-3 mt-2 text-sm">
          <p className="bg-black text-white px-2 py-1 rounded-full">
            {product.category?.categoryName ?? "Categoría"}
          </p>
          <p className="bg-yellow-900 text-white px-2 py-1 rounded-full">
            {product.sub_category?.subCategoryName ?? "Subcategoría"}
          </p>
        </div>

        <p className="text-xl mt-4">{formatPrice(product.price)}</p>

        {/* Talles */}
        <div className="flex flex-wrap gap-2 mt-3">
          {product.size_stock.map(({ id, size, stock }) => (
            <button
              key={id}
              onClick={() => handleSizeClick(size, stock)}
              disabled={stock === 0}
              className={`px-3 py-1 text-sm rounded-full border ${
                stock === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Cantidad */}
        {stockAvailable > 0 && (
          <div className="mt-3 text-sm text-center">
            <label className="mr-2">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              min={1}
              max={stockAvailable}
              onChange={(e) =>
                setQuantity(Math.min(stockAvailable, Number(e.target.value)))
              }
              className="w-16 px-2 py-1 border rounded text-center"
            />
            <p className="text-xs text-gray-500 mt-1">
              Stock disponible: {stockAvailable}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4 mt-5">
          <IconButton
            onClick={() => router.push(`product/${product.slug}`)}
            icon={<Expand size={16} />}
            className="text-gray-600"
          />
          {stockAvailable > 0 ? (
            <IconButton
              onClick={handleAddToCart}
              icon={<ShoppingCart size={16} />}
              className="text-gray-600"
            />
          ) : (
            <div className="text-sm text-red-500 mt-1">Sin stock</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
