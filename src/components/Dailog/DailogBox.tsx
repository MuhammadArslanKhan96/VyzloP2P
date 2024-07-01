import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";

const AlertDialogSlide = ({
  open,
  text,
  onClose,
}: {
  open: boolean;
  text: string;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <Typography>{text}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialogSlide;
