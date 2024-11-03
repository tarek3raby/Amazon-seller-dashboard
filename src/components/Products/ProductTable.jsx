import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  CircularProgress
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ProductTable = ({ products, onView, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <Box className="flex justify-center p-8">
        <CircularProgress />
      </Box>
    );
  }

  if (!products?.length) {
    return (
      <Box className="p-8 text-center text-gray-500">
        No products found
      </Box>
    );
  }

  return (
    <div className="w-full p-4">
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="min-w-full">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">Image</TableCell>
              <TableCell className="font-bold">Product Name</TableCell>
              <TableCell className="font-bold">Brand</TableCell>
              <TableCell className="font-bold">Price</TableCell>
              <TableCell className="font-bold">Stock</TableCell>
              <TableCell className="font-bold">Category</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product?._id || 'unknown'}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <div className="w-16 h-16 overflow-hidden rounded-lg">
                    <img
                      src={product?.imageUrls?.[0] || ''}
                      alt={product?.name?.en || 'Product Image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{product?.name?.en || 'Unnamed Product'}</span>
                    <span className="text-sm text-gray-500 truncate max-w-xs">
                      {product?.description?.en?.substring(0, 60) || 'No description'}
                      {product?.description?.en?.length > 60 ? '...' : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{product?.brand || 'No Brand'}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">${product?.price || 0}</span>
                    {product?.discounts > 0 && (
                      <span className="text-green-600 text-sm">
                        -{product.discounts}% off
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${product?.stock || 0} in stock`}
                    color={product?.stock > 10 ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{product?.subcategoryId?.name?.en || 'Uncategorized'}</span>
                    <span className="text-sm text-gray-500">
                      {product?.subcategoryId?.description?.en || 'No description'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={product?.isVerified ? "Verified" : "Pending"}
                    color={product?.isVerified ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => onView(product)}
                        size="small"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Product">
                      <IconButton
                        onClick={() => onEdit(product)}
                        size="small"
                        className="text-green-600 hover:text-green-800"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton
                        onClick={() => onDelete(product?._id)}
                        size="small"
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;