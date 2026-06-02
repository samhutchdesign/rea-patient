'use client';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { mockPhysio, mockClinic } from '@/lib/mock-data';

export default function PhysioPage() {
  const router = useRouter();
  return (
    <Box sx={{ px: 2.5, pt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton size="small" onClick={() => router.back()} sx={{ mr: 0.5 }}>
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>My Care Team</Typography>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700, fontSize: 18 }}>
              {mockPhysio.avatarInitials}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>{mockPhysio.firstName} {mockPhysio.lastName}</Typography>
              <Typography variant="body2" color="text.secondary">{mockPhysio.credentials}</Typography>
              <Chip label={mockPhysio.title} size="small" sx={{ mt: 0.5, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 500, fontSize: 11 }} />
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>{mockPhysio.bio}</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2">{mockPhysio.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2">{mockPhysio.phone}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1, display: 'block', mt: 3, mb: 1 }}>
        Clinic
      </Typography>
      <Typography variant="body2" color="text.secondary">{mockClinic.name}</Typography>
    </Box>
  );
}
