import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QRIcon } from "../assets/SocialIcons";

export const QRCodeModalButton = ({ url }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="px-4 py-2 flex gap-3 items-center text-white bg-blue-500 rounded-md transition-all hover:bg-blue-400"
      >
        <QRIcon />
        <span className="hidden md:inline-block">Scan QRCode</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Scan this QR Code"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <QRCodeSVG
              value={url}
              size={256}
              //   bgColor={"#ffffff"}
              //   fgColor={"#000000"}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
