import { supabase } from './supabase';
import { allQuestions } from '../data/questions';

interface LeadData {
  email: string;
  nome: string;
  telefone: string;
  website: string;
  cargo: string;
}

interface DimensionScore {
  name: string;
  score: number;
}

export async function saveDiagnostico(
  lead: LeadData,
  score: number,
  classificacao: string,
  dimensionScores: DimensionScore[],
  answers: Record<number, number>
): Promise<string | null> {
  if (!supabase) return null;

  const respostasArray = Array.from({ length: allQuestions.length }, (_, i) => answers[i] ?? 0);

  try {
    const { data, error } = await supabase
      .from('diagnosticos_calculadora')
      .insert({
        email: lead.email,
        nome: lead.nome,
        telefone: lead.telefone,
        website: lead.website,
        cargo: lead.cargo,
        score,
        classificacao,
        scores_dimensoes: dimensionScores.map(d => ({ nome: d.name, score: d.score })),
        respostas: respostasArray,
        status: 'completo'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Erro ao salvar diagnóstico:', error);
      return null;
    }

    return data?.id ?? null;
  } catch (err) {
    console.error('Erro inesperado ao salvar:', err);
    return null;
  }
}

export async function markAsContacted(diagnosticoId: string): Promise<void> {
  if (!supabase || !diagnosticoId) return;

  try {
    const { error } = await supabase
      .from('diagnosticos_calculadora')
      .update({ status: 'contatado', updated_at: new Date().toISOString() })
      .eq('id', diagnosticoId);

    if (error) {
      console.error('Erro ao atualizar status para contatado:', error);
    }
  } catch (err) {
    console.error('Erro inesperado ao marcar contato:', err);
  }
}
