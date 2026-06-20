export type StudentAnswerStatus = "CORRECTION_JUSTE" | "CORRECTION_FAUSSE" | "CORRECTION_PARTIELLE";

export type StudentAnswerInsert = {
 user_id: string;
 user_email?: string | null;
 niveau: string;
 theme: string;
 exercice_consigne: string;
 reponse_eleve: string;
 statut: StudentAnswerStatus | string;
 contenu_pedagogique?: string | null;
 rappel_cours?: string | null;
 created_at?: string;
};

export type StudentAnswerRow = StudentAnswerInsert & {
 id: string;
 created_at: string;
};
