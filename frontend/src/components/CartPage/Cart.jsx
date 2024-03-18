import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { red, grey } from "@mui/material/colors";
import useToken from "../../Utils/Token";

function Cart(value) {
  const navigate = useNavigate();
  const { token } = useToken();
  const {
    cartProduct,
    removeFromCart,
    increaseQty,
    decreaseQty,
    setPageAction,
  } = value;

  const totalPrice = cartProduct
    .reduce((pre, cur) => {
      return pre + Number(cur.qty) * Number(cur.price);
    }, 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const checkOutHandler = () => {
    if (token) {
      navigate(`/shipping`);
    } else {
      navigate(`/login`, { replace: true });
      setPageAction(true);
    }
  };

  return (
    <div>
      {cartProduct.length === 0 ? (
        <Box
          sx={{
            mx: "4rem",
            mt: "6rem",
            height: "15rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mb: "2rem",
              fontWeight: 600,
              fontSize: "2rem",
              color: grey[600],
            }}
          >
            Your cart is empty
          </Typography>

          <Link to="/">
            <Button
              variant="contained"
              color="green"
              sx={{
                fontSize: "1.6rem",
                height: "5rem",
                fontWeight: 500,
              }}
            >
              Shopping Now
            </Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", my: "4rem" }}>
          {cartProduct.map((product) => {
            return (
              <div key={product._id}>
                <Box
                  sx={{
                    mx: "9rem",
                    mb: "-1rem",
                    background: red[500],
                    height: "2.2rem",
                    width: "2.2rem",
                    zIndex: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => removeFromCart(product)}
                >
                  <i className="fas fa-times" style={{ color: "#ffffff" }}></i>
                </Box>
                <Card
                  sx={{
                    mx: "10rem",
                    mb: "4rem",
                    py: "4rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      xs={12}
                      sm={12}
                      md={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pb: "2rem",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.image}
                        sx={{ height: "12rem", objectFit: "contain" }}
                      />
                    </Grid>

                    <Grid
                      xs={12}
                      sm={12}
                      md={6}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          px: "2rem",
                          textAlign: "center",
                        }}
                      >
                        {product.name}
                      </Typography>
                    </Grid>

                    <Grid
                      xs={12}
                      sm={6}
                      md={2}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "10rem",
                          my: "2rem",
                        }}
                      >
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
                            onClick={() => decreaseQty(product)}
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
                          {product.qty}
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
                            onClick={() => increaseQty(product)}
                          >
                            <i
                              className="fa-solid fa-plus"
                              style={{ color: "#000000" }}
                            ></i>
                          </Card>
                        </CardActionArea>
                      </Box>
                    </Grid>

                    <Grid
                      xs={12}
                      sm={6}
                      md={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, color: red[500] }}>
                        ${product.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            );
          })}

          <Box
            sx={{
              textAlign: "end",
              mr: "15rem",
              mb: "2rem",

              fontSize: "2rem",
            }}
          >
            <Box component="span" sx={{ color: grey[600] }}>
              TOTAL:
            </Box>
            <Box
              component="span"
              sx={{ ml: "1rem", fontWeight: "bold", color: red[500] }}
            >
              ${totalPrice}
            </Box>
          </Box>

          <Box sx={{ mx: "9rem", mb: "6rem" }}>
            <hr />
          </Box>

          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Grid xs={12} sm={12} md={6}>
              <Link to="/">
                <Button
                  variant="contained"
                  color="black"
                  size="normal"
                  sx={{
                    fontSize: "1.6rem",
                    height: "5.5rem",
                    width: "55%",
                    mb: "2rem",
                  }}
                >
                  Continue To Shopping
                </Button>
              </Link>
            </Grid>

            <Grid xs={12} sm={12} md={6}>
              <Button
                variant="contained"
                color="green2"
                size="normal"
                onClick={checkOutHandler}
                sx={{
                  fontSize: "1.6rem",
                  height: "5.5rem",
                  width: "55%",
                }}
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default Cart;
