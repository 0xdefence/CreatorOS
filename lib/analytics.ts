export type PerformanceRecord = {
  contentId: string
  impressions: number
  clicks: number
  inbound: number
  booked: number
  revenue: number
}

const history: PerformanceRecord[] = []

export function logPerformance(record: PerformanceRecord) {
  history.push(record)
}

export function weeklyReport() {
  const winners = history.filter((item) => item.booked > 0 && item.revenue > 0).map((item) => item.contentId)
  const losers = history.filter((item) => item.revenue === 0).map((item) => item.contentId)
  const insights = ['Focus on formats that booked calls', 'Boost assets with high clicks but no booked calls']
  const next_tests = [
    { hypothesis: 'Short video boosts inbound', metric: 'inbound', timeframe_days: 7 }
  ]
  const weekly_plan = ['Follow-up with booked leads', 'Kill low-performing formats']
  return { winners, losers, insights, next_tests, weekly_plan }
}
