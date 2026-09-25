import { RegistroNoturnoPayload } from '../types/monitoramento';

export async function enviarRegistroNoturno(dados: RegistroNoturnoPayload): Promise<void> {
  try {
    const resposta = await fetch('/api/v1/monitoramento/noturno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error('Falha ao sincronizar o monitoramento noturno com o servidor.');
    }
  } catch (erro) {
    console.error('Erro de comunicação HTTP:', erro);
    throw erro;
  }
}
