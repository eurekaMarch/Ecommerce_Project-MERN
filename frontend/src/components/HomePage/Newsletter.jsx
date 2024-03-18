import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import cloth from "../../assets/cloth2.jpg";
import InputBase from "@mui/material/InputBase";

function Newsletter() {
  return (
    <Box sx={{ mt: "5rem", height: "35rem" }}>
      <Box
        sx={{
          height: "35rem",
          backgroundImage: `url(${cloth})`,
          backgroundPosition: "0% 80%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: grey[400],
          backgroundBlendMode: "multiply",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ color: "white", mb: "3rem", fontSize: "3rem" }}>
          Sign up To Our Newsletters
        </Typography>

        <Box sx={{ width: "100%" }}>
          <form>
            <InputBase
              sx={{
                width: "40%",
                input: {
                  background: "white",
                  borderRadius: 5,
                  pl: "1rem",
                  height: "3rem",
                  fontSize: "1.4rem",
                },
              }}
              type="email"
              placeholder="Your Email Address..."
              id="Newsletter__input"
            />

            <InputBase
              sx={{
                width: "8%",
                input: {
                  background: "#1CB803",
                  borderRadius: 5,
                  height: "3rem",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "white",
                  cursor: "pointer",
                  px: "4rem",
                  display: "flex",
                  justifyContent: "center",
                },
              }}
              type="submit"
              value="SUBSCRIBE"
            ></InputBase>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Newsletter;
