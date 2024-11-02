import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import productService from '../../services/productService';

const EditProductModal = ({ open, onClose, product, onUpdate }) => {
  const subCategoriesIDs = {
    'Smartphones': '66f9c3772cd468548df8b112',
    'Home Cleaning': '66f9c3772cd468548df8b118',
    'Gym Equipment': '66f9c3772cd468548df8b113',
    'Makeup': '66f9c3772cd468548df8b11c',
    'Laptops': '66f9c3772cd468548df8b111',
    'Fiction': '66f9c3772cd468548df8b115',
    'Kitchen Appliances': '66f9c3772cd468548df8b117',
    "Men's Clothing": '66f9c3772cd468548df8b119',
    "Women's Clothing": '66f9c3772cd468548df8b11a',
    'Outdoor Sports': '66f9c3772cd468548df8b114',
    'Science': '66f9c3772cd468548df8b116',
    'Skincare': '66f9c3772cd468548df8b11b',
    'Drones': '66f9c4132cd468548df8b11f',
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: {
      en: product?.name?.en || '',
      ar: product?.name?.ar || ''
    },
    price: product?.price || 0,
    discounts: product?.discounts || 0,
    description: {
      en: product?.description?.en || '',
      ar: product?.description?.ar || ''
    },
    brand: product?.brand || '',
    imageUrls: product?.imageUrls || [],
    stock: product?.stock || 0,
    subcategoryId: product?.subcategoryId || ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (field, value, language = null) => {
    setFormData(prev => {
      if (language) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [language]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await productService.uploadImage(file);
        setFormData(prev => ({
          ...prev,
          imageUrls: [...prev.imageUrls, response.url]
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };



  const handleDeleteImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!formData.subcategoryId) {
        setError('Please select a category');
        return;
      }

      const cleanedData = {
        ...formData,
        name: {
          en: formData.name.en,
          ar: formData.name.ar
        },
        description: {
          en: formData.description.en,
          ar: formData.description.ar
        }
      };

      await productService.updateProduct(product._id, cleanedData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.response?.data?.message || 'Error updating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Product Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name (EN)"
                value={formData.name.en}
                onChange={(e) => handleInputChange('name', e.target.value, 'en')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name (AR)"
                value={formData.name.ar}
                onChange={(e) => handleInputChange('name', e.target.value, 'ar')}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description (EN)"
                value={formData.description.en}
                onChange={(e) => handleInputChange('description', e.target.value, 'en')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description (AR)"
                value={formData.description.ar}
                onChange={(e) => handleInputChange('description', e.target.value, 'ar')}
              />
            </Grid>

            {/* Price and Discounts */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Discounts"
                value={formData.discounts}
                onChange={(e) => handleInputChange('discounts', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', Number(e.target.value))}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </Button>
            </Grid>

            {/* Image Preview */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Product Images</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {formData.imageUrls.map((url, index) => (
                  <Box
                    key={index}
                    sx={{ position: 'relative' }}
                  >
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bgcolor: 'background.paper'
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Category Selector */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.subcategoryId}
                  label="Category"
                  onChange={(e) => handleInputChange('subcategoryId', e.target.value)}
                >
                  {Object.entries(subCategoriesIDs).map(([name, id]) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
