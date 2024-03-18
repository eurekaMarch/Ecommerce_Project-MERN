import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

function Shipping(value) {
  window.scrollTo(0, 70);
  const { shippingAddress, shipping } = value;
  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [postalCode, setPostalCode] = useState(shipping.postalCode);
  const [country, setCountry] = useState(shipping.country);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    shippingAddress({
      address,
      city,
      postalCode,
      country,
    });

    window.location.replace(`/placeorder`);
    navigate(`/placeorder`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: "2.5rem",
        flexGrow: 1,
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
          textAlign: "center",
          px: "2rem",
          pb: "2rem",
        }}
      >
        <Grid xs={12} sm={8} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" sx={{ mt: "3rem" }}>
              DELIVERY ADDRESS
            </Typography>
            <form onSubmit={submitHandler}>
              <InputBase
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                sx={{
                  pt: "3rem",
                  px: "3rem",
                  width: "100%",
                  input: {
                    background: "white",
                    pl: "1rem",
                    height: "5rem",

                    border: 1,
                    borderRadius: 1.2,
                    borderColor: grey[300],
                  },
                }}
              ></InputBase>

              <InputBase
                type="text"
                placeholder="Enter city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{
                  pt: "3rem",
                  px: "3rem",
                  width: "100%",
                  input: {
                    background: "white",
                    pl: "1rem",
                    height: "5rem",

                    border: 1,
                    borderRadius: 1.2,
                    borderColor: grey[300],
                  },
                }}
              ></InputBase>

              <InputBase
                type="text"
                placeholder="Enter postal code"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                sx={{
                  pt: "3rem",
                  px: "3rem",
                  width: "100%",
                  input: {
                    background: "white",
                    pl: "1rem",
                    height: "5rem",

                    border: 1,
                    borderRadius: 1.2,
                    borderColor: grey[300],
                  },
                }}
              ></InputBase>

              <InputBase
                type="text"
                placeholder="Enter country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                sx={{
                  pt: "3rem",
                  px: "3rem",
                  width: "100%",
                  input: {
                    background: "white",
                    pl: "1rem",
                    height: "5rem",

                    border: 1,
                    borderRadius: 1.2,
                    borderColor: grey[300],
                  },
                }}
              ></InputBase>

              <Button
                variant="contained"
                color="green"
                size="normal"
                sx={{ width: "10rem", my: "2rem", fontSize: "1.6rem" }}
                type="submit"
              >
                Continue
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Shipping;
