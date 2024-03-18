import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function MenuLogin() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate(`/login`);
  };

  const handleRegister = () => {
    handleClose();
    navigate(`/register`);
  };
  return (
    <Box>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
        color="black"
        size="small"
        sx={{
          p: "0.6rem",
        }}
      >
        <i className="fa-solid fa-user"></i>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          fontSize: "1.4rem",
        }}
      >
        <MenuItem onClick={handleRegister}>REGISTER</MenuItem>
        <MenuItem onClick={handleLogin}>LOGIN</MenuItem>
      </Menu>
    </Box>
  );
}

export default MenuLogin;
