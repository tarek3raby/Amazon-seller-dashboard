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
  Alert,
  IconButton,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import productService from '../../services/productService';

const AddProductModal = ({ open, onClose, onSuccess }) => {
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

  const initialFormData = {
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    price: 0,
    discounts: 0,
    stock: 0,
    brand: '',
    imageUrls: [],
    subcategoryId: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const result = await productService.uploadImage(file);
        setFormData(prev => ({
          ...prev,
          imageUrls: [...prev.imageUrls, result.url]
        }));
      } catch (error) {
        setError('Failed to upload image');
        console.error('Image upload failed:', error);
      } finally {
        setLoading(false);
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

      // Validate required fields
      if (!formData.name.en || !formData.name.ar || !formData.price) {
        setError('Please fill in all required fields');
        return;
      }

      await productService.addProduct(formData);
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Error adding product');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {Array.isArray(error) ? error.join(', ') : error}
          </Alert>
        )}

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Product Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Product Name (EN)"
                value={formData.name.en}
                onChange={(e) => handleInputChange('name', e.target.value, 'en')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
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

            {/* Price and Stock */}
            <Grid item xs={12} sm={4}>
              <TextField
                required
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
                label="Discounts (%)"
                value={formData.discounts}
                onChange={(e) => handleInputChange('discounts', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                type="number"
                label="Stock"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', Number(e.target.value))}
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
              />
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

            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={loading}
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
            {formData.imageUrls.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Uploaded Images
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;