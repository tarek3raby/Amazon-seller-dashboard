import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import OrdersTable from '../components/Orders/OrdersTable';
import orderService from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getSellerOrders();
        setOrders(data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' ? true : order?.orderStatus === statusFilter
  );

  // Get unique statuses from orders
  const uniqueStatuses = [...new Set(orders.map(order => order?.orderStatus))].filter(Boolean);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4, mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4, mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Container sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Typography variant="h4" component="h1">
            Orders
          </Typography>
          
          {orders.length > 0 && (
            <FormControl 
              size="small"
              sx={{ 
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiSelect-select': {
                  py: 1.5,
                },
              }}
            >
              <InputLabel id="status-filter-label">Filter by Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Filter by Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all" sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    All Orders
                  </Box>
                </MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem 
                    key={status} 
                    value={status}
                    sx={{ py: 1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {status}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {(!orders || !Array.isArray(orders) || orders.length === 0) ? (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            You don't have any orders
          </Typography>
        ) : (
          <OrdersTable orders={filteredOrders} />
        )}
      </Container>
    </Box>
  );
};

export default Orders;
