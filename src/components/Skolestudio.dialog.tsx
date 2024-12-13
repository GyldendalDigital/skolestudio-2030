import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Content } from "../data/types";
import { CardMedia } from "@mui/material";
import { placeholderImageUrl } from "../utils";

type Props = {
  content: Content | null;
  handleClose: () => void;
};

export default function SkolestudioDialog({ content, handleClose }: Props) {
  if (content === null) {
    return null;
  }
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="lg"
      sx={{ minWidth: "320px" }}
    >
      <CardMedia
        component="img"
        sx={{ height: 280 }}
        image={placeholderImageUrl(content.title)}
        alt="Versågod, Ola 🧐"
      />
      <DialogTitle>{content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content.description}</DialogContentText>
        <DialogContentText
          dangerouslySetInnerHTML={{ __html: content.body ?? "" }}
        />
        <CardMedia
          component="img"
          sx={{ height: 280, borderRadius: "16px" }}
          image={placeholderImageUrl(content.description)}
          alt="Versågod, Ola 🧐"
        />
        <DialogContentText
          dangerouslySetInnerHTML={{ __html: content.body ?? "" }}
        />
        <CardMedia
          component="img"
          sx={{ height: 280, borderRadius: "16px" }}
          image={placeholderImageUrl(content.title + content.title)}
          alt="Versågod, Ola 🧐"
        />
        <DialogContentText
          dangerouslySetInnerHTML={{ __html: content.body ?? "" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Gå til innholdet</Button>
      </DialogActions>
    </Dialog>
  );
}
