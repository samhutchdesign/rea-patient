'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useThemeMode, setThemeMode } from '@/lib/themeStore';

export default function SettingsPage() {
  const mode = useThemeMode();
  const [exerciseReminders, setExerciseReminders] = useState(true);
  const [programUpdates, setProgramUpdates] = useState(true);
  const [email, setEmail] = useState('margaret.chen@email.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const handleEmailSave = () => {
    setSnackMsg('Email updated.'); setSnackOpen(true);
  };
  const handlePasswordSave = () => {
    if (!password || password !== confirmPassword) return;
    setPassword(''); setConfirmPassword('');
    setSnackMsg('Password updated.'); setSnackOpen(true);
  };

  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Settings</Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ pb: '16px !important' }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Notifications</Typography>
          <FormControlLabel
            control={<Switch checked={exerciseReminders} onChange={(e) => setExerciseReminders(e.target.checked)} size="small" />}
            label={<Typography variant="body2">Daily exercise reminders</Typography>}
            sx={{ display: 'flex', mb: 0.5 }}
          />
          <FormControlLabel
            control={<Switch checked={programUpdates} onChange={(e) => setProgramUpdates(e.target.checked)} size="small" />}
            label={<Typography variant="body2">Program update alerts</Typography>}
            sx={{ display: 'flex' }}
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Appearance</Typography>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={(e) => setThemeMode(e.target.checked ? 'dark' : 'light')} size="small" />}
            label={<Typography variant="body2">Dark mode</Typography>}
            sx={{ display: 'flex' }}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ pb: '16px !important' }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Update Email</Typography>
          <TextField label="Email address" size="small" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 1.5 }} />
          <Button variant="contained" size="small" disableElevation onClick={handleEmailSave}>Update Email</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ pb: '16px !important' }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Change Password</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField label="New password" size="small" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField
              label="Confirm new password"
              size="small" fullWidth type="password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPassword && password !== confirmPassword}
              helperText={confirmPassword && password !== confirmPassword ? "Passwords don't match" : ''}
            />
            <Button variant="contained" size="small" disableElevation onClick={handlePasswordSave} disabled={!password || password !== confirmPassword}>
              Update Password
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSnackOpen(false)}>{snackMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
