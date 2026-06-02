'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import { mockPatient, mockPhysio, mockProgram, mockExercises } from '@/lib/mock-data';
import { useCompleted, toggleComplete } from '@/lib/completionStore';

const TODAY = '2026-06-02';

const CONFETTI_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF', '#FF9F1C'];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning,';
  if (hour >= 12 && hour < 17) return 'Good afternoon,';
  if (hour >= 17 && hour < 21) return 'Good evening,';
  return 'Good night,';
}

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function TodayPage() {
  const router = useRouter();
  const completed = useCompleted(TODAY);
  const [celebrating, setCelebrating] = useState(false);
  const prevAllDone = useRef(false);
  const hasShownCelebration = useRef(false);

  const exercises = mockProgram.exercises.map((pe) => ({
    pe,
    ex: mockExercises.find((e) => e.id === pe.exerciseId)!,
  }));
  const doneCount = exercises.filter(({ ex }) => completed.has(ex.id)).length;
  const progress = Math.round((doneCount / exercises.length) * 100);
  const allDone = doneCount === exercises.length;

  useEffect(() => {
    if (allDone && !prevAllDone.current && !hasShownCelebration.current) {
      setCelebrating(true);
      hasShownCelebration.current = true;
    }
    prevAllDone.current = allDone;
  }, [allDone]);

  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      {/* Header — no avatar */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>{getGreeting()}</Typography>
        <Typography variant="h5" fontWeight={700} color="primary">{mockPatient.firstName} 👋</Typography>
        <Typography variant="caption" color="text.secondary">{formatDate(TODAY)}</Typography>
      </Box>

      {/* Progress card */}
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

      {/* Exercise list */}
      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
        {mockProgram.name}
      </Typography>
      <Card sx={{ mt: 1, mb: 3 }}>
        {exercises.map(({ pe, ex }, i) => {
          const done = completed.has(ex.id);
          return (
            <Box key={ex.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1 }}>
                <Checkbox
                  checked={done}
                  onChange={() => toggleComplete(TODAY, ex.id)}
                  icon={<RadioButtonUncheckedRoundedIcon sx={{ fontSize: 28 }} />}
                  checkedIcon={<CheckCircleRoundedIcon sx={{ fontSize: 28 }} />}
                  sx={{ p: 1, color: 'text.secondary', '&.Mui-checked': { color: 'success.main' } }}
                />
                <Box sx={{ flexGrow: 1, cursor: 'pointer', py: 0.5 }} onClick={() => router.push(`/program/${ex.id}`)}>
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

      {/* Goal card — bottom */}
      {mockPatient.goal && (
        <Card sx={{ mb: 2, bgcolor: 'primary.light' }}>
          <CardContent sx={{ pb: '14px !important', pt: '14px !important' }}>
            <Typography variant="caption" color="primary.main" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
              🎯 Your Goal
            </Typography>
            <Typography variant="body2" fontWeight={500}>{mockPatient.goal}</Typography>
          </CardContent>
        </Card>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
        Tap an exercise to view details or leave a note for {mockPhysio.firstName}.
      </Typography>

      {/* Confetti celebration modal */}
      <Dialog
        open={celebrating}
        onClose={() => setCelebrating(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4, px: 3, position: 'relative', overflow: 'hidden' }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: -8,
                left: `${(i * 43 + 7) % 100}%`,
                width: 8 + (i % 3) * 3,
                height: 8 + (i % 3) * 3,
                bgcolor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                borderRadius: i % 2 === 0 ? '50%' : '2px',
                opacity: 0,
                animation: `cfall ${1.0 + (i % 6) * 0.22}s ${(i * 0.07).toFixed(2)}s ease-in both`,
              }}
            />
          ))}
          <Typography sx={{ fontSize: 52, lineHeight: 1, mb: 1.5 }}>🎉</Typography>
          <Typography variant="h6" fontWeight={700} mb={1}>
            You completed ALL exercises today!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Amazing work, {mockPatient.firstName}. Every rep gets you closer to your goal.
          </Typography>
          <Button variant="contained" disableElevation onClick={() => setCelebrating(false)} fullWidth sx={{ borderRadius: 2 }}>
            Keep it up! 💪
          </Button>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes cfall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(340px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </Box>
  );
}
