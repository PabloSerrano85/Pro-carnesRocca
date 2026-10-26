import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const DashboardCharts: React.FC = () => {
  const barCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const donutCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const barChartInstance = useRef<Chart | null>(null);
  const donutChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // 1. Gráfico de Barras: Faena Local vs Extraprovincial
    if (barCanvasRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      const ctx = barCanvasRef.current.getContext('2d');
      if (ctx) {
        barChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
            datasets: [
              {
                label: 'Faena en Frigoríficos de Santiago (Tn)',
                data: [1420, 1530, 1610, 1780, 1890, 2150],
                backgroundColor: '#8B1425',
                borderRadius: 6,
              },
              {
                label: 'Ingreso Extraprovincial (Tn - Cba/Sta Fe)',
                data: [2100, 2050, 1980, 1890, 1850, 1720],
                backgroundColor: '#94A3B8',
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { boxWidth: 12, font: { size: 11, family: 'Inter' } },
              },
            },
            scales: {
              y: {
                grid: { color: '#F1F5F9' },
                ticks: { font: { size: 10, family: 'Inter' } },
              },
              x: {
                grid: { display: false },
                ticks: { font: { size: 10, family: 'Inter' } },
              },
            },
          },
        });
      }
    }

    // 2. Gráfico Donut: Especies y Sostenibilidad
    if (donutCanvasRef.current) {
      if (donutChartInstance.current) {
        donutChartInstance.current.destroy();
      }

      const ctxDonut = donutCanvasRef.current.getContext('2d');
      if (ctxDonut) {
        donutChartInstance.current = new Chart(ctxDonut, {
          type: 'doughnut',
          data: {
            labels: ['Bovino', 'Porcino', 'Caprino Santiagueño', 'Ovino'],
            datasets: [
              {
                data: [65, 18, 12, 5],
                backgroundColor: ['#8B1425', '#C22338', '#059669', '#D97706'],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { boxWidth: 10, font: { size: 10, family: 'Inter' } },
              },
            },
            cutout: '70%',
          },
        });
      }
    }

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (donutChartInstance.current) donutChartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico 1: Faena Local vs Ingreso Foráneo */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Flujo Comercial: Faena en Frigoríficos Locales vs. Ingreso Extraprovincial
            </h3>
            <p className="text-xs text-slate-500">
              Estimación de toneladas mensuales para incentivo al agregado de valor local
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-1 rounded">
            2026
          </span>
        </div>
        <div className="h-64 relative">
          <canvas ref={barCanvasRef}></canvas>
        </div>
      </div>

      {/* Gráfico 2: Composición por Especie y AGROTRAZA */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Distribución por Especie</h3>
            <p className="text-xs text-slate-500">Movimientos declarados en Santiago</p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <div className="h-52 flex justify-center items-center relative">
          <canvas ref={donutCanvasRef}></canvas>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 text-center text-xs">
          <div>
            <p className="text-slate-500">Bovino / Porcino</p>
            <p className="font-bold text-slate-800 text-sm">83.0%</p>
          </div>
          <div>
            <p className="text-slate-500">Caprino / Ovino</p>
            <p className="font-bold text-emerald-600 text-sm">17.0% Gourmet</p>
          </div>
        </div>
      </div>
    </div>
  );
};
