import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import masterCard from "../../assets/mastercard.svg";
import visa from "../../assets/visa.svg";
import paypal from "../../assets/paypal.svg";
import amex from "../../assets/amex.svg";

function Footer() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: grey[300],
          pt: "0.8rem",
        }}
      >
        <Box sx={{ pr: "2rem" }}>
          <img src={masterCard} alt="" height={"30rem"} />
        </Box>
        <Box sx={{ pr: "2rem" }}>
          <img src={visa} alt="" height={"17rem"} />
        </Box>
        <Box sx={{ pr: "2rem" }}>
          <img src={paypal} alt="" height={"20rem"} />
        </Box>
        <Box>
          <img src={amex} alt="" height={"25rem"} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: grey[300],
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#EA8018", pr: "0.5rem" }}>
          Shopeefy
        </Typography>
        <Typography sx={{ fontSize: "1rem" }}>
          &copy; Copyright 2023. All Rights Reserved
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
