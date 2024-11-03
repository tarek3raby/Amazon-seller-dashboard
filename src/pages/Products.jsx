import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Snackbar,
  TablePagination,
  Box,
  CircularProgress
} from '@mui/material';
import ProductTable from "../components/Products/ProductTable";
import productService from "../services/productService";
import EditProductModal from '../components/Products/EditProductModal';
import AddProductModal from '../components/Products/AddProductModal';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]); // Refetch when page or rowsPerPage changes

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductsWithPagination(page + 1, rowsPerPage);
      setProducts(response.products);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError(err.message);
      setSnackbar({
        open: true,
        message: 'Error loading products',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleView = (product) => {
    navigate(`/dashboard/products/${product._id}`);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await productService.deleteProduct(productToDelete);
      setProducts(products.filter(p => p._id !== productToDelete));
      setSnackbar({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error deleting product',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdateSuccess = () => {
    fetchProducts(); // Refresh the products list
    setSnackbar({
      open: true,
      message: 'Product updated successfully',
      severity: 'success'
    });
  };

  const handleAddSuccess = () => {
    fetchProducts(); // Refresh the products list
    setSnackbar({
      open: true,
      message: 'Product added successfully',
      severity: 'success'
    });
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <Box className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddModalOpen(true)}
        >
          Add New Product
        </Button>
      </Box>

      {loading ? (
        <Box className="flex justify-center p-4">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      ) : (
        <Box className="bg-white rounded-lg shadow">
          <ProductTable
            products={products}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="border-t"
          />
        </Box>
      )}

      {selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onUpdate={handleUpdateSuccess}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <AddProductModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
