import { supabase } from './supabase';
import { dimensions } from '../data/questions';

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
  description: string;
}

// Maps each question index (0-19) to its dimension name
function buildDimensionMap(): Record<number, string> {
  const map: Record<number, string> = {};
  let idx = 0;
  for (const dim of dimensions) {
    for (let i = 0; i < dim.questions.length; i++) {
      map[idx] = dim.name;
      idx++;
    }
  }
  return map;
}

export async function saveDiagnostico(
  lead: LeadData,
  score: number,
  classificacao: string,
  dimensionScores: DimensionScore[],
  answers: Record<number, number>
): Promise<void> {
  // 1. Upsert lead (email is unique — updates if already exists)
  const { data: leadData, error: leadError } = await supabase
    .from('leads')
    .upsert({ email: lead.email, nome: lead.nome, telefone: lead.telefone, website: lead.website }, { onConflict: 'email' })
    .select('id')
    .single();

  if (leadError || !leadData) {
    console.error('Erro ao salvar lead:', leadError);
    return;
  }

  // 2. Insert diagnostico
  const { data: diagnostico, error: diagError } = await supabase
    .from('diagnosticos')
    .insert({
      lead_id: leadData.id,
      cargo: lead.cargo,
      score,
      classificacao,
      scores_dimensoes: dimensionScores.map(d => ({ nome: d.name, score: d.score }))
    })
    .select('id')
    .single();

  if (diagError || !diagnostico) {
    console.error('Erro ao salvar diagnóstico:', diagError);
    return;
  }

  // 3. Insert 20 respostas
  const dimensionMap = buildDimensionMap();
  const respostas = Object.entries(answers).map(([indexStr, pontuacao]) => ({
    diagnostico_id: diagnostico.id,
    questao_index: parseInt(indexStr),
    dimensao: dimensionMap[parseInt(indexStr)] ?? 'Desconhecida',
    pontuacao
  }));

  const { error: respError } = await supabase.from('respostas').insert(respostas);

  if (respError) {
    console.error('Erro ao salvar respostas:', respError);
  }
}
