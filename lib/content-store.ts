export type ContentAsset = {
  id: string
  pillar: string
  channel: string
  format: string
  text: string
  status: 'draft' | 'approved'
  clarity: number
  curiosity: number
  relevance: number
  conversion_intent: number
  createdAt: string
}

const assets: ContentAsset[] = []

export function saveAsset(asset: ContentAsset) {
  assets.push(asset)
}

export function listAssets() {
  return [...assets]
}
