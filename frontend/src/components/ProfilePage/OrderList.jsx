import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Bangkok");

function OrderList(value) {
  const { getOrder } = value;

  return (
    <Box>
      {getOrder.length === 0 ? (
        <Box
          sx={{
            mt: "6rem",
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
            No Orders
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
              START SHOPPING
            </Button>
          </Link>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ fontSize: "1.4rem", bgcolor: grey[200] }}
        >
          <Table sx={{ minWidth: 570 }}>
            <TableHead>
              <TableRow sx={{ fontSize: "1.6rem" }}>
                <TableCell>Order ID</TableCell>
                <TableCell align="left">STATUS</TableCell>
                <TableCell align="left">DATE</TableCell>
                <TableCell align="left">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getOrder.reverse().map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/order?id=${row._id}`}>
                      <Typography
                        sx={{ color: "#0000EE", textDecoration: "underline" }}
                      >
                        {row._id}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    {row.isPaid ? "Paid" : "Not Paid"}
                  </TableCell>
                  <TableCell align="left">
                    {row.isPaid
                      ? moment(row.paidAt).calendar()
                      : moment(row.createdAt).calendar()}
                  </TableCell>
                  <TableCell align="left">${row.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default OrderList;
