import {
  Modal,
  Box,
  Typography,
  Divider,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflow: 'auto',
};

const OrderDetailsModal = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2">
            Order Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {/* Order Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Order Information</Typography>
            <Typography><strong>Order ID:</strong> {order.orderId}</Typography>
            <Typography><strong>Status:</strong> {order.orderStatus}</Typography>
            <Typography><strong>Total Price:</strong> ${order.sellerTotalPrice}</Typography>
          </Grid>

          {/* Customer Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Customer Information</Typography>
            <Typography><strong>Name:</strong> {order.customer.name}</Typography>
            <Typography><strong>Email:</strong> {order.customer.email}</Typography>
          </Grid>

          {/* Shipping Address */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <Typography>{order.shippingAddress}</Typography>
          </Grid>

          {/* Order Items */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Order Items</Typography>
            <Grid container spacing={2}>
              {order.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.productId.imageUrls[0]}
                      alt={item.productId.name.en}
                      sx={{ objectFit: 'contain', p: 1 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" component="div" gutterBottom>
                        {item.productId.name.en}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Brand: {item.productId.brand}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${item.productId.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Subtotal: ${item.productId.price * item.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.shape({
          name: PropTypes.shape({
            en: PropTypes.string.isRequired,
          }).isRequired,
          price: PropTypes.number.isRequired,
          brand: PropTypes.string.isRequired,
          imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    orderStatus: PropTypes.string.isRequired,
    sellerTotalPrice: PropTypes.number.isRequired,
    shippingAddress: PropTypes.string.isRequired,
  }),
};

export default OrderDetailsModal; 