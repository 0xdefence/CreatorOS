All contracts use strict JSON outputs. No markdown in model responses.

## 1) Strategist Agent Contract

### Input
- niche
- audience
- offer
- pains
- objections
- proof_assets
- channels
- tone

### Output JSON
```
{
"positioning": "string",
"pillars": ["string", "string", "string"],
"objection_map": [
{"objection": "string", "reframe": "string"}
],
"cta_map": [
{"intent": "awareness|consideration|decision", "cta": "string"}
],
"confidence": 0.0
}
```

## 2) Writer Agent Contract

### Input
- pillar
- content_goal
- channel
- tone
- offer

### Output JSON
```
{
"hooks": ["string"],
"drafts": [
{"format": "post|thread|script", "text": "string"}
],
"cta_variants": ["string", "string"],
"scores": {
"clarity": 0,
"curiosity": 0,
"relevance": 0,
"conversion_intent": 0
},
"confidence": 0.0
}
```

## 3) Repurposer Agent Contract

### Input
- source_asset
- target_channels
- voice_rules

### Output JSON
```
{
"variants": [
{"channel": "x|linkedin|instagram|tiktok|email", "text": "string"}
],
"notes": ["string"]
}
```

## 4) Engagement Agent Contract

### Input
- published_asset
- audience_segment
- goals

### Output JSON
```
{
"reply_targets": ["string"],
"comment_prompts": ["string"],
"dm_triggers": ["string"],
"daily_distribution_plan": ["string"]
}
```

## 5) Closer Assistant Contract

### Input
- dm_thread
- lead_profile
- offer

### Output JSON
```
{
"qualification_score": 0,
"fit": "low|medium|high",
"summary": {
"pain": "string",
"urgency": "string",
"objections": ["string"],
"recommended_angle": "string"
},
"next_step": "book_call|nurture|disqualify"
}
```

## 6) Analyst Agent Contract

### Input
- 7-day performance data
- lead/call/deal outcomes

### Output JSON
```
{
"winners": ["string"],
"losers": ["string"],
"insights": ["string"],
"next_tests": [
{"hypothesis": "string", "metric": "string", "timeframe_days": 7}
],
"weekly_plan": ["string"]
}
```

## 7) Safety Checker Contract

### Input
- content_text
- claim_policy

### Output JSON
```
{
"risk_level": "low|medium|high",
"violations": ["string"],
"rewrite_suggestions": ["string"],
"approved": true
}
```

## Enforcement Rules
- Reject non-JSON outputs.
- Validate schema before persistence.
- Block publish when risk_level=high or approved=false.
- Always store prompt, output, timestamp, and trace_id.
