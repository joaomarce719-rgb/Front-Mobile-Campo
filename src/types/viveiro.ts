export interface IndicadoresViveiro {
  id: string;
  nome: string;
  fase: string;
  diasCultivo: number;
  pesoMedioG: number;
  biomassaEstimadaKg: number;
  fcaAtual: number;
  taxaSobrevivenciaPct: number;
  historicoPeso: Array<{ semana: string; peso: number }>;
}
