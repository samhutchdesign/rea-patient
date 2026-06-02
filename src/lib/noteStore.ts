import { useState, useEffect } from 'react';
import { mockNotes } from './mock-data';
import type { ExerciseNote } from './types';

const notesMap = new Map<string, ExerciseNote[]>();

// Seed from mock data
for (const note of mockNotes) {
  const existing = notesMap.get(note.exerciseId) ?? [];
  notesMap.set(note.exerciseId, [...existing, note]);
}

const _listeners = new Set<() => void>();
function notify() { _listeners.forEach((l) => l()); }

export function getNotes(exerciseId: string): ExerciseNote[] {
  return notesMap.get(exerciseId) ?? [];
}

export function addNote(note: ExerciseNote): void {
  const existing = notesMap.get(note.exerciseId) ?? [];
  notesMap.set(note.exerciseId, [...existing, note]);
  notify();
}

export function useNotes(exerciseId: string): ExerciseNote[] {
  const [notes, setNotes] = useState<ExerciseNote[]>(() => getNotes(exerciseId));
  useEffect(() => {
    const listener = () => setNotes(getNotes(exerciseId));
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, [exerciseId]);
  return notes;
}
