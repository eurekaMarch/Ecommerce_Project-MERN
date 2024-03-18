import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { grey } from "@mui/material/colors";

function Products(value) {
  const { product } = value;

  return (
    <div>
      <CardActionArea>
        <Link to={`/products?id=${product._id}`}>
          <Card sx={{ textAlign: "center", minHeight: "32rem" }}>
            <CardMedia
              component="img"
              image={product.image}
              sx={{
                height: "20rem",
                pt: "2rem",
                px: "2rem",
                objectFit: "contain",
              }}
            />
            <CardContent sx={{ textAlign: "left" }} id="Products__cardContent">
              <Typography gutterBottom sx={{ color: grey[600] }}>
                {product.category}
              </Typography>
              <Typography
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                {product.name}
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </CardActionArea>
    </div>
  );
}

export default Products;
