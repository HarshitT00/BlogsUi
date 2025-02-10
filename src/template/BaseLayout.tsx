import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface BaseLayoutProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ header, body }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} paddingLeft={10} onClick={() => navigate("/blogs")}>
            Blogs
          </Typography>

          {userName ? (
            <>
              <Typography variant="h6" sx={{ marginRight: 2 }}>{userName}</Typography>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar sx={{ bgcolor: "white", color: "black" }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <StyledButton color="inherit" onClick={() => navigate("/login")}>Sign In</StyledButton>
              <StyledButton color="inherit" onClick={() => navigate("/sign-up")}>Sign Up</StyledButton>
            </>
          )}
        </StyledToolbar>
      </StyledAppBar>
    
      <main>
        <div>{header}</div>
        <div>{body}</div>
      </main>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)({
  height: "15vh",
  display: "flex",
  justifyContent: "center",
});

const StyledToolbar = styled(Toolbar)({
  minHeight: "15vh",
  paddingRight: "10vw !important",
});

const StyledButton = styled(Button)({
  fontSize: "1rem",
});
