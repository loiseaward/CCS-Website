import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField 
} from '@mui/material';
import "../styles/index.css";

export default function FormPopup(props) {
  //pop-up visibility
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEmail('');
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload
    console.log("Submitted email:", email);
    
    // data sent to backend here either to add or delete
    props.function(email);

    handleClose();
  };

  return (
    <div className="pt-5">
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: '#84211b',
          border: '1px solid #84211b',
          borderRadius: 0,
          boxShadow: 'none',
          color: '#fff8ea',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 500,
          padding: '10px 20px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#6f1b16',
            boxShadow: 'none',
          },
        }}
      >
        {props.type === "add" ? "Add" : "Remove"} CCS Admin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#fff8ea',
              border: '1px solid #dfc286',
              borderRadius: 0,
              boxShadow: '0 18px 45px rgba(63,30,20,0.22)',
            },
          },
          backdrop: {
            sx: {
              backgroundColor: 'rgba(32, 12, 11, 0.45)',
            },
          },
        }}
      >
        <DialogTitle
          className="nice-font"
          sx={{
            borderBottom: '1px solid #dfc286',
            color: '#84211b',
            fontSize: '1.75rem',
            fontWeight: 700,
            padding: '22px 24px 16px',
          }}
        >
          {props.type === "add" ? "Add" : "Remove"} Admin Email
        </DialogTitle>

        <h3 className='simple-font m-5 mb-0'>Warning: Submitting this form will modify people with admin access</h3>
        
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ padding: '24px' }}>
            <TextField
              autoFocus
              required
              margin="dense"
              label="name@nd.edu"
              type="text"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#6b4a35',
                  fontFamily: 'Roboto, sans-serif',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#84211b',
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f2e8d5',
                  borderRadius: 0,
                  color: '#331a11',
                  fontFamily: 'Roboto, sans-serif',
                  '& fieldset': {
                    borderColor: '#dfc286',
                  },
                  '&:hover fieldset': {
                    borderColor: '#cd9b55',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#84211b',
                  },
                },
              }}
            />
          </DialogContent>
          
          <DialogActions sx={{ borderTop: '1px solid #dfc286', gap: 1.5, padding: '16px 24px 22px' }}>
            <Button
              onClick={handleClose}
              sx={{
                border: '1px solid #dfc286',
                borderRadius: 0,
                color: '#331a11',
                fontFamily: 'Roboto, sans-serif',
                padding: '8px 18px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f2e8d5',
                  borderColor: '#cd9b55',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#84211b',
                border: '1px solid #84211b',
                borderRadius: 0,
                boxShadow: 'none',
                color: '#fff8ea',
                fontFamily: 'Roboto, sans-serif',
                padding: '8px 18px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#6f1b16',
                  boxShadow: 'none',
                },
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
