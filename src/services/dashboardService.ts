import { DadosCentralOperador } from '../types/operador';

export async function obterDadosCentral(): Promise<DadosCentralOperador> {
  try {
    const resposta = await fetch('/api/v1/dashboard/operador', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resposta.ok) {
      throw new Error('Falha ao obter os dados da central do operador.');
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro na comunicação com a API REST:', erro);
    throw erro;
  }
}
