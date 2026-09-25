'use client';

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IndicadoresViveiro } from '../../types/viveiro';

export default function DesempenhoViveirosPage() {
  const [viveiros, setViveiros] = useState<IndicadoresViveiro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    async function carregarViveiros() {
      try {
        const resposta = await fetch('/api/v1/viveiros/desempenho');
        if (resposta.ok) {
          const dados: IndicadoresViveiro[] = await resposta.json();
          setViveiros(dados);
        }
      } catch (erro) {
        console.error('Erro ao carregar os dados dos viveiros:', erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarViveiros();
  }, []);

  if (carregando) {
    return <div className="p-4 text-center">A carregar dados dos viveiros...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 p-4 font-sans">
      <header className="bg-slate-900 text-white p-4 rounded-xl mb-4 shadow-sm">
        <h1 className="text-xl font-bold">Desempenho dos Viveiros</h1>
        <p className="text-xs text-slate-300">Indicadores Zootécnicos em Tempo Real</p>
      </header>

      <section className="flex flex-col gap-4">
        {viveiros.map((viveiro) => (
          <div key={viveiro.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-slate-800">{viveiro.nome}</h2>
              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                {viveiro.fase} - {viveiro.diasCultivo} Dias
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-500 font-medium">Peso Médio</span>
                <p className="text-lg font-bold text-slate-800">{viveiro.pesoMedioG} g</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-500 font-medium">Biomassa Estimada</span>
                <p className="text-lg font-bold text-slate-800">{viveiro.biomassaEstimadaKg} kg</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-500 font-medium">FCA Atual</span>
                <p className="text-lg font-bold text-emerald-600">{viveiro.fcaAtual}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-500 font-medium">Sobrevivência</span>
                <p className="text-lg font-bold text-blue-600">{viveiro.taxaSobrevivenciaPct}%</p>
              </div>
            </div>

            <div className="h-32 w-full pt-2">
              <span className="text-xs text-slate-400 block mb-1">Evolução do Peso (Semanal)</span>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viveiro.historicoPeso}>
                  <XAxis dataKey="semana" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 'dataMax + 2']} />
                  <Tooltip />
                  <Bar dataKey="peso" radius={[4, 4, 0, 0]}>
                    {viveiro.historicoPeso.map((entry, index) => (
                      <Cell
                        key={`${entry.semana}-${index}`}
                        fill={index === viveiro.historicoPeso.length - 1 ? '#2563eb' : '#93c5fd'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
