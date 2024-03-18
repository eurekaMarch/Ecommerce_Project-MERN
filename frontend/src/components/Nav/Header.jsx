import { lightGreen } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";

function Header() {
  return (
    <div>
      <Box
        sx={{
          bgcolor: lightGreen[600],
          height: "4rem",
          color: "white",
          py: 1,
          flexGrow: 1,
          display: "flex",
          textAlign: "center",
        }}
      >
        <Grid container xs={12} sm={12} md={12}>
          <Grid md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Typography>
              <i className="fa-solid fa-phone"></i> +668 1123 4567
            </Typography>
          </Grid>
          <Grid md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Typography>
              <i className="fa-solid fa-envelope"></i> info@Shopeefy.com
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Box>
              <Link href="" sx={{ pr: "1.5rem" }}>
                <i
                  className="fa-brands fa-facebook-f"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
              <Link href="" sx={{ pr: "1.5rem" }}>
                <i
                  className="fa-brands fa-instagram"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
              <Link href="" sx={{ pr: "1.5rem" }}>
                <i
                  className="fa-brands fa-linkedin-in"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
              <Link href="" sx={{ pr: "1.5rem" }}>
                <i
                  className="fa-brands fa-youtube"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
              <Link href="">
                <i
                  className="fa-brands fa-pinterest"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Header;
