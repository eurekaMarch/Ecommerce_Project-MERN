import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { mongoDBApi } from "../../Utils/axios";
import Alert from "@mui/material/Alert";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState("");
  const navigate = useNavigate();

  const onRegister = async (data) => {
    try {
      await mongoDBApi.post(`users/register`, data);
      navigate(`/login`);
    } catch (error) {
      if (error.response.status == 500) {
        setAlertData({
          text: error.response.data.message.join(", "),
          type: "error",
        });
      } else if (error.response.status == 400) {
        setAlertData({
          text: error.response.data.error,
          type: "error",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: "2.5rem",
        flexGrow: 1,
      }}
    >
      {alertData.text && (
        <div>
          <Alert
            severity={alertData.type}
            sx={{
              mx: "1rem",
              mb: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {alertData.text}
          </Alert>
        </div>
      )}
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
            <form>
              <InputBase
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  pt: "2rem",
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  pt: "2rem",
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
                onClick={() =>
                  onRegister({
                    username: name,
                    email,
                    password,
                  })
                }
              >
                Register
              </Button>
            </form>

            <Link to="/login">
              <Typography sx={{ color: grey[600], mb: "1rem" }}>
                I Have Account <strong>Login</strong>
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
