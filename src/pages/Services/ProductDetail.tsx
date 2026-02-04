import { useEffect, useState, useContext, type JSX } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import AuthContext from "../../contexts/AuthContext";

const ProductDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [theme, setTheme] = useState("");
  const [budget, setBudget] = useState("");
  const [response, setResponse] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (id)
      api
        .get(`/product/${id}`)
        .then((r) => setProduct(r.data))
        .catch(() => {});
  }, [id]);

  const askDesign = async () => {
    if (!auth?.accessToken) {
      alert("Please login to use AI features");
      return;
    }
    const res = await api.post("/ai/design", {
      ProductType: product?.name || "decoration",
      Theme: theme,
      ColorScheme: budget,
      AdditionalDetails: budget,
    });
    setResponse(res.data.response);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography>₹{product.price}</Typography>
      <Typography sx={{ mt: 2 }}>{product.description}</Typography>

      <Box sx={{ mt: 3 }}>
        <TextField
          label="Theme"
          fullWidth
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <TextField
          label="Budget or Color Scheme"
          fullWidth
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={askDesign}>
          Get AI Design
        </Button>
      </Box>

      {response && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">AI Suggestions</Typography>
          <pre style={{ whiteSpace: "pre-wrap" }}>{response}</pre>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetail;
