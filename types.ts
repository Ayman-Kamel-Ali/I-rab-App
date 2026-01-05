
export interface WordAnalysis {
  word: string;
  partOfSpeech: string; // e.g., فعل، اسم، حرف
  grammaticalCase: string; // e.g., مرفوع، منصوب، مجرور، مجزوم
  inflectionSign: string; // e.g., الضمة، الفتحة، الكسرة
  reason: string; // Detailed explanation of the case
  notes?: string;
}

export interface SentenceAnalysisResponse {
  fullSentence: string;
  overallStructure: string;
  words: WordAnalysis[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
