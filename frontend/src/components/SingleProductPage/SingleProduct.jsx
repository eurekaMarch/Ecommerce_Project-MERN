import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { mongoDBApi } from "../../Utils/axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { red, grey } from "@mui/material/colors";

const initial = {
  product: [],
  loading: false,
  error: null,
};

function SingleProduct(value) {
  const { addToCart } = value;

  const [productItem, setProductItem] = useState(initial);
  const [amountItem, setAmountItem] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const fetchProduct = async (id) => {
    setProductItem((prev) => ({
      ...prev,
      loading: true,
    }));

    let products;
    let fetchError;

    try {
      const productResponse = await mongoDBApi.get(`products/${id}`);

      products = await productResponse?.data;
    } catch (error) {
      fetchError = error;
    }

    setProductItem((prev) => ({
      ...prev,
      product: products,
      loading: false,
      error: fetchError,
    }));
  };

  const AddToCartHandle = () => {
    addToCart(productItem.product, amountItem);
    navigate(`/cart`);
    setAmountItem(1);
  };

  useEffect(() => {
    id && fetchProduct(id);
  }, [id]);

  return (
    <div>
      {productItem.loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5rem" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          sx={{ height: "72vh", px: "2rem", mt: "3rem" }}
        >
          <Grid
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                image={productItem.product.image}
                sx={{ height: "30rem", objectFit: "contain", pb: "2rem" }}
              />
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={7}
            md={7}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  maxWidth: "35rem",
                  textAlign: "justify",
                }}
              >
                {productItem.product.name}
              </Typography>

              <Typography
                gutterBottom
                sx={{ color: red[500], fontWeight: "bold", fontSize: "1.8rem" }}
              >
                ${productItem.product.price}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.4rem",
                  maxWidth: "50rem",
                  color: grey[600],
                  textAlign: "justify",
                  textIndent: "4rem",
                }}
              >
                {productItem.product.description}
              </Typography>

              <Box sx={{ display: "flex", width: "10rem", my: "2rem" }}>
                <CardActionArea sx={{ width: "3rem", height: "3rem" }}>
                  <Card
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => setAmountItem(Math.max(amountItem - 1, 1))}
                  >
                    <i
                      className="fa-solid fa-minus"
                      style={{ color: "#000000" }}
                    ></i>
                  </Card>
                </CardActionArea>

                <Card
                  sx={{
                    width: "4rem",
                    height: "3rem",
                    borderRadius: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {amountItem}
                </Card>

                <CardActionArea sx={{ width: "3rem" }}>
                  <Card
                    sx={{
                      width: "3rem",
                      borderRadius: 0,
                      height: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => setAmountItem(amountItem + 1)}
                  >
                    <i
                      className="fa-solid fa-plus"
                      style={{ color: "#000000" }}
                    ></i>
                  </Card>
                </CardActionArea>
              </Box>

              <Button
                variant="contained"
                color="black"
                sx={{
                  fontSize: "1.6rem",
                  height: "5rem",
                  mb: "2rem",
                }}
                onClick={AddToCartHandle}
              >
                Add to cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default SingleProduct;
