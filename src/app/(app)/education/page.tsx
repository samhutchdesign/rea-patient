import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { mockEducation } from '@/lib/mock-data';

export default function EducationPage() {
  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MenuBookRoundedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
        </Box>
        <Typography variant="h5" fontWeight={700}>Education</Typography>
      </Box>
      <Chip label={mockEducation.condition} size="small" sx={{ mb: 2, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 500 }} />
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>{mockEducation.summary}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockEducation.sections.map((section) => (
          <Card key={section.title}>
            <CardContent sx={{ pb: '16px !important' }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1}>{section.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{section.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
