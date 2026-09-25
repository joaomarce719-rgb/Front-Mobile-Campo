// Contrato estático que reflete a estrutura de resposta esperada da API
export interface VariaveisLeitura {
  oxigenioDissolvido: number;
  temperatura: number;
  estadoBandejas: string;
}

export interface RecomendacaoFuzzyPayload {
  viveiroId: string;
  diasCultivo: number;
  leiturasAtuais: VariaveisLeitura;
  ajusteSugeridoPercentual: number;
  novaMassaRacaoKg: number;
  justificativaAnalitica: string;
  identificadorTrato: string;
}
