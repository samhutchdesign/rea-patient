'use client';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mockProgram, mockExercises } from '@/lib/mock-data';

export default function ProgramPage() {
  const router = useRouter();
  const exercises = mockProgram.exercises.map((pe) => ({
    pe,
    ex: mockExercises.find((e) => e.id === pe.exerciseId)!,
  }));

  return (
    <Box sx={{ px: 2.5, pt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>My Program</Typography>
      <Typography variant="body2" color="text.secondary" mb={0.5}>{mockProgram.name}</Typography>
      <Typography variant="caption" color="text.secondary" mb={3} sx={{ display: 'block' }}>
        {mockProgram.description}
      </Typography>

      <Chip
        label={`${exercises.length} exercises · Daily`}
        size="small"
        sx={{ mb: 3, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 500 }}
      />

      <Card>
        {exercises.map(({ pe, ex }, i) => (
          <Box key={ex.id}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, transition: 'background 0.1s' }}
              onClick={() => router.push(`/program/${ex.id}`)}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 1.5, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FitnessCenterRoundedIcon sx={{ fontSize: 22, color: 'primary.main' }} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight={600}>{ex.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {pe.sets} sets · {pe.reps} reps{pe.holdSecs > 0 ? ` · ${pe.holdSecs}s hold` : ''} · {pe.frequency}
                </Typography>
              </Box>
              <ChevronRightIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            </Box>
            {i < exercises.length - 1 && <Divider />}
          </Box>
        ))}
      </Card>
    </Box>
  );
}
