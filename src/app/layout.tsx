import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diseño y Planeamiento Didáctico 9° Año | MEP Costa Rica",
  description: "Plataforma oficial de diseño curricular, mediación pedagógica, DUA, sistematización y exportación para Formación Tecnológica de Noveno Año - Allan Morera y Alberto Bustos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
