import { useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { mongoDBApi } from "../../Utils/axios";
import Alert from "@mui/material/Alert";
import useToken from "../../Utils/Token";

function Login(value) {
  const { pageAction } = value;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState("");

  const { saveToken, saveUser } = useToken();

  const onLogin = async (data) => {
    try {
      const response = await mongoDBApi.post(`users/login`, data);
      saveToken(response.data.token);

      saveUser(response.data.data);

      if (pageAction === true) {
        window.location.replace(`/shipping`);
      } else {
        window.location.replace(`/`);
      }
    } catch (error) {
      if (error.response.status == 401) {
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  onLogin({
                    email,
                    password,
                  })
                }
              >
                login
              </Button>
            </form>

            <Link to="/register">
              <Typography sx={{ color: grey[600], mb: "1rem" }}>
                Create Account
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
