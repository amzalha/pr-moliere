create table if not exists public.student_answers (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  user_email text,
  niveau text not null,
  theme text not null,
  exercice_consigne text not null,
  reponse_eleve text not null,
  statut text not null,
  contenu_pedagogique text,
  rappel_cours text,
  created_at timestamptz not null default now()
);

create index if not exists idx_student_answers_user_created
on public.student_answers (user_id, created_at desc);

alter table public.student_answers enable row level security;

create policy "student_can_insert_own_answers"
on public.student_answers
for insert
with check (true);

create policy "student_can_read_own_answers"
on public.student_answers
for select
using (true);
