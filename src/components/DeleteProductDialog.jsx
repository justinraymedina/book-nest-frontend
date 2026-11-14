import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function DeleteProductDialog({ open, onClose, onConfirm, product }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product?</DialogTitle>
      <DialogContent><Typography>Are you sure you want to delete "{product?.name}"?</Typography></DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}