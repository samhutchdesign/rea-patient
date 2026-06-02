import type { Exercise, Program, Patient, Physio, Clinic, ExerciseNote, Notification } from './types';

export const mockPatient: Patient = {
  id: 'pat1',
  firstName: 'Margaret',
  lastName: 'Chen',
  email: 'margaret.chen@email.com',
  phone: '212-555-0101',
  address: '84 Riverside Dr, Vancouver, BC V6H 3S5',
  avatarInitials: 'MC',
  condition: 'Postpartum Pelvic Floor Rehabilitation',
  conditionDetail: 'Postpartum pelvic floor hypotonicity with stress urinary incontinence (SUI), 6 weeks post-delivery.',
  goal: 'Return to yoga and running, leak-free, by 8 weeks postpartum.',
};

export const mockPhysio: Physio = {
  id: 'p1',
  firstName: 'Sarah',
  lastName: 'Harper',
  credentials: 'PT, DPT, PRPC',
  title: 'Pelvic Health Physiotherapist',
  bio: 'Dr. Sarah Harper is a pelvic floor physiotherapist with over 15 years of clinical experience specializing in pelvic health across all life stages. She founded Rea Pelvic Health in 2018 with a mission to make evidence-based pelvic floor care accessible and empowering for every patient.',
  avatarInitials: 'SH',
  email: 'sarah.harper@reapelvichealth.com',
  phone: '(604) 555-0100',
};

export const mockClinic: Clinic = {
  id: 'clinic1',
  name: 'Rea Pelvic Health',
  address: '1420 Health Sciences Drive, Suite 300, Vancouver, BC V6T 1Z3',
  phone: '(604) 555-0100',
  email: 'vancouver@reapelvichealth.com',
  website: 'www.reapelvichealth.com',
  description: "Rea Pelvic Health's founding clinic, established in 2018 in Vancouver, BC. Our multidisciplinary team of pelvic floor physiotherapists delivers evidence-based, patient-centred care in a supportive and discreet environment.",
  logoInitials: 'R',
};

export const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Diaphragmatic Breathing',
    description: 'Coordinated breathing to activate the pelvic floor and reduce intra-abdominal pressure.',
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Place one hand on your chest and one on your belly.',
      'Inhale slowly through your nose, letting your belly rise.',
      'Exhale through pursed lips, gently drawing the belly in.',
      'On the exhale, gently lift and squeeze the pelvic floor.',
      'Release on the inhale. Repeat for the prescribed reps.',
    ],
    commonMistakes: [
      'Holding your breath during the contraction.',
      'Bearing down instead of lifting up.',
      'Tensing the glutes or thighs — keep them relaxed.',
    ],
    tags: { specialty: ['Pelvic Floor'], condition: ['SUI', 'Postpartum'], bodyPart: ['Pelvic Floor', 'Core'], muscle: ['Diaphragm', 'Pelvic Floor Muscles'], surgery: [] },
    defaultSets: 3, defaultReps: 10, defaultHoldSecs: 5,
    defaultFrequency: 'Daily',
    videoUrl: 'qKlpKyT1H84',
    physioAudioNote: {
      from: 'Sarah Harper',
      duration: '1:12',
      transcriptPreview: 'Remember to breathe out slowly and really let that belly drop before you even think about the pelvic floor lift…',
      fullTranscript: "Remember to breathe out slowly and really let that belly drop before you even think about the pelvic floor lift. A lot of patients rush the exhale — take the full 4 to 5 seconds. You should feel your ribcage expand outward and your belly rise on the inhale, not your chest. Then on the exhale, think of a slow elevator coming down — that's your pelvic floor gently releasing and then lifting with the breath. Let gravity do the work on the release phase first. If you feel any bearing down or pressure, pause and reset your breath.",
    },
  },
  {
    id: 'ex3',
    name: 'Pelvic Floor Contractions (Kegels)',
    description: 'Targeted contractions to strengthen the pelvic floor musculature.',
    instructions: [
      'Find a comfortable seated or lying position.',
      'Identify your pelvic floor muscles — the ones you use to stop urine flow.',
      'Contract and lift the pelvic floor upward for the hold duration.',
      'Fully release and relax for equal time.',
      'Keep breathing normally throughout.',
    ],
    commonMistakes: [
      'Squeezing glutes or inner thighs instead of pelvic floor.',
      'Not fully relaxing between contractions.',
      'Holding your breath.',
    ],
    tags: { specialty: ['Pelvic Floor'], condition: ['SUI', 'Postpartum', 'Prolapse'], bodyPart: ['Pelvic Floor'], muscle: ['Levator Ani', 'Pubococcygeus'], surgery: [] },
    defaultSets: 3, defaultReps: 10, defaultHoldSecs: 8,
    defaultFrequency: 'Daily',
  },
  {
    id: 'ex5',
    name: 'Hip Bridge',
    description: 'Glute and posterior chain activation with integrated pelvic floor engagement.',
    instructions: [
      'Lie on your back, knees bent, feet hip-width apart.',
      'Press your lower back gently into the floor.',
      'Inhale to prepare. On exhale, lift your hips toward the ceiling.',
      'Squeeze glutes at the top and gently engage pelvic floor.',
      'Hold for the prescribed duration, then lower slowly.',
    ],
    commonMistakes: [
      'Over-arching the lower back at the top.',
      'Feet too far from or too close to your hips.',
      'Rushing through the movement — control the descent.',
    ],
    tags: { specialty: ['Pelvic Floor', 'Orthopaedic'], condition: ['Postpartum', 'Hip Pain'], bodyPart: ['Hip', 'Glutes', 'Core'], muscle: ['Gluteus Maximus', 'Hamstrings', 'Pelvic Floor Muscles'], surgery: [] },
    defaultSets: 3, defaultReps: 12, defaultHoldSecs: 3,
    defaultFrequency: 'Daily',
    videoUrl: 'wPM8icPu6H8',
  },
  {
    id: 'ex11',
    name: 'Transverse Abdominis Activation',
    description: 'Deep core activation to support pelvic floor function and spinal stability.',
    instructions: [
      'Lie on your back or sit upright.',
      'Find neutral spine — not flat, not arched.',
      'Take a breath in. On exhale, draw your lower belly gently inward (away from waistband).',
      'Hold lightly while breathing normally.',
      'Release fully between reps.',
    ],
    commonMistakes: [
      'Pulling the whole belly in and holding breath.',
      'Flattening the lower back instead of neutral spine.',
      'Activating superficial abs (six-pack) instead of deep TA.',
    ],
    tags: { specialty: ['Pelvic Floor', 'Core Stability'], condition: ['Postpartum', 'Low Back Pain'], bodyPart: ['Core', 'Abdomen'], muscle: ['Transverse Abdominis', 'Pelvic Floor Muscles'], surgery: [] },
    defaultSets: 3, defaultReps: 10, defaultHoldSecs: 10,
    defaultFrequency: 'Daily',
  },
];

export const mockProgram: Program = {
  id: 'prog1',
  name: 'Postpartum Foundation',
  description: 'A gentle, evidence-based program to rebuild pelvic floor strength, core stability, and functional movement in the postpartum period.',
  exercises: [
    { exerciseId: 'ex1', sets: 3, reps: 10, holdSecs: 5, frequency: 'Daily' },
    { exerciseId: 'ex11', sets: 3, reps: 10, holdSecs: 10, frequency: 'Daily' },
    { exerciseId: 'ex3', sets: 3, reps: 10, holdSecs: 8, frequency: 'Daily' },
    { exerciseId: 'ex5', sets: 3, reps: 12, holdSecs: 3, frequency: 'Daily' },
  ],
  inPersonSessionsCompleted: 3,
  inPersonSessionsTotal: 12,
};

export const mockNotes: ExerciseNote[] = [
  {
    id: 'n1',
    exerciseId: 'ex1',
    content: "I've been doing these every morning after breakfast. Sometimes I forget in the evenings, but mornings feel natural now!",
    createdAt: '2026-05-10',
    authorRole: 'patient',
    authorName: 'Margaret Chen',
  },
  {
    id: 'n2',
    exerciseId: 'ex3',
    content: "This one is hard for me. I feel like I'm not holding long enough. Am I supposed to feel it in my lower back too?",
    createdAt: '2026-05-08',
    authorRole: 'patient',
    authorName: 'Margaret Chen',
  },
  {
    id: 'n3',
    exerciseId: 'ex3',
    content: "Not at all — that's actually a sign you may be compensating with your back extensors rather than isolating the pelvic floor. Try reducing the hold to 5 seconds and focus on a pure lift sensation. We'll review technique at your next session.",
    createdAt: '2026-05-09',
    authorRole: 'physio',
    authorName: 'Sarah Harper',
  },
  {
    id: 'n4',
    exerciseId: 'ex5',
    content: "I tried the standing version against the wall — it made so much more sense than lying down. Feels really good first thing in the morning.",
    createdAt: '2026-05-14',
    authorRole: 'patient',
    authorName: 'Margaret Chen',
  },
];

export const mockNotifications: Notification[] = [
  { id: 'notif1', message: 'Sarah Harper updated your exercise program. Hip Bridge reps increased to 15.', timestamp: '2026-05-28T09:00:00Z', read: false, type: 'program_update', link: '/program' },
  { id: 'notif2', message: "Great work this week — you've completed 6 of 7 days! Keep it up.", timestamp: '2026-05-25T08:00:00Z', read: false, type: 'reminder', link: '/stats' },
  { id: 'notif3', message: 'Reminder: You have not logged your exercises today.', timestamp: '2026-05-22T18:00:00Z', read: true, type: 'reminder', link: '/today' },
  { id: 'notif4', message: 'Sarah Harper replied to your note on Pelvic Floor Contractions.', timestamp: '2026-05-09T14:30:00Z', read: true, type: 'message', link: '/program/ex3' },
  { id: 'notif5', message: 'Your next appointment is May 30 at 10:00 AM.', timestamp: '2026-05-08T09:00:00Z', read: true, type: 'reminder' },
];

export const mockEducation = {
  condition: 'Postpartum Pelvic Floor Rehabilitation',
  summary: 'Pelvic floor dysfunction is extremely common after childbirth — affecting up to 1 in 3 women. The good news is that with the right exercises and guidance, most symptoms improve significantly within weeks.',
  sections: [
    {
      title: 'What is the pelvic floor?',
      content: 'The pelvic floor is a group of muscles, ligaments, and connective tissue that form a hammock-like structure at the base of the pelvis. These muscles support the bladder, bowel, and uterus, and play an essential role in bladder and bowel control, sexual function, and core stability.',
    },
    {
      title: 'What happens during and after childbirth?',
      content: 'Pregnancy and vaginal delivery place significant stress on the pelvic floor. The muscles and connective tissues can become stretched, weakened, or torn. This can lead to symptoms such as leaking urine when coughing, sneezing, or exercising (stress urinary incontinence), a feeling of heaviness or pressure in the pelvis, or reduced sensation.',
    },
    {
      title: 'Why your program works',
      content: 'Your program focuses on re-establishing the neuromuscular connection to the pelvic floor through progressive loading. Starting with breathing and gentle activation, you progress to functional movements like hip bridges. This approach follows the current evidence for postpartum rehabilitation and mirrors the load-progression model used in other musculoskeletal rehab.',
    },
    {
      title: 'What to expect',
      content: 'Most patients notice improvement in symptoms within 4–6 weeks of consistent exercise. Full rehabilitation typically takes 3–6 months. It is normal to feel mild fatigue in the pelvic floor area after exercise. Stop and contact your physiotherapist if you experience pain, increased leakage, or heaviness during or after exercise.',
    },
    {
      title: 'Tips for success',
      content: 'Consistency is more important than intensity. Short daily sessions outperform longer, infrequent ones. Pair your exercises with an existing habit — morning coffee, brushing teeth, or feeding time. Your physiotherapist is here to adjust your program as you progress, so keep the notes coming.',
    },
  ],
};
