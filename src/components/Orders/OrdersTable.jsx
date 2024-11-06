import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersTable = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!Array.isArray(orders) || orders.length === 0) {
    return null;
  }

  const handleOpenModal = (order) => {
    if (!order) {
      console.warn('No order data provided');
      return;
    }
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table 
          sx={{ 
            minWidth: 650,
            borderCollapse: 'collapse',
            '& th, & td': {
              border: '1px solid rgba(224, 224, 224, 1)',
            },
            '& th': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold'
            }
          }} 
          aria-label="orders table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order?.orderId || `unknown-${Math.random()}`}>
                <TableCell>{order?.orderId || 'N/A'}</TableCell>
                <TableCell>{order?.customer?.name || 'N/A'}</TableCell>
                <TableCell>{order?.customer?.email || 'N/A'}</TableCell>
                <TableCell>{order?.orderStatus || 'N/A'}</TableCell>
                <TableCell>${(order?.sellerTotalPrice || 0).toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenModal(order)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedOrder && (
        <OrderDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      customer: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      orderStatus: PropTypes.string,
      sellerTotalPrice: PropTypes.number,
    })
  ).isRequired,
};

export default OrdersTable; 