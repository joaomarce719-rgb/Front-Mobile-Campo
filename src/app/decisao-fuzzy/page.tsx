'use client';

import React, { useEffect, useState } from 'react';
import { RecomendacaoFuzzyPayload } from '../../types/fuzzy';

export default function DecisaoFuzzyPage() {
  const [recomendacao, setRecomendacao] = useState<RecomendacaoFuzzyPayload | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [processandoAcao, setProcessandoAcao] = useState<boolean>(false);

  useEffect(() => {
    async function carregarRecomendacao() {
      try {
        const resposta = await fetch('/api/v1/analise/fuzzy/viveiro/02');
        if (resposta.ok) {
          const dados: RecomendacaoFuzzyPayload = await resposta.json();
          setRecomendacao(dados);
        }
      } catch (erro) {
        console.error('Falha ao obter processamento analítico:', erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarRecomendacao();
  }, []);

  const confirmarTrato = async () => {
    setProcessandoAcao(true);

    try {
      await fetch('/api/v1/manejo/confirmar-trato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          viveiroId: recomendacao?.viveiroId,
          quantidadeKg: recomendacao?.novaMassaRacaoKg,
        }),
      });
      alert('Trato confirmado e registado no sistema.');
    } catch (erro) {
      alert('Erro ao confirmar trato.');
    } finally {
      setProcessandoAcao(false);
    }
  };

  if (carregando) {
    return <div className="p-4 text-white text-center">A processar motor de inferência...</div>;
  }

  if (!recomendacao) {
    return <div className="p-4 text-white text-center">Erro ao carregar recomendação.</div>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4 font-sans">
      <header className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-black text-xl">●</span>
          <h1 className="text-lg font-bold">Manejo</h1>
        </div>
      </header>

      <section className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">Ronda & Manejo</h2>
          <p className="text-xs text-slate-400">Viveiro {recomendacao.viveiroId} • Camarão Vannamei</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block mb-1">CICLO</span>
          <span className="font-bold text-slate-200">Dia {recomendacao.diasCultivo}</span>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
          <span className="text-[10px] text-slate-400 block uppercase">O₂ Dissolvido</span>
          <span className="font-bold text-emerald-400 text-sm">{recomendacao.leiturasAtuais.oxigenioDissolvido} mg/L</span>
        </div>
        <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
          <span className="text-[10px] text-slate-400 block uppercase">Temp. Água</span>
          <span className="font-bold text-blue-400 text-sm">{recomendacao.leiturasAtuais.temperatura} °C</span>
        </div>
        <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
          <span className="text-[10px] text-slate-400 block uppercase">Sobras Bandejas</span>
          <span className="font-bold text-emerald-400 text-sm">{recomendacao.leiturasAtuais.estadoBandejas}</span>
        </div>
      </section>

      <section className="bg-slate-800 p-5 rounded-xl border border-slate-700 mb-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2">
            🧠 DECISÃO ZOOTÉCNICA (FUZZY)
          </h3>
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
            ↑ Aumentar
          </span>
        </div>

        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-4xl font-black text-emerald-400">+{recomendacao.ajusteSugeridoPercentual.toFixed(1)}%</span>
            <p className="text-xs text-slate-400 mt-1">Ajuste (Δr)</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-white">
              {recomendacao.novaMassaRacaoKg.toFixed(1)}<span className="text-xl">kg</span>
            </span>
            <p className="text-xs text-slate-400 mt-1">Massa / Arraçoamento</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
          <p className="text-xs text-slate-300 italic">"{recomendacao.justificativaAnalitica}"</p>
        </div>
      </section>

      <section className="mt-auto pb-4 flex flex-col gap-3">
        <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 mb-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Trato Atual</span>
            <span className="font-bold text-sm text-white">{recomendacao.identificadorTrato}</span>
          </div>
          <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-1 rounded">Ronda em andamento</span>
        </div>

        <button
          onClick={confirmarTrato}
          disabled={processandoAcao}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 p-4 rounded-xl font-bold shadow-lg transition-colors disabled:opacity-50"
        >
          {processandoAcao ? 'A Processar...' : `Confirmar Trato de ${recomendacao.novaMassaRacaoKg}kg`}
        </button>
        <button className="w-full bg-slate-800 text-slate-300 p-4 rounded-xl font-bold border border-slate-700 transition-colors">
          Ajustar Manualmente
        </button>
      </section>
    </main>
  );
}
