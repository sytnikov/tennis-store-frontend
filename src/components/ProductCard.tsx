import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ProductCardProps from "../types/ProductCardProps";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import UpdateProductInput from "../types/UpdateProductInput";
import {
  deleteProductAsync,
  updateProductAsync,
} from "../redux/reducers/productsReducer";
import Product from "../types/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import UpdateProductModal from "./UpdateProductModal";

const ProductCard = ({ product }: ProductCardProps) => {
  console.log('product:', product)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState("");

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const onOpenUpdateProduct = (productId: string) => {
    setIsUpdateProductOpen(true);
    setUpdatingProduct(productId);
  };

  const onCloseUpdateProduct = () => {
    setIsUpdateProductOpen(false);
    setUpdatingProduct("");
  };

  const onUpdateProduct = (updatedProduct: UpdateProductInput) => {
    dispatch(updateProductAsync(updatedProduct));
    setIsUpdateProductOpen(false);
  };

  const onDeleteProduct = (id: string) => {
    dispatch(deleteProductAsync(id));
  };

  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box onClick={() => handleProductClick(product._id)}>
        <CardMedia sx={{ height: 180 }} image={product.images[0]} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            ${product.price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ gap: 1 }}>
        <Button
          size="small"
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </Button>
        {currentUser && currentUser.role === "admin" && (
          <Box>
            <Button
              size="small"
              onClick={() => onOpenUpdateProduct(product._id)}
            >
              Update
            </Button>
            {isUpdateProductOpen && updatingProduct === product._id && (
              <UpdateProductModal
                isOpen={isUpdateProductOpen}
                onClose={onCloseUpdateProduct}
                productId={updatingProduct}
                product={product}
                onUpdateProduct={onUpdateProduct}
              />
            )}
            <Button size="small" onClick={() => onDeleteProduct(product._id)}>
              Delete
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;