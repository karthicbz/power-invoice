import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MaterialButton from './Button';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BoxModal({open, handleClose, customerName, handleDelete}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {customerName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you really want to delete this customer?
          </Typography>
          <div style={{display:'flex', gap:'8px', marginTop:'8px'}}>
            <MaterialButton variant="outlined" text="Delete" handleFunction={handleDelete}/>
            <MaterialButton variant="outlined" text="Cancel" handleFunction={handleClose}/>
          </div>
        </Box>
      </Modal>
    </div>
  );
}