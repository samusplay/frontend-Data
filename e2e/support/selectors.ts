/**
 * Selectores comunes del DOM para la aplicación
 */
export const selectors = {
  // Landing Page
  landingTitle: "h1:has-text('Analítica Territorial')",
  accessSystemButton: "a:has-text('Acceder al Sistema')",

  // Dashboard
  dashboardTitle: "h1:has-text('Resumen Operativo')",
  quickLinksContainer: 'text=Accesos Rápidos a Módulos',
  evaluacionLink: "a:has-text('Eval. Integral')",

  // Evaluación Integral Page
  evaluacionPageTitle: "h2:has-text('Evaluación Integral')",
  zoneTickerContainer: "[class*='ZoneTicker']",
  zoneItem: "[class*='zone-item'], [role='button'][class*='group']",
  selectedZoneIndicator: ".w-2.h-2.rounded-full.bg-emerald",

  // Score Cards
  scoreCard: "text=Valoración Actual",
  scoreValue: "text=Valoración Actual ~ .text-5xl.font-light",
  aiPredictionCard: "text=Proyección IA",
  aiPredictionValue: "text=Proyección IA ~ .text-5xl.font-light",
  aiConfidenceScore: "text=Certeza algorítmica",
  businessLabel: "[class*='text-amber'], [class*='text-emerald'], [class*='text-rose']",

  // Loading States
  loadingSpinner: ".w-10.h-10.border-4.border-zinc-900.border-t-blue-500.rounded-full.animate-spin",
  computingText: "text=Computando matrices",

  // Header Elements
  zoneNameHeader: ".text-xl.font-semibold.text-zinc-100.tracking-tight",
  modelSelector: "select",

  // Investor Context Card
  investorContextCard: "[class*='InvestorContext']",
  selectZonePrompt: "text=Selecciona una zona",

  // Error States
  errorAlert: "[class*='bg-red-500'], [role='alert']",
  errorMessage: ".text-red-400",

  // Navigation
  sidebar: "[class*='Sidebar']",
};

/**
 * Esperar a que un elemento sea visible y esté completamente estable
 */
export async function waitForElementStable(page, selector, timeout = 5000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
  await page.locator(selector).first().waitFor({ state: 'visible' });
}

/**
 * Obtener el valor de un score desde el DOM
 */
export async function getScoreValue(page, cardSelector) {
  const card = page.locator(cardSelector);
  const scoreElement = card.locator('.text-5xl.font-light, .font-mono');
  const text = await scoreElement.textContent();
  return text ? parseFloat(text) : null;
}

/**
 * Verificar que una zona esté seleccionada
 */
export async function isZoneSelected(page) {
  const indicator = page.locator(selectors.selectedZoneIndicator);
  return await indicator.isVisible();
}

/**
 * Obtener el nombre de la zona actualmente seleccionada
 */
export async function getSelectedZoneName(page) {
  const nameElement = page.locator(selectors.zoneNameHeader);
  return await nameElement.textContent();
}

/**
 * Esperar a que los datos de evaluación se carguen
 */
export async function waitForEvaluacionData(page, timeout = 10000) {
  // Esperar a que desaparezca el loading spinner
  await page.waitForSelector(selectors.loadingSpinner, { state: 'hidden', timeout });
  
  // Esperar a que aparezca el score card
  await page.waitForSelector(selectors.scoreCard, { timeout });
}

/**
 * Extraer todos los scores y valores del DOM
 */
export async function extractEvaluacionData(page) {
  const data = {
    zone_name: null,
    score_value: null,
    ai_prediction: null,
    confidence_score: null,
    business_label: null,
    rank_position: null,
  };

  // Zone name
  try {
    data.zone_name = await page.locator(selectors.zoneNameHeader).textContent();
  } catch (e) {
    console.log('Could not extract zone name');
  }

  // Score value
  try {
    const scoreText = await page.locator(selectors.scoreCard).locator('..').locator('.text-5xl.font-light').textContent();
    data.score_value = scoreText ? parseFloat(scoreText) : null;
  } catch (e) {
    console.log('Could not extract score value');
  }

  // AI Prediction
  try {
    const aiText = await page.locator(selectors.aiPredictionCard).locator('..').locator('.text-5xl.font-light').textContent();
    data.ai_prediction = aiText ? parseFloat(aiText) : null;
  } catch (e) {
    console.log('Could not extract AI prediction');
  }

  // Confidence score
  try {
    const confidenceText = await page.locator(selectors.aiConfidenceScore).textContent();
    if (confidenceText && confidenceText.includes('%')) {
      data.confidence_score = parseInt(confidenceText);
    }
  } catch (e) {
    console.log('Could not extract confidence score');
  }

  return data;
}
