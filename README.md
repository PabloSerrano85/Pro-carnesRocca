# ROCCA - Sistema Provincial de Trazabilidad Comercial y Fiscalización Cárnica
**Gobierno de Santiago del Estero** • Dirección General de Agricultura y Ganadería • Programa ProCarne Fiscalización

Aplicación web desarrollada en **React (Vite + TypeScript + Tailwind CSS)** para la gestión unificada de operadores de la cadena cárnica, fiscalización sanitaria y balance de flujos comerciales interjurisdiccionales, integrando:
- **ARCA (REC):** Remito Electrónico Cárnico obligatorio
- **SENASA (SIGSA):** Documento de Tránsito Electrónico ganadero (DT-e / DUT)
- **AGROTRAZA Provincial:** Trazabilidad fitosanitaria y ambiental (Ley Nacional 27.279)
- **Marco Normativo:** Ley Federal de Carnes N° 22.375 y Ley Provincial N° 5.893/92

---

## 🏛️ Módulos del Sistema

1. **Módulo IV: Monitor Estratégico**
   - Balance dinámico de la cadena cárnica provincial (faena local vs. ingresos de Córdoba/Santa Fe).
   - KPIs de cabezas procesadas, toneladas mensuales, operadores habilitados y decomisos.
   - Monitoreo en tiempo real de puestos de control (RN 34, RN 9, Rotonda La Banda).
   - Gráficos interactivos de flujos comerciales y composición de especies con Chart.js.

2. **Módulo I: Registro de Operadores (ROCCA)**
   - Padrón unificado de Frigoríficos (Ciclo I/II), Matarifes Abastecedores, Distribuidores, Carnicerías y Transportes.
   - Búsqueda en vivo y filtros por actividad y estado de habilitación.
   - Exportación de padrón en formato CSV.
   - Visualización y generación de credencial oficial digital con código QR de verificación.

3. **Módulos II & VII: Remitos REC y Tránsito Cárnico**
   - Validación y cruce fiscal de Remitos Electrónicos Cárnicos (ARCA).
   - Registro de conformidad de recepción y control de rechazo de mercadería.
   - Filtros por especie (Bovino, Porcino, Caprino Santiagueño, Ovino).

4. **Módulo III: Fiscalización en Ruta, Actas y Decomisos**
   - Registro oficial de actas de inspección conforme Ley Provincial 5.893/92.
   - Destino transparente de decomisos sanitarios a asociaciones protectoras de animales y refugios caninos.
   - Consulta de expedientes administrativos sancionatorios.

5. **Módulo VI: Política Productiva e Incentivos a Faena en Origen**
   - Régimen de Alícuota Cero en tasas de faena provincial.
   - Sello AGROTRAZA Sustentable y distintivos comerciales.
   - Simulador interactivo de ahorro y beneficios económicos por faena en frigoríficos locales.

6. **Módulo V: Portal Público Ciudadano "Carnicería Segura"**
   - Verificación pública instantánea por CUIT o código QR del comercio.
   - Certificado de inocuidad e información del origen de los cortes.
   - Canal de reportes confidenciales a la Dirección de Agricultura y Ganadería.

---

## 🚀 Tecnologías

- **Framework:** React 18 (TypeScript)
- **Build tool:** Vite
- **Estilos:** Tailwind CSS con paleta institucional ProCarne y Gobierno de Santiago del Estero
- **Iconografía:** Lucide React
- **Gráficos:** Chart.js
