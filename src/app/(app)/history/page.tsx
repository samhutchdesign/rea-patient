'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { getCompletionHistory } from '@/lib/completionStore';

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function HistoryPage() {
  const history = getCompletionHistory().reverse();
  const streak = history.filter((h) => h.count === h.total).length;
  const totalCompleted = history.reduce((acc, h) => acc + h.count, 0);
  const totalPossible = history.reduce((acc, h) => acc + h.total, 0);
  const adherence = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>History</Typography>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', py: '16px !important' }}>
            <Typography variant="h4" fontWeight={700} color="primary">{streak}</Typography>
            <Typography variant="caption" color="text.secondary">Day streak 🔥</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', py: '16px !important' }}>
            <Typography variant="h4" fontWeight={700} color="primary">{adherence}%</Typography>
            <Typography variant="caption" color="text.secondary">Adherence</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', py: '16px !important' }}>
            <Typography variant="h4" fontWeight={700} color="primary">{totalCompleted}</Typography>
            <Typography variant="caption" color="text.secondary">Exercises done</Typography>
          </CardContent>
        </Card>
      </Box>

      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
        Session log
      </Typography>
      <Card sx={{ mt: 1 }}>
        {history.length === 0 ? (
          <CardContent>
            <Typography variant="body2" color="text.secondary">No sessions logged yet. Complete your first session today!</Typography>
          </CardContent>
        ) : (
          history.map((entry, i) => {
            const full = entry.count === entry.total;
            return (
              <Box key={entry.date} sx={{ px: 2, py: 1.5, borderBottom: i < history.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                  {full
                    ? <CheckCircleRoundedIcon sx={{ fontSize: 18, color: 'success.main', flexShrink: 0 }} />
                    : <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />}
                  <Typography variant="body2" fontWeight={500}>{formatDate(entry.date)}</Typography>
                  <Box sx={{ ml: 'auto' }}>
                    <Chip
                      label={full ? 'Complete' : `${entry.count}/${entry.total}`}
                      size="small"
                      sx={{
                        bgcolor: full ? 'rgba(46,125,50,0.12)' : 'action.hover',
                        color: full ? 'success.main' : 'text.secondary',
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    />
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.round((entry.count / entry.total) * 100)}
                  sx={{ height: 4, borderRadius: 2, bgcolor: 'action.hover', ml: 3.5, '& .MuiLinearProgress-bar': { borderRadius: 2, bgcolor: full ? 'success.main' : 'primary.main' } }}
                />
              </Box>
            );
          })
        )}
      </Card>
    </Box>
  );
}
