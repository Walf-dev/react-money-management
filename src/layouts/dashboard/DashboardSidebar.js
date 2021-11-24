import PropTypes from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  Skeleton,
} from "@mui/material";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
//
import sidebarConfig from "./SidebarConfig";
import account from "../../_mocks_/account";
import { UserContext } from "../../state/contexts/contexts";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { user } = useContext(UserContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState("Email");
  const [photoURL, setPhotoURL] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (user && user.displayName) {
      setName(user.displayName);
    }
    if (user && user.email) {
      setEmail(user.email);
    }
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            {!photoURL ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar src={photoURL} alt="photoURL" />
            )}
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {!name ? (
                  <Skeleton
                    animation="wave"
                    height={10}
                    width={40}
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  name
                )}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: "relative",
            bgcolor: "grey.200",
          }}
        >
          <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: "absolute", top: -50 }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              From only $69
            </Typography>
          </Box>

          <Button
            fullWidth
            href="https://material-ui.com/store/items/minimal-dashboard/"
            target="_blank"
            variant="contained"
          >
            Upgrade to Pro
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
