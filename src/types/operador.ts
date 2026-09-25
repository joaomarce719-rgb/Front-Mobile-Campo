export interface Alerta {
  id: string;
  tipo: 'ALERTA' | 'MANUTENCAO' | 'OBSERVACAO';
  titulo: string;
  descricao: string;
  visto: boolean;
}

export interface DadosCentralOperador {
  nomeOperador: string;
  dataAtual: string;
  estadoSistema: string;
  alertas: Alerta[];
}
