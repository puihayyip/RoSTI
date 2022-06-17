import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

function FormDialog({ open, setOpen, navigate }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (password === "123") {
      navigate("/");
    } else {
      alert("logout failed");
    }
  };

  const [password, setPassword] = useState("");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log Out?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Logging out will void this table's orders. To confirm logging out,
            please key in the correct password for table users.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;