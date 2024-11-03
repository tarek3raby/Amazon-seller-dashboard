import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Grid,
  CircularProgress,
  ImageList,
  ImageListItem,
  Divider,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import productService from '../services/productService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="p-4">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="container mx-auto p-4 mt-16">
      <Box className="flex justify-between items-center mb-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard/products')}
          variant="outlined"
        >
          Back to Products
        </Button>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          onClick={() => navigate(`/dashboard/products/edit/${id}`)}
        >
          Edit Product
        </Button>
      </Box>

      <Paper className="p-6 shadow-lg">
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <ImageList cols={2} gap={8}>
              {product?.imageUrls?.map((url, index) => (
                <ImageListItem key={index} className="aspect-square overflow-hidden">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className="font-bold mb-4">
              {product?.name?.en}
            </Typography>

            <Box className="flex gap-2 mb-4">
              <Chip
                label={product?.isVerified ? "Verified" : "Pending"}
                color={product?.isVerified ? "success" : "warning"}
              />
              <Chip
                label={`${product?.stock} in stock`}
                color={product?.stock > 10 ? "success" : "warning"}
              />
            </Box>

            <Typography variant="h5" className="font-bold text-primary mb-2">
              ${product?.price}
              {product?.discounts > 0 && (
                <span className="ml-2 text-green-600 text-lg">
                  -{product.discounts}% off
                </span>
              )}
            </Typography>

            <Divider className="my-4" />

            <Typography variant="h6" className="font-semibold mb-2">
              Description
            </Typography>
            <Typography className="text-gray-600 mb-4">
              {product?.description?.en}
            </Typography>

            <Typography variant="h6" className="font-semibold mb-2">
              Brand
            </Typography>
            <Typography className="text-gray-600 mb-4">
              {product?.brand || 'No Brand'}
            </Typography>

            <Typography variant="h6" className="font-semibold mb-2">
              Category
            </Typography>
            <Box className="mb-4">
              <Typography className="font-medium">
                {product?.subcategoryId?.name?.en}
              </Typography>
              <Typography className="text-gray-600">
                {product?.subcategoryId?.description?.en}
              </Typography>
            </Box>

            <Divider className="my-4" />

            <Box className="space-y-2">
              <Typography variant="h6" className="font-semibold">
                Additional Details
              </Typography>
              <Typography className="text-gray-600">
                SKU: {product?.sku || 'N/A'}
              </Typography>
              <Typography className="text-gray-600">
                Weight: {product?.weight || 'N/A'} kg
              </Typography>
              <Typography className="text-gray-600">
                Dimensions: {product?.dimensions || 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;