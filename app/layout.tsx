import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francisco Barros",
  description: "CV interactivo + portafolio + analítica.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // lang fijo a "es" hasta F3 (next-intl + routing [locale]).
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
