import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { StudentAnswerInsert, StudentAnswerRow } from "../types/supabase";

const TABLE_NAME = "student_answers";

export async function saveStudentAnswer(payload: StudentAnswerInsert): Promise<{
 ok: boolean;
 offline: boolean;
 error?: string;
}> {
 if (!isSupabaseConfigured || !supabase) {
  return { ok: false, offline: true, error: "Supabase non configuré" };
 }

 const { error } = await supabase.from(TABLE_NAME).insert(payload);

 if (error) {
  return { ok: false, offline: false, error: error.message };
 }

 return { ok: true, offline: false };
}

export async function getStudentHistory(userId: string): Promise<{
 ok: boolean;
 data: StudentAnswerRow[];
 error?: string;
}> {
 if (!isSupabaseConfigured || !supabase) {
  return { ok: false, data: [], error: "Supabase non configuré" };
 }

 const { data, error } = await supabase
  .from(TABLE_NAME)
  .select("*")
  .eq("user_id", userId)
  .order("created_at", { ascending: false })
  .limit(50);

 if (error) {
  return { ok: false, data: [], error: error.message };
 }

 return { ok: true, data: (data ?? []) as StudentAnswerRow[] };
}
