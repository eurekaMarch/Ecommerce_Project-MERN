import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey, red } from "@mui/material/colors";
import truckPic from "../../assets/truck-solid.png";
import userPic from "../../assets/user-solid.png";
import locationPic from "../../assets/location-dot-solid.png";
import { mongoDBApi } from "../../Utils/axios";
import useToken from "../../Utils/Token";

function PlaceOrder(value) {
  window.scrollTo(0, 100);
  const { user, token } = useToken();
  const { shipping, cartProduct, clearcartItems } = value;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cartProduct.itemsPrice = addDecimals(
    cartProduct.reduce(
      (pre, cur) => pre + Number(cur.qty) * Number(cur.price),
      0
    )
  );
  cartProduct.shippingPrice = addDecimals(
    cartProduct.itemsPrice > 100 ? 0 : 100
  );

  cartProduct.taxPrice = addDecimals(
    Number((0.07 * cartProduct.itemsPrice).toFixed(2))
  );

  cartProduct.totalPrice = (
    Number(cartProduct.itemsPrice) +
    Number(cartProduct.shippingPrice) +
    Number(cartProduct.taxPrice)
  ).toFixed(2);

  const createData = (name, price) => {
    return { name, price };
  };

  const rows = [
    createData("Products", "$" + cartProduct.itemsPrice),
    createData("Shipping", "$" + cartProduct.shippingPrice),
    createData("Tax", "$" + cartProduct.taxPrice),
    createData("Total", "$" + cartProduct.totalPrice),
  ];

  const placeOrderHandler = async (data) => {
    try {
      const response = await mongoDBApi.post(`orders`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      setSuccess(response.data.success);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const fetchOrder = async () => {
    try {
      const orderResponse = await mongoDBApi.get("orders", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const orders = await orderResponse?.data;

      clearcartItems();

      navigate(`/order?id=${orders[orders.length - 1]._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success === true) {
      fetchOrder();
    }
  });

  return (
    <Box sx={{ mt: "1rem", mx: "6rem" }}>
      {/* order detail */}

      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        sx={{ bgcolor: "#f0f7e9", borderRadius: "0.6rem" }}
      >
        <Grid xs={12} sm={12} md={4}>
          <Box
            sx={{
              display: "flex",
              my: { xs: "1rem", sm: "1rem", md: "3rem" },
              mx: "2rem",
            }}
          >
            <Paper
              elevation={3}
              component="img"
              src={userPic}
              sx={{
                bgcolor: "white",
                height: { xs: "4rem", md: "6rem" },
                width: { xs: "4rem", md: "6rem" },
                borderRadius: "50%",
                mr: "2rem",
                mb: "1rem",
              }}
            ></Paper>

            <Box sx={{ mr: "2rem", fontSize: { xs: "1.2rem", md: "1.6rem" } }}>
              <Typography
                sx={{
                  mb: "0.7rem",
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  fontWeight: 600,
                }}
              >
                Customer
              </Typography>
              <Typography>{user.username}</Typography>
              <Typography sx={{ wordWrap: "break-word", mr: "3rem" }}>
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={4}>
          <Box
            sx={{
              display: "flex",
              my: { xs: "1rem", sm: "1rem", md: "3rem" },
              mx: "2rem",
            }}
          >
            <Paper
              elevation={3}
              component="img"
              src={truckPic}
              sx={{
                bgcolor: "white",
                height: { xs: "4rem", md: "6rem" },
                width: { xs: "4rem", md: "6rem" },
                borderRadius: "50%",
                mr: "2rem",
                mb: "1rem",
              }}
            ></Paper>

            <Box sx={{ mr: "2rem", fontSize: { xs: "1.2rem", md: "1.6rem" } }}>
              <Typography
                sx={{
                  mb: "0.7rem",
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  fontWeight: 600,
                }}
              >
                Order info
              </Typography>
              <Typography>Shipping: {shipping.country}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={4}>
          <Box
            sx={{
              display: "flex",
              my: { xs: "1rem", sm: "1rem", md: "3rem" },
              mx: "2rem",
            }}
          >
            <Paper
              elevation={3}
              component="img"
              src={locationPic}
              sx={{
                bgcolor: "white",
                height: { xs: "4rem", md: "6rem" },
                width: { xs: "4rem", md: "6rem" },
                borderRadius: "50%",
                mr: "2rem",
                mb: "1rem",
              }}
            ></Paper>

            <Box sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" } }}>
              <Typography
                sx={{
                  mb: "0.7rem",
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  fontWeight: 600,
                }}
              >
                Deliver to
              </Typography>
              <Typography>
                Address: {shipping.address}, {shipping.city},{" "}
                {shipping.postalCode}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container xs={12} sm={12} md={12} sx={{ mt: "4rem" }}>
        {/* product detail */}

        {cartProduct.length === 0 ? (
          <Grid xs={12} sm={12} md={8}>
            <Box
              sx={{
                textAlign: "center",
                bgcolor: "#CFF4FC",
                py: "2rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: grey[600],
                }}
              >
                Your cart is empty
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid
            xs={12}
            sm={12}
            md={8}
            sx={{ fontSize: { xs: "1.4rem", md: "1.6rem" } }}
          >
            {cartProduct.map((product) => {
              return (
                <Box key={product._id}>
                  <Card
                    sx={{
                      mb: "2rem",
                      py: "2rem",
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
                        xs={4}
                        sm={2}
                        md={2}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          px: "1rem",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={product.image}
                          sx={{ height: "12rem", objectFit: "contain" }}
                        />
                      </Grid>

                      <Grid
                        xs={8}
                        sm={4}
                        md={6}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Link to={`/products?id=${product._id}`}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              px: "1rem",
                              pb: "1rem",
                              textAlign: "center",
                            }}
                          >
                            {product.name}
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid
                        xs={6}
                        sm={3}
                        md={2}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          mt: { xs: "1rem", sm: 0 },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 400,
                            px: "1rem",
                            mb: "1rem",
                            textAlign: "center",
                          }}
                        >
                          QUANTITY
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            px: "1rem",
                            textAlign: "center",
                          }}
                        >
                          {product.qty}
                        </Typography>
                      </Grid>

                      <Grid
                        xs={6}
                        sm={3}
                        md={2}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          mt: { xs: "1rem", sm: 0 },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 400,
                            px: "1rem",
                            mb: "1rem",
                            textAlign: "center",
                          }}
                        >
                          SUBTOTAL
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 500,
                            px: "1rem",
                            textAlign: "center",
                            color: red[500],
                          }}
                        >
                          ${(product.qty * product.price).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
              );
            })}
          </Grid>
        )}

        {/* table */}
        <Grid xs={12} sm={12} md={4}>
          <Box
            sx={{ ml: { xs: 0, md: "8rem" }, mt: { xs: "4rem", md: "0rem" } }}
          >
            <TableContainer
              component={Paper}
              sx={{ bgcolor: grey[200], mb: "4rem" }}
            >
              <Table>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: red[500], fontWeight: 600 }}
                      >
                        {row.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {cartProduct.length === 0 ? null : (
              <Box
                sx={{ display: "flex", justifyContent: "center", mb: "4rem" }}
              >
                <Button
                  variant="contained"
                  color="green"
                  sx={{
                    fontSize: "1.6rem",
                    height: "5rem",
                    width: { xs: "40%", md: "100%" },
                    fontWeight: 500,
                  }}
                  onClick={() =>
                    placeOrderHandler({
                      orderItems: cartProduct,
                      shippingAddress: shipping,
                      itemsPrice: cartProduct.itemsPrice,
                      shippingPrice: cartProduct.shippingPrice,
                      taxPrice: cartProduct.taxPrice,
                      totalPrice: cartProduct.totalPrice,
                    })
                  }
                >
                  Place Order
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PlaceOrder;
