import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';


interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl?: string;
}

const ProductList = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    api
      .get<Product[]>('/product') // Type the response
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <Grid columns={12} spacing={2}>
  {products.map((p) => (
    <Grid xs={12} sm={6} md={4} key={p.id}>
      <Card>
        <CardMedia
          component="img"
          height="180"
          image={p.imageUrl || 'https://placehold.co/600x400'}
          alt={p.name}
        />
        <CardContent>
          <Typography variant="h6">{p.name}</Typography>
          <Typography variant="body2">₹{p.price}</Typography>
          <Button variant="contained" onClick={() => nav(`/product/${p.id}`)}>
            View
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
  );
};

export default ProductList;
