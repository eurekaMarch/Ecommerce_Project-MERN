import { useEffect } from "react";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import Products from "./Products";
import usePagination from "../../Utils/usePagination";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import searchImage from "../../assets/searchEmpty.png";

function Home(values) {
  window.scrollTo(0, 0);
  const { products, loading } = values;

  const filterProduct = products.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  });

  const { pageProducts, page, maxPage, jumpPage } = usePagination(
    filterProduct,
    6
  );

  const handleChange = (event, value) => {
    jumpPage(value);
  };

  useEffect(() => {
    if (products) jumpPage(1);
  }, [products, jumpPage]);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5rem" }}>
          <CircularProgress color="success" />
        </Box>
      ) : filterProduct.length > 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            mt: "2.5rem",
            ml: "6rem",
            mr: "3rem",
          }}
        >
          <Grid container xs={12} sm={12} md={12} spacing={3}>
            {pageProducts().map((product) => {
              return (
                <Grid xs={12} sm={6} md={4} key={product._id}>
                  <Products product={product} />
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
            <Pagination
              count={maxPage}
              page={page}
              onChange={handleChange}
              size="large"
              color="black"
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          id="Home__font"
        >
          <CardMedia
            component="img"
            image={searchImage}
            sx={{
              height: "12rem",
              width: "12rem",
            }}
            id="Home__cardMedia"
          />

          <Typography gutterBottom sx={{ textAlign: "center" }}>
            No results found
          </Typography>

          <Typography sx={{ color: grey[600], textAlign: "center" }}>
            Try different or more general keywords
          </Typography>
        </Box>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
