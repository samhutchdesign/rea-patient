'use client';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import { mockPatient, mockPhysio, mockProgram, mockExercises } from '@/lib/mock-data';
import { useCompleted, toggleComplete } from '@/lib/completionStore';

const TODAY = '2026-06-02';

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function TodayPage() {
  const router = useRouter();
  const completed = useCompleted(TODAY);
  const exercises = mockProgram.exercises.map((pe) => ({
    pe,
    ex: mockExercises.find((e) => e.id === pe.exerciseId)!,
  }));
  const doneCount = exercises.filter(({ ex }) => completed.has(ex.id)).length;
  const progress = Math.round((doneCount / exercises.length) * 100);
  const allDone = doneCount === exercises.length;

  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Good morning,</Typography>
          <Typography variant="h5" fontWeight={700} color="primary">{mockPatient.firstName} 👋</Typography>
          <Typography variant="caption" color="text.secondary">{formatDate(TODAY)}</Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700, width: 44, height: 44 }}>
          {mockPatient.avatarInitials}
        </Avatar>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ pb: '16px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              {allDone ? 'All done for today! 🎉' : `Today's Progress`}
            </Typography>
            <Typography variant="body2" color="text.secondary">{doneCount} / {exercises.length}</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { borderRadius: 4 } }}
          />
          {allDone && (
            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1, fontWeight: 500 }}>
              Great work! Your streak continues.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
        {mockProgram.name}
      </Typography>
      <Card sx={{ mt: 1 }}>
        {exercises.map(({ pe, ex }, i) => {
          const done = completed.has(ex.id);
          return (
            <Box key={ex.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5 }}>
                <Checkbox
                  checked={done}
                  onChange={() => toggleComplete(TODAY, ex.id)}
                  icon={<RadioButtonUncheckedRoundedIcon />}
                  checkedIcon={<CheckCircleRoundedIcon />}
                  sx={{ p: 0.5, color: 'text.secondary', '&.Mui-checked': { color: 'success.main' } }}
                />
                <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push(`/program/${ex.id}`)}>
                  <Typography variant="body2" fontWeight={600} sx={{ textDecoration: done ? 'line-through' : 'none', color: done ? 'text.secondary' : 'text.primary' }}>
                    {ex.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {pe.sets} sets · {pe.reps} reps{pe.holdSecs > 0 ? ` · ${pe.holdSecs}s hold` : ''}
                  </Typography>
                </Box>
                <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FitnessCenterRoundedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                </Box>
              </Box>
              {i < exercises.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Card>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
        Tap an exercise to view details or leave a note for {mockPhysio.firstName}.
      </Typography>
    </Box>
  );
}
