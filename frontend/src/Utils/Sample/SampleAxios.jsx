import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function SingleProduct() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5rem" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <img src={data.image}></img>
      )}
    </div>
  );
}

export default SingleProduct;
