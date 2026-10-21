import { useEffect, useState } from "react";
import { type ProductPanelType } from "../types/ProductPanelType";
import { type ProductPreview } from "../types/ProductPreview";
import { productsData } from "../data/products";

const useCart = () => {
  const [productsPanel, setProductsPanel] = useState<ProductPanelType[]>([]);
  const [isLoadingPanelProducts, setIsLoadingPanelProducts] =
    useState<boolean>(false);
  const [cartPreviewProducts, setCartPreviewProducts] = useState<
    ProductPreview[]
  >([]);
  const countProductsCart = cartPreviewProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingPanelProducts(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoadingPanelProducts(false);
      const productsPanelData: ProductPanelType[] = productsData.map(
        (productData) => ({
          id: productData.id,
          title: productData.title,
          price: productData.price,
          description: productData.description,
        }),
      );
      setProductsPanel(productsPanelData);
    };
    void fetchProducts();
  }, []);

  const addProductToCart = (product: ProductPanelType) => {
    setCartPreviewProducts((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );
      if (existingProduct) {
        return currentCart.map((currentProduct) =>
          currentProduct.id === product.id
            ? { ...currentProduct, quantity: currentProduct.quantity + 1 }
            : currentProduct,
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.title,
          quantity: 1,
          price: product.price,
        },
      ];
    });
  };

  const removeProductFromCart = (productId: number) => {
    setCartPreviewProducts((currentCart) =>
      currentCart
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity > 0),
    );
  };

  return {
    productsPanel,
    isLoadingPanelProducts,
    addProductToCart,
    removeProductFromCart,
    cartPreviewProducts,
    countProductsCart,
  };
};

export default useCart;
