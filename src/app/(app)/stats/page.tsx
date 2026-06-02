'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { mockProgram } from '@/lib/mock-data';
import { useCompleted, useCompletionHistory, computeStreak } from '@/lib/completionStore';

const TODAY = '2026-06-02';
const BASE_YEAR = 2026;
const BASE_MONTH = 6; // June, 1-indexed
const TOTAL_EXERCISES = mockProgram.exercises.length;
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function DayCircle({ dateStr, count, isToday, isFuture }: { dateStr: string; count: number; isToday: boolean; isFuture: boolean }) {
  const day = parseInt(dateStr.split('-')[2], 10);
  const r = 13;
  const circ = 2 * Math.PI * r;
  const filled = isFuture ? 0 : (count / TOTAL_EXERCISES) * circ;
  const strokeColor = count === TOTAL_EXERCISES ? '#2E7D32' : '#6750A4';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', width: 34, height: 34 }}>
        <svg width="34" height="34" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="17" cy="17" r={r} fill="none" stroke={isFuture ? '#E0E0E0' : '#EDE7F6'} strokeWidth="2.5" />
          {!isFuture && count > 0 && (
            <circle
              cx="17" cy="17" r={r} fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeDasharray={`${filled} ${circ}`}
              strokeLinecap="round"
            />
          )}
        </svg>
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{
            fontSize: 10,
            fontWeight: isToday ? 800 : 400,
            color: isToday ? 'primary.main' : isFuture ? 'text.disabled' : 'text.primary',
            lineHeight: 1,
          }}>
            {day}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function StatsPage() {
  const history = useCompletionHistory();
  const todayCompleted = useCompleted(TODAY);
  const todayCount = todayCompleted.size;
  const streak = computeStreak(TODAY);
  const totalCompleted = history.reduce((acc, h) => acc + h.count, 0);

  const { inPersonSessionsCompleted = 3, inPersonSessionsTotal = 12 } = mockProgram;
  const sessionPct = Math.round((inPersonSessionsCompleted / inPersonSessionsTotal) * 100);

  // Month navigation (0 = current month, -1 = last month, etc.)
  const [monthOffset, setMonthOffset] = useState(0);
  const canGoForward = monthOffset < 0;
  const canGoBack = monthOffset > -11;

  // Compute displayed month
  const rawMonth = BASE_MONTH - 1 + monthOffset; // 0-indexed from Jan
  const displayYear = BASE_YEAR + Math.floor(rawMonth / 12);
  const displayMonth = ((rawMonth % 12) + 12) % 12; // 0-indexed
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayJS = new Date(displayYear, displayMonth, 1).getDay(); // 0=Sun
  const firstDayMon = (firstDayJS + 6) % 7; // Mon=0
  const monthLabel = new Date(displayYear, displayMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const monthPrefix = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}`;

  // Build history map
  const historyMap = new Map<string, number>();
  for (const entry of history) historyMap.set(entry.date, entry.count);
  historyMap.set(TODAY, todayCount);

  // Build calendar cells
  const calendarCells: (string | null)[] = [];
  for (let i = 0; i < firstDayMon; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(`${monthPrefix}-${String(d).padStart(2, '0')}`);
  }
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  return (
    <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={2.5}>Stats</Typography>

      {/* Streak — full width */}
      <Card sx={{ mb: 2, background: 'linear-gradient(135deg, #6750A4 0%, #9C6EE8 100%)', color: '#fff' }}>
        <CardContent sx={{ pb: '16px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Current Streak
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mt: 0.25 }}>
                <Typography variant="h3" fontWeight={800} sx={{ color: '#fff', lineHeight: 1 }}>{streak}</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>days 🔥</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block', mt: 0.5 }}>
                Any exercise counts — keep the chain alive!
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 48, lineHeight: 1 }}>🔥</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* In-person sessions progress */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ pb: '16px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography variant="body2" fontWeight={600}>In-Person Sessions</Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {inPersonSessionsCompleted} / {inPersonSessionsTotal}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={sessionPct}
            sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { borderRadius: 4 } }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
            {inPersonSessionsTotal - inPersonSessionsCompleted} sessions remaining with Sarah Harper
          </Typography>
        </CardContent>
      </Card>

      {/* Total exercises */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: '12px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight={600}>Total exercises completed</Typography>
            <Typography variant="h6" fontWeight={700} color="primary">{totalCompleted}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Today's entry — no icon, no title */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
            <Typography variant="body2" fontWeight={500}>{formatDate(TODAY)}</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="caption" color={todayCount === TOTAL_EXERCISES ? 'success.main' : 'text.secondary'} fontWeight={600}>
                {todayCount === TOTAL_EXERCISES ? 'Complete ✓' : `${todayCount} / ${TOTAL_EXERCISES}`}
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.round((todayCount / TOTAL_EXERCISES) * 100)}
            sx={{ height: 4, borderRadius: 2, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { borderRadius: 2, bgcolor: todayCount === TOTAL_EXERCISES ? 'success.main' : 'primary.main' } }}
          />
        </Box>
      </Card>

      {/* Monthly calendar with navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <IconButton size="small" onClick={() => setMonthOffset((o) => o - 1)} disabled={!canGoBack}>
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          {monthLabel}
        </Typography>
        <IconButton size="small" onClick={() => setMonthOffset((o) => o + 1)} disabled={!canGoForward}>
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Card>
        <CardContent sx={{ pb: '16px !important' }}>
          {/* Week day headers */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 0.5 }}>
            {WEEK_LABELS.map((w, i) => (
              <Typography key={i} variant="caption" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 600, fontSize: 10 }}>
                {w}
              </Typography>
            ))}
          </Box>
          {/* Calendar rows */}
          {Array.from({ length: calendarCells.length / 7 }).map((_, row) => (
            <Box key={row} sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.25, mb: 0.25 }}>
              {calendarCells.slice(row * 7, row * 7 + 7).map((dateStr, col) => {
                if (!dateStr) return <Box key={col} sx={{ width: 34, height: 34 }} />;
                const isToday = dateStr === TODAY;
                const isFuture = dateStr > TODAY;
                const count = historyMap.get(dateStr) ?? 0;
                return (
                  <Box key={dateStr} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DayCircle dateStr={dateStr} count={count} isToday={isToday} isFuture={isFuture} />
                  </Box>
                );
              })}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
