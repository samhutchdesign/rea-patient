'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import { mockProgram, mockExercises, mockPatient, mockPhysio } from '@/lib/mock-data';
import { useNotes, addNote } from '@/lib/noteStore';
import { useCompleted, toggleComplete } from '@/lib/completionStore';

const TODAY = '2026-06-02';

function PhysioAudioCard({ note }: { note: { from: string; duration: string; transcriptPreview: string } }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) { setPlaying(false); return 0; }
        return p + 0.014;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  const waveHeights = [10, 16, 22, 14, 18, 26, 12, 20, 24, 16, 22, 10, 18, 28, 14, 20, 16, 24, 12, 18, 22, 14, 26, 10, 16, 20, 24, 12];

  return (
    <Card sx={{ mb: 2, bgcolor: 'primary.light' }}>
      <CardContent sx={{ pb: '14px !important', pt: '14px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
          <GraphicEqRoundedIcon sx={{ color: 'primary.main', fontSize: 18, flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" fontWeight={700} color="primary.main" sx={{ display: 'block', lineHeight: 1.2 }}>
              Note from {note.from}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>{note.duration}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            size="small"
            onClick={() => setPlaying(!playing)}
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.main', opacity: 0.9 }, width: 34, height: 34, flexShrink: 0 }}
          >
            {playing ? <PauseRoundedIcon sx={{ fontSize: 18 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 18 }} />}
          </IconButton>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: 28 }}>
            {waveHeights.map((h, i) => {
              const barProgress = i / waveHeights.length;
              const active = playing && barProgress <= progress;
              return (
                <Box
                  key={i}
                  sx={{
                    width: 3,
                    borderRadius: 1,
                    bgcolor: active ? 'primary.main' : 'divider',
                    height: `${h}px`,
                    transition: 'background-color 0.1s',
                    animation: playing && barProgress <= progress && barProgress > progress - 0.05
                      ? 'wavePulse 0.4s ease-in-out infinite alternate'
                      : 'none',
                  }}
                />
              );
            })}
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, fontStyle: 'italic', pl: 0.5 }}>
          "{note.transcriptPreview}"
        </Typography>
      </CardContent>
      <style>{`@keyframes wavePulse { from { transform: scaleY(0.8); } to { transform: scaleY(1.2); } }`}</style>
    </Card>
  );
}

export default function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const ex = mockExercises.find((e) => e.id === id);
  const pe = mockProgram.exercises.find((p) => p.exerciseId === id);
  const notes = useNotes(id);
  const completed = useCompleted(TODAY);
  const done = completed.has(id);
  const [noteText, setNoteText] = useState('');

  if (!ex || !pe) return <Box sx={{ p: 3 }}><Typography>Exercise not found.</Typography></Box>;

  const handleSendNote = () => {
    if (!noteText.trim()) return;
    addNote({
      id: `n-${Date.now()}`,
      exerciseId: id,
      content: noteText.trim(),
      createdAt: TODAY,
      authorRole: 'patient',
      authorName: `${mockPatient.firstName} ${mockPatient.lastName}`,
    });
    setNoteText('');
  };

  const allTags = [...ex.tags.bodyPart, ...ex.tags.condition].slice(0, 4);

  return (
    <Box>
      {/* Video / Header */}
      <Box sx={{ position: 'relative', width: '100%', height: 220, bgcolor: ex.videoUrl ? '#0f0f0f' : 'primary.light', overflow: 'hidden' }}>
        {ex.videoUrl ? (
          <iframe
            src={`https://www.youtube.com/embed/${ex.videoUrl}?rel=0&modestbranding=1`}
            width="100%" height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none', display: 'block' }}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h2" sx={{ opacity: 0.3 }}>💪</Typography>
          </Box>
        )}
        <IconButton
          onClick={() => router.back()}
          size="small"
          sx={{ position: 'absolute', top: 10, left: 10, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ px: 2.5, pt: 2.5, pb: 3 }}>
        {/* Title + complete toggle */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1, pr: 1 }}>{ex.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Checkbox
              checked={done}
              onChange={() => toggleComplete(TODAY, id)}
              icon={<RadioButtonUncheckedRoundedIcon />}
              checkedIcon={<CheckCircleRoundedIcon />}
              sx={{ p: 0.5, color: 'text.secondary', '&.Mui-checked': { color: 'success.main' } }}
            />
            <Typography variant="caption" color={done ? 'success.main' : 'text.secondary'} sx={{ fontWeight: done ? 600 : 400 }}>
              {done ? 'Done' : 'Mark done'}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={1.5}>{ex.description}</Typography>

        {/* Physio audio note */}
        {ex.physioAudioNote && <PhysioAudioCard note={ex.physioAudioNote} />}

        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
          <Chip label={`${pe.sets} sets`} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 500 }} />
          <Chip label={`${pe.reps} reps`} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 500 }} />
          {pe.holdSecs > 0 && <Chip label={`${pe.holdSecs}s hold`} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 500 }} />}
          <Chip label={pe.frequency} size="small" variant="outlined" />
          {allTags.map((t) => <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 10 }} />)}
        </Box>

        {/* Instructions */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ pb: '16px !important' }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1.5}>How to do it</Typography>
            {ex.instructions.map((step, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1 }}>
                  <Typography variant="caption" fontWeight={700} sx={{ fontSize: 10 }}>{i + 1}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>{step}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Common mistakes */}
        {ex.commonMistakes.length > 0 && (
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ pb: '16px !important' }}>
              <Typography variant="subtitle2" fontWeight={600} mb={1.5}>Common mistakes to avoid</Typography>
              {ex.commonMistakes.map((m, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.75, pl: 1, borderLeft: '2px solid', borderColor: 'warning.main' }}>
                  {m}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Notes thread */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>Notes for {mockPhysio.firstName}</Typography>
        {notes.length > 0 && (
          <Card sx={{ mb: 1.5 }}>
            {notes.map((note, i) => {
              const isPhysio = note.authorRole === 'physio';
              return (
                <Box key={note.id}>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: isPhysio ? 'primary.light' : 'action.hover', color: isPhysio ? 'primary.main' : 'text.secondary', fontSize: 11, fontWeight: 700 }}>
                        {isPhysio ? mockPhysio.avatarInitials : mockPatient.avatarInitials}
                      </Avatar>
                      <Typography variant="caption" fontWeight={600}>{note.authorName}</Typography>
                      {isPhysio && <Chip label="Physio" size="small" sx={{ height: 16, fontSize: 9, bgcolor: 'primary.light', color: 'primary.main' }} />}
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>{note.createdAt}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 4, lineHeight: 1.5 }}>{note.content}</Typography>
                  </Box>
                  {i < notes.length - 1 && <Divider />}
                </Box>
              );
            })}
          </Card>
        )}

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            multiline
            maxRows={4}
            size="small"
            fullWidth
            placeholder={`Ask ${mockPhysio.firstName} something about this exercise…`}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendNote(); } }}
          />
          <Button
            variant="contained"
            disableElevation
            onClick={handleSendNote}
            disabled={!noteText.trim()}
            sx={{ minWidth: 0, px: 1.5, py: 1 }}
          >
            <SendRoundedIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
