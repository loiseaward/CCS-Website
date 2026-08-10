import { Header } from "../components/Header.jsx";
import { useAdmin } from "../features/auth/AdminContext.jsx";
import '../styles/index.css';
import welcome from "../assets/welcome.jpg";
import FormPopup from "../components/Popups.jsx"
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const resourceLinks = [{
url: "https://drive.google.com/drive/u/0/folders/0ACCvP0Atflf9Uk9PVA",
title: "Master Google Drive", 
}, {
  url: "https://nd.qualtrics.com/jfe/form/SV_9SRtKEKlqbzrInc",
  title: "Reimbursement Form",
}, {
  url: "https://docs.google.com/document/d/1uOkWtD1QrgiDtePB19_VN8n_IqbxvwzHfJJS6caoGa0/edit?tab=t.0",
  title:"Meeting Notes"
}, {
  url: "https://docs.google.com/spreadsheets/d/1Oo7HXJWD9Ff-21-zKh2rI4k-K3JcWbBBLzvB9MhtKA4/edit",
  title: "Storage Inventory",
}, 
{
  url: "https://drive.google.com/drive/u/0/folders/1XyJRhgIEkzqmX7jiHvbf7aBQB0z50gpb",
  title: "Media",
}, ]

function PdfUploader({ onUploaded }) {
  const [formData, setFormData] = useState({
    file_name: '',
    uploaded_at: dayjs(),
    pdfFile: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData((prev) => ({ ...prev, pdfFile: file }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = () => {
    // apppend to formData and send formData to a backend here
    const dataForm = new FormData();
    dataForm.append('name', formData.file_name);
    dataForm.append('pdf', formData.pdfFile);

    // Convert back into date string format "YYYY-MM-DD"
    if (formData.uploaded_at && formData.uploaded_at.isValid()) {
      dataForm.append('date', formData.uploaded_at.format('YYYY-MM-DD'));
    }

    console.log('Submitting obj FormData:', formData);
    console.log(Object.fromEntries(dataForm.entries()));
    onUploaded?.();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ width: '100%',
        maxWidth: 400,
        mx: 'auto',
        my: 3,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff8ea', }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Upload Wecap Details
        </Typography>

        {/* File Name Input */}
        <TextField
          label="Wecap Title Name"
          variant="outlined"
          value={formData.file_name}
          onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
        />

        {/* Date Picker */}
        <DatePicker
          label="Select Date"
          value={formData.uploaded_at}
          onChange={(newDate) => setFormData({ ...formData, uploaded_at: newDate })}
          slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
        />

        {/* PDF File Uploader */}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ 
          backgroundColor: '#84211b', // Your custom hex color
          '&:hover': {
            backgroundColor: '#722622', // Darker shade for the hover effect
          },
        }}
        >
          Upload Wecap PDF
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {/* Display selected file name */}
        {formData.pdfFile && (
          <Typography variant="body2" color="text.secondary">
            Selected File: {formData.pdfFile.name}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.pdfFile || !formData.file_name || !formData.uploaded_at}
          sx={{ 
          backgroundColor: '#9f1d16', // Your custom hex color
          '&:hover': {
            backgroundColor: '#9f1d16', // Darker shade for the hover effect
          },
        }}
        >
          Upload
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}

async function addAdmin (email, name){
  console.log("Admin added", email, name)
  const payload = { email: email, name: name };
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    try {
      // POST request
      const response = await fetch(`${apiUrl}/api/add-admin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Converts object to string
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message || 'Admin saved successfully!');
      } else {
        console.error(data.error || 'Server returned an error.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
}

async function deleteAdmin (email, name) {
  //console.log("Admin Deleted:", email, name);
  const payload = { email: email, name: name };
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    try {
      // POST request
      const response = await fetch(`${apiUrl}/api/delete-admin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Converts object to string
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message || 'Admin deleted successfully!');
      } else {
        console.error(data.error || 'Server returned an error.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
}

const ResourceCards = (props) => {
  return(
    <a
      href={props.link || null}
      className="simple-font flex min-h-24 text-lg items-center justify-center border border-[#dfc286] bg-[#f2e8d5] px-4 py-5 text-center text-sm font-semibold text-[#331a11] shadow-[0_6px_14px_rgba(63,30,20,0.08)] transition hover:-translate-y-0.5 hover:border-[#84211b] hover:bg-[#fff8ea] hover:text-[#84211b]"
    >
      {props.resourceName}
    </a>
  )
}

export const Dashboard = () => {
  const { adminEmail, adminName, logoutAdmin } = useAdmin();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [adminListOpen, setAdminListOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(false);
  const [adminsError, setAdminsError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const openAdminList = async () => {
    setAdminListOpen(true);
    setAdminsLoading(true);
    setAdminsError('');

    try {
      const response = await fetch(`${apiUrl}/api/admins`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (!response.ok) {
        setAdmins([]);
        setAdminsError(data.error || 'Unable to load admins');
        return;
      }

      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Failed to load admins:', error);
      setAdmins([]);
      setAdminsError('Network error while loading admins');
    } finally {
      setAdminsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2e8d5]">
        <Header title="CCS Dashboard" subtitle="CCS Admin Resources" />
        <main className="mx-auto grid max-w-8xl gap-4 px-6 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="flex flex-col justify-between border border-[#dfc286] bg-[#fff8ea] p-8 shadow-[0_14px_35px_rgba(63,30,20,0.10)]">
            <div>
              <h1 className="nice-font text-center text-4xl !font-bold leading-tight text-[#84211b] md:text-5xl mt-5">
                Welcome <br/> to the CCS Dashboard!
              </h1>
              <img src={welcome} className='h-50 md:h-70 lg:80 mx-auto object-cover mt-10 mb-10'/>
              <div className="mt-8 border-l-4 border-[#cd9b55] pl-5">
                <p className="simple-font text-3xl !font-semibold text-[#331a11]">
                  {adminName || "CCS Board Member"}
                </p>
                <p className="simple-font mt-2 text-sm tracking-wide text-neutral-600">
                  {adminEmail || "ccs@nd.edu"}
                </p>
              </div>
            </div>
              <button
                type="button"
                onClick={logoutAdmin}
                className="simple-font mt-10 w-fit border border-[#84211b] bg-[#84211b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6f1b16]"
              >
                Log out
              </button>
          </section>
          <div className="flex h-full flex-col border border-[#dfc286] bg-[#fff8ea]/70 p-6 shadow-[0_14px_35px_rgba(63,30,20,0.10)]">
            <h2 className="nice-font mb-5 border-b border-[#dfc286] pb-4 text-3xl !font-bold text-[#200c0b]">
              CCS Board Resources
            </h2>
            <section className="grid flex-1 grid-rows-[3fr_1fr_1fr] gap-3">
              <div className="group border border-[#dfc286] bg-[#fff8ea] p-6">
                <h2 className="nice-font text-xl !font-semibold text-[#84211b]">Links, Drives, More</h2>
                <div className='mt-5 grid gap-4 sm:grid-cols-3'>
                  {resourceLinks.map((source) => (<ResourceCards key={source.title} link={source.url} resourceName={source.title}/>))}
                </div>
              </div>
              <div className="group border border-[#dfc286] bg-[#fff8ea] p-6">
                <h2 className="nice-font text-xl !font-semibold text-[#84211b]">Upload Wecaps</h2>
                <button
                  type="button"
                  onClick={() => setUploadOpen(true)}
                  className="simple-font mt-10 w-fit border border-[#84211b] bg-[#84211b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6f1b16]"
                >
                  Upload
                </button>
              </div>
              <div className="group border border-[#dfc286] bg-[#fff8ea] p-6">
                <h2 className="nice-font text-xl !font-semibold text-[#84211b]">Manage CCS Admin</h2>
                <div className='flex flex-row flex-wrap gap-4'>
                  <div className="pt-5">
                    <Button
                      variant="contained"
                      onClick={openAdminList}
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
                      View CCS Admins
                    </Button>
                  </div>
                  <FormPopup function={addAdmin} type="add"/>
                  <FormPopup function={deleteAdmin} type="remove"/>

                </div>
              </div>
            </section>
          </div>
        </main>
        <Dialog
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          fullWidth
          maxWidth="md"
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
            Upload Wecap
          </DialogTitle>
          <DialogContent sx={{ padding: 0 }}>
            <PdfUploader onUploaded={() => setUploadOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={adminListOpen}
          onClose={() => setAdminListOpen(false)}
          fullWidth
          maxWidth="sm"
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
            Current CCS Admins
          </DialogTitle>
          <DialogContent sx={{ padding: '24px' }}>
            {adminsLoading && (
              <p className="simple-font text-[#331a11]">Loading admins...</p>
            )}
            {!adminsLoading && adminsError && (
              <p className="simple-font text-[#84211b]">{adminsError}</p>
            )}
            {!adminsLoading && !adminsError && admins.length === 0 && (
              <p className="simple-font text-[#331a11]">No admins found.</p>
            )}
            {!adminsLoading && !adminsError && admins.length > 0 && (
              <div className="divide-y divide-[#dfc286] border border-[#dfc286]">
                {admins.map((admin) => (
                  <div key={admin.email} className="bg-[#f2e8d5] px-4 py-3">
                    <p className="simple-font text-base font-semibold text-[#331a11]">{admin.name}</p>
                    <p className="simple-font text-sm text-neutral-600">{admin.email}</p>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid #dfc286', padding: '16px 24px 22px' }}>
            <Button
              onClick={() => setAdminListOpen(false)}
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
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};
