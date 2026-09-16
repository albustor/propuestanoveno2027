'use client';

import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { WebAppRecurso } from '../../types';
import { X, Download, Copy, Check, ExternalLink, Printer, QrCode, Smartphone } from 'lucide-react';

interface WebAppQRModalProps {
  webapp: WebAppRecurso | null;
  saberNombre?: string;
  indicadorTexto?: string;
  onClose: () => void;
}

export const WebAppQRModal: React.FC<WebAppQRModalProps> = ({
  webapp,
  saberNombre,
  indicadorTexto,
  onClose,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webapp) return;

    setGenerating(true);
    QRCode.toDataURL(webapp.url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
        setGenerating(false);
      })
      .catch((err) => {
        console.error('Error generating QR Code:', err);
        setGenerating(false);
      });
  }, [webapp]);

  if (!webapp) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(webapp.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    const safeName = webapp.titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    a.download = `QR_MEP_9_${safeName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 border-b border-zinc-100 flex items-start justify-between bg-zinc-50/70">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                <QrCode className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Recurso Digital para Estudiantes • 9° Año
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 leading-snug">
              {webapp.titulo}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Imprimible / Visualizador */}
        <div className="p-6 overflow-y-auto space-y-6" ref={printRef}>
          {/* Tarjeta del QR Centrado */}
          <div className="flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 text-center shadow-2xs">
            <div className="bg-white p-3.5 rounded-2xl border border-zinc-200 shadow-md">
              {generating ? (
                <div className="w-52 h-52 flex items-center justify-center text-xs text-zinc-400">
                  Generando código QR...
                </div>
              ) : (
                <img
                  src={qrDataUrl}
                  alt={`Código QR para ${webapp.titulo}`}
                  className="w-52 h-52 object-contain"
                />
              )}
            </div>

            <div className="mt-4 flex items-center space-x-1.5 text-xs text-zinc-600 font-medium">
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>Escanea con la cámara de tu teléfono, tableta o laptop</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-sky-100 text-sky-800">
                Momento: {webapp.momentoAsociado}
              </span>
              {webapp.tipo && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-200 text-zinc-700">
                  Tipo: {webapp.tipo}
                </span>
              )}
              {webapp.esOffline && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  ⚡ Disponible Offline / PWA
                </span>
              )}
            </div>
          </div>

          {/* Información y Contexto Pedagógico */}
          <div className="space-y-3 text-xs">
            {webapp.descripcion && (
              <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3 text-zinc-700">
                <span className="font-bold text-sky-900">Uso pedagógico sugerido:</span>
                <p className="mt-0.5 leading-relaxed">{webapp.descripcion}</p>
              </div>
            )}

            {saberNombre && (
              <div className="text-zinc-600 bg-zinc-50 border border-zinc-100 rounded-xl p-3">
                <div className="font-semibold text-zinc-800">Saber Asociado:</div>
                <div className="text-zinc-700">{saberNombre}</div>
                {indicadorTexto && (
                  <div className="mt-1 pt-1 border-t border-zinc-200/60 text-[11px] text-zinc-500 line-clamp-2">
                    <strong className="text-zinc-700">Indicador:</strong> {indicadorTexto}
                  </div>
                )}
              </div>
            )}

            {/* Enlace Directo Copiable */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Enlace Directo (URL):
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={webapp.url}
                  className="flex-1 px-3 py-2 text-xs bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-800 select-all font-mono"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shrink-0 flex items-center space-x-1.5 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con Acciones */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 transition-colors text-xs font-medium flex items-center space-x-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              <span>Descargar PNG</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 transition-colors text-xs font-medium flex items-center space-x-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" />
              <span>Imprimir Ficha</span>
            </button>
          </div>

          <a
            href={webapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors text-xs font-bold flex items-center space-x-1.5 shadow-sm"
          >
            <span>Abrir WebApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
