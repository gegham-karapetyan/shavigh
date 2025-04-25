import { Box, IconButton, Modal, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Fragment, useState } from "react";

import RichTextEditor from "../../Editor/RichTextEditor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 1100,
  overflowY: "auto",
  maxHeight: "80vh",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
};

export const PageSettings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RichTextEditor namespace="home" defaultValue="<h1>Hi there</h1>" />
        </Box>
      </Modal>
    </Fragment>
  );
};
