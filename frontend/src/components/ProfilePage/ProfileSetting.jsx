import { useState } from "react";
import { mongoDBApi } from "../../Utils/axios";
import Grid from "@mui/material/Unstable_Grid2";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import { grey, red } from "@mui/material/colors";
import useToken from "../../Utils/Token";

function ProfileSetting() {
  const { saveToken, saveUser, token, user } = useToken();

  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertPassword, setAlertPassword] = useState("");
  const [alertData, setAlertData] = useState("");
  const [open, setOpen] = useState(false);

  const updateHandler = async (data) => {
    setOpen(true);

    if (password !== confirmPassword) {
      setAlertPassword({
        text: "Password does not match",
        type: "error",
      });
    } else {
      try {
        const response = await mongoDBApi.put(`users/profile`, data, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        if (response.data.success) {
          setAlertData({
            text: "Profile Updated",
            type: "success",
          });

          saveToken(response.data.token);
          saveUser(response.data.data);

          setTimeout(() => {
            window.location.replace(`/profile`);
          }, 2000);
        }
      } catch (error) {
        if (error.response.status == 404) {
          setAlertData({
            text: error.response.data.error,
            type: "error",
          });
        }
      }
    }
  };

  return (
    <Box>
      {alertData.text && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Box>
            <Alert
              severity={alertData.type}
              variant="outlined"
              sx={{
                py: "2rem",
                display: "flex",
                justifyContent: "center",
                width: "30rem",
                bgcolor: "white",
                border: "none",
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                boxShadow: 10,
              }}
            >
              {alertData.text}
            </Alert>
            <LinearProgress color="green" sx={{ height: "0.5rem" }} />
          </Box>
        </Snackbar>
      )}
      <Grid container xs={12} sm={12} md={12}>
        <Grid xs={12} sm={6} md={6} sx={{ mb: "4rem" }}>
          <Typography sx={{ color: grey[600] }}>USERNAME</Typography>

          <InputBase
            type="text"
            // placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              pt: "1rem",
              pr: { xs: 0, sm: "2rem" },
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
        </Grid>

        <Grid xs={12} sm={6} md={6} sx={{ mb: "4rem" }}>
          <Typography sx={{ color: grey[600] }}>E-MAIL ADDRESS</Typography>

          <InputBase
            type="email"
            // placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              pt: "1rem",
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
        </Grid>

        <Grid xs={12} sm={6} md={6} sx={{ mb: "4rem" }}>
          <Typography sx={{ color: grey[600] }}>PASSWORD</Typography>

          <InputBase
            type="password"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              pt: "1rem",
              pr: { xs: 0, sm: "2rem" },
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
        </Grid>

        <Grid xs={12} sm={6} md={6} sx={{ mb: "4rem" }}>
          {alertPassword.text ? (
            <Alert
              severity={alertPassword.type}
              sx={{
                p: 0,
                mt: "-1.2rem",
                bgcolor: "transparent",
                color: red[500],
                fontSize: "1.2rem",
              }}
            >
              {alertPassword.text}
            </Alert>
          ) : (
            <Typography sx={{ color: grey[600] }}>CONFIRM PASSWORD</Typography>
          )}

          <InputBase
            type="password"
            // placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              pt: "1rem",
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
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="green"
          size="normal"
          sx={{ width: "30rem", mt: "1.5rem", fontSize: "1.6rem", py: "1rem" }}
          onClick={() =>
            updateHandler({
              username: name,
              email,
              password,
            })
          }
        >
          Update Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileSetting;
