'use client';

import React, { useState } from 'react';
import { enviarRegistroNoturno } from '../../services/monitoramentoService';
import { RegistroNoturnoPayload } from '../../types/monitoramento';

export default function MonitoramentoNoturnoPage() {
  const [viveiroId, setViveiroId] = useState<string>('02');
  const [oxigenio, setOxigenio] = useState<number>(3.8);
  const [temperatura, setTemperatura] = useState<number>(28.5);
  const [aeradoresLigados, setAeradoresLigados] = useState<boolean>(true);
  const [mortalidade, setMortalidade] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const ajustarOxigenio = (valor: number) => {
    setOxigenio((prev) => Number(Math.max(0, prev + valor).toFixed(1)));
  };

  const ajustarTemperatura = (valor: number) => {
    setTemperatura((prev) => Number(Math.max(0, prev + valor).toFixed(1)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: RegistroNoturnoPayload = {
      viveiroId,
      dataHoraLeitura: new Date().toISOString(),
      oxigenioDissolvido: oxigenio,
      temperaturaAgua: temperatura,
      aeradoresLigados,
      mortalidadeEncontrada: mortalidade,
    };

    try {
      await enviarRegistroNoturno(payload);
      alert('Leitura da ronda noturna salva com sucesso!');
    } catch (error) {
      alert('Erro ao salvar os dados. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-900 text-slate-100 p-4 font-sans">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🌙</span>
          <h1 className="text-lg font-bold">Ronda Noturna</h1>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Modo Noturno Ativo</span>
          <span>Ronda: 22:00 - 04:00</span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
        <section className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
            Viveiro em Monitoramento
          </label>
          <select
            value={viveiroId}
            onChange={(e) => setViveiroId(e.target.value)}
            className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg font-medium text-white"
          >
            <option value="02">Viveiro 02 (Litopenaeus vannamei - 72 Dias)</option>
            <option value="04">Viveiro 04 (Litopenaeus vannamei - 45 Dias)</option>
          </select>
        </section>

        <section
          className={`p-4 rounded-xl border ${
            oxigenio < 4.0 ? 'border-red-500 bg-red-950/30' : 'border-slate-700 bg-slate-800'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-slate-200">Oxigênio Dissolvido (OD)</label>
            <span className="text-xs text-slate-400">Ideal &gt; 4.0</span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-slate-900 p-3 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => ajustarOxigenio(-0.1)}
              className="w-12 h-12 bg-slate-800 text-slate-300 rounded-lg font-bold text-lg"
            >
              - 0.1
            </button>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-white">{oxigenio.toFixed(1)}</span>
              <span className="text-xs text-slate-400 mt-1">MG/L REGISTRADO</span>
            </div>
            <button
              type="button"
              onClick={() => ajustarOxigenio(0.1)}
              className="w-12 h-12 bg-blue-600 text-white rounded-lg font-bold text-lg"
            >
              + 0.1
            </button>
          </div>
          {oxigenio < 4.0 && (
            <div className="mt-3 bg-red-500/20 text-red-400 text-xs p-2 rounded flex items-center gap-2 font-bold border border-red-500/30">
              ⚠️ ABAIXO DO IDEAL: LIGAR AERADORES
            </div>
          )}
        </section>

        <section className="bg-slate-800 p-4 rounded-xl border border-orange-500/50">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-slate-200">Temperatura da Água (°C)</label>
            <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Normal</span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-slate-900 p-3 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => ajustarTemperatura(-0.5)}
              className="w-12 h-12 bg-slate-800 text-slate-300 rounded-lg font-bold text-lg"
            >
              - 0.5
            </button>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-white">{temperatura.toFixed(1)}</span>
              <span className="text-xs text-slate-400 mt-1">GRAUS CELSIUS (°C)</span>
            </div>
            <button
              type="button"
              onClick={() => ajustarTemperatura(0.5)}
              className="w-12 h-12 bg-orange-600 text-white rounded-lg font-bold text-lg"
            >
              + 0.5
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 mt-2">
          <button
            type="button"
            onClick={() => setAeradoresLigados(!aeradoresLigados)}
            className={`p-3 rounded-xl border flex flex-col items-center ${
              aeradoresLigados
                ? 'border-emerald-500 bg-emerald-900/40 text-emerald-400'
                : 'border-slate-600 bg-slate-800 text-slate-400'
            }`}
          >
            <span className="font-bold text-sm">Aeradores Ligados</span>
            <span className="text-xs opacity-70">Ação no Controle</span>
          </button>
          <button
            type="button"
            onClick={() => setMortalidade(!mortalidade)}
            className={`p-3 rounded-xl border flex flex-col items-center ${
              mortalidade
                ? 'border-red-500 bg-red-900/40 text-red-400'
                : 'border-slate-600 bg-slate-800 text-slate-400'
            }`}
          >
            <span className="font-bold text-sm">Mortalidade</span>
            <span className="text-xs opacity-70">Registrar Ocorrência</span>
          </button>
        </section>

        <div className="mt-auto pt-6 pb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold shadow-lg disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Leitura da Ronda'}
          </button>
        </div>
      </form>
    </main>
  );
}
