import { useState, useEffect } from 'react';

// keyed by ISO date string (YYYY-MM-DD) → Set of completed exerciseIds
const completionMap = new Map<string, Set<string>>();

// Seed some history
const seedDates = [
  '2026-05-26', '2026-05-27', '2026-05-28', '2026-05-29', '2026-05-30', '2026-05-31',
];
for (const date of seedDates) {
  completionMap.set(date, new Set(['ex1', 'ex11', 'ex3', 'ex5']));
}
// Partial day
completionMap.set('2026-05-25', new Set(['ex1', 'ex3']));
// Today starts empty (2026-06-02)

const _listeners = new Set<() => void>();
function notify() { _listeners.forEach((l) => l()); }

export function getCompleted(date: string): Set<string> {
  return completionMap.get(date) ?? new Set();
}

export function toggleComplete(date: string, exerciseId: string): void {
  const existing = new Set(getCompleted(date));
  if (existing.has(exerciseId)) {
    existing.delete(exerciseId);
  } else {
    existing.add(exerciseId);
  }
  completionMap.set(date, existing);
  notify();
}

export function getCompletionHistory(): { date: string; count: number; total: number }[] {
  const allDates = Array.from(completionMap.keys()).sort();
  return allDates.map((date) => ({
    date,
    count: completionMap.get(date)?.size ?? 0,
    total: 4,
  }));
}

export function useCompleted(date: string): Set<string> {
  const [completed, setCompleted] = useState<Set<string>>(() => getCompleted(date));
  useEffect(() => {
    const listener = () => setCompleted(new Set(getCompleted(date)));
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, [date]);
  return completed;
}
