'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mockPatient } from '@/lib/mock-data';

export default function ProfilePage() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: mockPatient.firstName,
    lastName: mockPatient.lastName,
    email: mockPatient.email,
    phone: mockPatient.phone,
    address: mockPatient.address,
  });

  const handleSave = () => {
    setEditing(false);
    setSnackOpen(true);
  };

  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Profile</Typography>

      {/* Avatar + name */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700, fontSize: 26, mb: 1.5 }}>
          {mockPatient.avatarInitials}
        </Avatar>
        <Typography variant="h6" fontWeight={700}>{form.firstName} {form.lastName}</Typography>
        <Typography variant="caption" color="text.secondary">{mockPatient.condition}</Typography>
      </Box>

      {/* Contact info */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={600}>Contact Info</Typography>
        {!editing && (
          <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => setEditing(true)}>Edit</Button>
        )}
      </Box>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: '16px !important' }}>
          {editing ? (
            <>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <TextField label="First Name" size="small" fullWidth value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
                <TextField label="Last Name" size="small" fullWidth value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
              </Box>
              <TextField label="Email" size="small" fullWidth type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              <TextField label="Phone" size="small" fullWidth value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
              <TextField label="Address" size="small" fullWidth value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button size="small" onClick={() => setEditing(false)}>Cancel</Button>
                <Button size="small" variant="contained" disableElevation onClick={handleSave}>Save</Button>
              </Box>
            </>
          ) : (
            <>
              {[['Email', form.email], ['Phone', form.phone], ['Address', form.address]].map(([label, val]) => (
                <Box key={label}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>{label}</Typography>
                  <Typography variant="body2">{val}</Typography>
                </Box>
              ))}
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick links */}
      <Card>
        {[
          { label: 'My Care Team', icon: PersonOutlinedIcon, href: '/physio' },
          { label: 'Clinic Info', icon: BusinessOutlinedIcon, href: '/clinic' },
        ].map(({ label, icon: Icon, href }, i) => (
          <Box key={href}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.75, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
              onClick={() => router.push(href)}
            >
              <Icon sx={{ color: 'primary.main', fontSize: 22 }} />
              <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>{label}</Typography>
              <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            </Box>
            {i === 0 && <Divider />}
          </Box>
        ))}
        <Divider />
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.75, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
          onClick={() => router.push('/settings')}
        >
          <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1, color: 'text.secondary' }}>Settings</Typography>
          <ChevronRightIcon sx={{ color: 'text.secondary' }} />
        </Box>
      </Card>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSnackOpen(false)} sx={{ width: '100%' }}>Profile updated.</Alert>
      </Snackbar>
    </Box>
  );
}
