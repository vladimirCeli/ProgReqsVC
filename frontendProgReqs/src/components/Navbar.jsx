import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useNavigate } from "react-router-dom";
import useLogout from '../hooks/useLogout'
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {Logo} from './Logo'
import useAuth from '../hooks/useAuth'
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

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
    }
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

  return (
    <AppBar position="static" color="transparent">
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/projects/new")}
              sx={{ fontWeight: 600, marginLeft: "1rem" }}
            >
              Nuevo proyecto
            </Button>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ marginLeft: "1rem" }}
            >
              {usern}
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar sx={{ marginLeft: "1rem" }} />
              </StyledBadge>
            </Button>
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
              getContentAnchorEl={null}
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
                startIcon={<ExitToAppIcon />}
                sx={{ fontWeight: 600, color: "red" }}
              >
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
           
          </>
        )}
      
    </Toolbar>
  </AppBar>
  );
}

export default Navbar