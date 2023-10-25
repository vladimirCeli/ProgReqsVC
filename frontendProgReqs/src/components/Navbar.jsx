import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon"; // Import ListItemIcon
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Logo } from "./Logo";
import useAuth from "../hooks/useAuth";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const [userRoles, setUserRoles] = useState(null);
  const [usern, setUsern] = useState(null);

  useEffect(() => {
    const fetchAuthInfo = async () => {
      if (auth) {
        await setUserRoles(auth.roles);
        await setUsern(auth.username);
      }
    };
    fetchAuthInfo();
  }, [auth]);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "black",
            }}
          >
            <Typography>
              <Logo width={80} height={60} />
            </Typography>
          </Link>
          {usern ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    color="inherit"
                    onClick={() => {
                      navigate("/projects/new");
                      handleCloseNavMenu();
                    }}
                    sx={{ fontWeight: 600 }}
                  >
                    Nuevo proyecto
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <></>
          )}
          {usern ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => {
                    navigate("/projects/new");
                    handleCloseNavMenu();
                  }}
                  sx={{ fontWeight: 600, marginLeft: "1rem" }}
                >
                  <ListItemIcon> 
                  Nuevo proyecto
                  </ListItemIcon>
                  
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    {usern}
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar sx={{ marginLeft: "1rem" }} />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ fontWeight: 600, marginLeft: "1rem" }}
                >
                  {userRoles === 1 && (
                    <MenuItem
                      color="inherit"
                      onClick={() => {
                        navigate("/managequestionnaire");
                        handleMenuClose();
                      }}
                      sx={{ fontWeight: 600 }}
                    >
                      Gestionar Cuestionarios
                    </MenuItem>
                  )}
                  {userRoles === 1 && (
                    <MenuItem
                      color="inherit"
                      onClick={() => {
                        navigate("/categoriesecurity");
                        handleMenuClose();
                      }}
                      sx={{ fontWeight: 600 }}
                    >
                      Gestionar requerimientos
                    </MenuItem>
                  )}
                  <MenuItem
                    color="inherit"
                    onClick={() => {
                      navigate("/listsprojects");
                      handleMenuClose();
                    }}
                    sx={{ fontWeight: 600 }}
                  >
                    Mis Proyectos
                  </MenuItem>
                  <MenuItem
                    color="inherit"
                    onClick={() => {
                      signOut();
                      handleMenuClose();
                    }}
                    sx={{ fontWeight: 600, color: "red" }}
                  >
                    Cerrar Sesión
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
