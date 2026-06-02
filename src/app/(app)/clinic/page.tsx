'use client';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { mockClinic } from '@/lib/mock-data';

export default function ClinicPage() {
  const router = useRouter();
  return (
    <Box sx={{ px: 2.5, pt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton size="small" onClick={() => router.back()} sx={{ mr: 0.5 }}>
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>Clinic Info</Typography>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={700} color="primary.main">{mockClinic.logoInitials}</Typography>
          </Box>
          <Typography variant="subtitle1" fontWeight={700} mb={0.5}>{mockClinic.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>{mockClinic.description}</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {[
              { icon: LocationOnOutlinedIcon, text: mockClinic.address },
              { icon: PhoneOutlinedIcon, text: mockClinic.phone },
              { icon: EmailOutlinedIcon, text: mockClinic.email },
              { icon: LanguageOutlinedIcon, text: mockClinic.website },
            ].map(({ icon: Icon, text }) => (
              <Box key={text} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Icon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.15 }} />
                <Typography variant="body2">{text}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
