import { useState, useEffect } from 'react';
import { mockNotes } from './mock-data';
import type { ExerciseNote } from './types';

const notesMap = new Map<string, ExerciseNote[]>();

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

export function editNote(noteId: string, exerciseId: string, content: string): void {
  const existing = notesMap.get(exerciseId) ?? [];
  notesMap.set(exerciseId, existing.map((n) => n.id === noteId ? { ...n, content } : n));
  notify();
}

export function deleteNote(noteId: string, exerciseId: string): void {
  const existing = notesMap.get(exerciseId) ?? [];
  notesMap.set(exerciseId, existing.filter((n) => n.id !== noteId));
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
