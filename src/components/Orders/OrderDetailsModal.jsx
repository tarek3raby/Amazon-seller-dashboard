import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';

const OrderDetailsModal = ({ open, onClose, order }) => {
  if (!order || !open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Order Details - {order.orderId}
      </DialogTitle>
      <DialogContent>
        {/* Customer Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>Customer Information</Typography>
        {order.customer ? (
          <Box sx={{ mb: 3 }}>
            <Typography>Name: {order.customer.name || 'N/A'}</Typography>
            <Typography>Email: {order.customer.email || 'N/A'}</Typography>
          </Box>
        ) : (
          <Typography color="text.secondary">No customer information available</Typography>
        )}
        
        <Divider sx={{ my: 2 }} />

        {/* Order Items */}
        <Typography variant="h6" sx={{ mb: 2 }}>Order Items</Typography>
        {order.items?.map((item, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                {item.productId.imageUrls?.[0] && (
                  <img 
                    src={item.productId.imageUrls[0]} 
                    alt={item.productId.name.en}
                    style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {item.productId.name.en}
                </Typography>
                <Typography>Brand: {item.productId.brand}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Price: ${item.productId.price}</Typography>
                {item.productId.description?.en && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.productId.description.en}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Order Status and Total */}
        <Typography variant="h6" sx={{ mb: 2 }}>Order Information</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography>Status: {order.orderStatus}</Typography>
          <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
            Total Price: ${order.sellerTotalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Shipping Address */}
        <Typography variant="h6" sx={{ mb: 2 }}>Shipping Address</Typography>
        <Typography>{order.shippingAddress}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.shape({
    orderId: PropTypes.string,
    customer: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.shape({
          name: PropTypes.shape({
            en: PropTypes.string,
            ar: PropTypes.string,
          }),
          price: PropTypes.number,
          brand: PropTypes.string,
          imageUrls: PropTypes.arrayOf(PropTypes.string),
          description: PropTypes.shape({
            en: PropTypes.string,
            ar: PropTypes.string,
          }),
        }),
        quantity: PropTypes.number,
      })
    ),
    orderStatus: PropTypes.string,
    sellerTotalPrice: PropTypes.number,
    shippingAddress: PropTypes.string,
  }),
};

export default OrderDetailsModal; 