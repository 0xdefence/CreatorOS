export function safetyChecker(content_text: string, claim_policy: string) {
  const risk = content_text.toLowerCase().includes('guarantee') ? 'high' : 'low'
  const violations = risk === 'high' ? ['no guaranteed income language'] : []
  return {
    risk_level: risk,
    violations,
    rewrite_suggestions: violations.length ? ['Rephrase claims to avoid guarantees'] : [],
    approved: risk === 'low'
  }
}
