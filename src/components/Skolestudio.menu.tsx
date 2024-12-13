import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import UserIcon from "@mui/icons-material/Person";
import { IconButton, Menu } from "@mui/material";

export default function SkolestudioMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        aria-label="Dine valg"
        onClick={handleClick}
      >
        <UserIcon sx={{ width: "40px", height: "40px" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Her</MenuItem>
        <MenuItem onClick={handleClose}>gjemmer</MenuItem>
        <MenuItem onClick={handleClose}>vi</MenuItem>
        <MenuItem onClick={handleClose}>alle</MenuItem>
        <MenuItem onClick={handleClose}>features</MenuItem>
        <MenuItem onClick={handleClose}>som</MenuItem>
        <MenuItem onClick={handleClose}>ikke</MenuItem>
        <MenuItem onClick={handleClose}>er</MenuItem>
        <MenuItem onClick={handleClose}>innhold.</MenuItem>
      </Menu>
    </div>
  );
}
