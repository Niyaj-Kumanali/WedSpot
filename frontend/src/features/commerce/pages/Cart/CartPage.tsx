import { Box } from '@mui/material';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import CartList from '../../components/Cart/CartList';

const CartPage = () => {
    const navigate = useNavigate();
    const { success } = useSnackbar();
    const { items, removeFromCart, updateQuantity, clearCart } = useCart();

    const subtotal = items.reduce((acc: number, item: any) => {
        return acc + (item.numericPrice * item.quantity);
    }, 0);

    const handleRemove = (id: string, _name: string) => {
        removeFromCart(id);
    };

    const handleItemClick = (vendorId: string) => {
        navigate(`/client/vendors/${vendorId}`);
    };

    const handleCheckout = () => {
        success('Booking request submitted successfully!');
        clearCart();
        navigate('/dashboard');
    };

    return (
        <Box sx={{ pt: 0, pb: 4 }}>
            <CartList 
                items={items.map((item: any) => ({
                    ...item,
                    name: item.vendorName || item.name, 
                    serviceName: item.category || item.sectorId,
                    description: item.description || '',
                    price: item.priceRange,
                    onClick: () => handleItemClick(item.vendorId),
                    onUpdateQuantity: (newQty: number) => updateQuantity(item.vendorId, newQty),
                    onRemove: () => handleRemove(item.id, item.name)
                }))}
                subtotal={subtotal}
                total={subtotal} 
                onRemove={handleRemove}
                onCheckout={handleCheckout}
                onExplore={() => navigate('/client/vendors')}
            />
        </Box>
    );
};

export default CartPage;
