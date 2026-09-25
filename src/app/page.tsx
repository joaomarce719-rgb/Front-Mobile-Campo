'use client';

import React, { useEffect, useState } from 'react';
import { DadosCentralOperador } from '../types/operador';
import { obterDadosCentral } from '../services/dashboardService';

export default function CentralOperadorEcra() {
  const [dados, setDados] = useState<DadosCentralOperador | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosApi = await obterDadosCentral();
        setDados(dadosApi);
      } catch (err) {
        setErro('Não foi possível carregar as informações do sistema.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  if (carregando) {
    return <div className="p-4 text-center text-gray-500 font-medium">A carregar o sistema...</div>;
  }

  if (erro || !dados) {
    return <div className="p-4 text-red-600 text-center font-medium">{erro}</div>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 p-4 font-sans">
      <header className="bg-slate-900 text-white rounded-xl p-5 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-emerald-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
            {dados.estadoSistema}
          </span>
          <span className="text-slate-400">((•))</span>
        </div>
        <h1 className="text-2xl font-bold">Olá, {dados.nomeOperador}</h1>
        <p className="text-sm text-slate-300 font-light mt-1">{dados.dataAtual}</p>
      </header>

      <section className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            📢 Avisos & Observações
          </h2>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
            {dados.alertas.length} novos
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {dados.alertas.map((alerta) => (
            <div key={alerta.id} className="border-l-4 border-red-400 pl-3">
              <h3 className="font-semibold text-sm text-gray-800">{alerta.titulo}</h3>
              <p className="text-xs text-gray-500 mt-1">{alerta.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-1 rounded-md">
            Módulo Unificado
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-lg text-xl">📋</div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">Registar Informações</h3>
                <p className="text-xs text-gray-500 mt-1">Biometria, Ração, Mortalidade e Comedouros integrados</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg text-xl">💧</div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">Qualidade da Água</h3>
                <p className="text-xs text-gray-500 mt-1">O₂, salinidade, pH, temp. e sonda multiparâmetro</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 text-gray-600 p-3 rounded-lg text-xl">✓</div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">Tarefas & Ocorrências</h3>
                <p className="text-xs text-gray-500 mt-1">Ronda, checklist de aeradores e intercorrências</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}
