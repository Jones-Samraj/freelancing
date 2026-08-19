// Simulated email notifier for WorkForge system alerts (auth verification, password reset, quote notifications)
export async function sendEmail({ to, subject, html, text }) {
  console.log(`[Email Service Simulation] -> To: ${to} | Subject: "${subject}"`);
  return true;
}
