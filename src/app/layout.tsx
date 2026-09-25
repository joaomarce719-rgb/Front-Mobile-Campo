import React from 'react';
import './globals.css'; // Importa o Tailwind CSS, caso já exista no seu projeto

export const metadata = {
  title: 'Front Mobile Campo - SAD',
  description: 'Sistema de Apoio à Decisão para Carcinicultura',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
