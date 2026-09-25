export interface RegistroNoturnoPayload {
  viveiroId: string;
  dataHoraLeitura: string;
  oxigenioDissolvido: number;
  temperaturaAgua: number;
  aeradoresLigados: boolean;
  mortalidadeEncontrada: boolean;
}
