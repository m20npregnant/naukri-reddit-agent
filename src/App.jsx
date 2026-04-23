import { useState } from "react";

const B = "#4A90FF";
const D = "#0B1D3A";
const A = "#FF6B35";
const S = "#F4F6FB";
const F = "'DM Sans', sans-serif";
const FS = "'Instrument Serif', serif";

const SUBREDDITS = [
  "r/india", "r/IndianWorkplace", "r/developersIndia", "r/MBA",
  "r/cscareerquestions", "r/jobs", "r/careerguidance", "r/recruiting",
  "r/antiwork", "r/layoffs", "r/Resume", "r/interviews",
  "r/marketing", "r/digitalmarketing", "r/datascience", "r/ProductManagement",
];

const STEPS = [
  { id: "crawl", label: "Surface Scan", icon: "🔍" },
  { id: "deepdive", label: "Deep Dive", icon: "🔬" },
  { id: "analyze", label: "Strategic Insights", icon: "🧠" },
  { id: "buckets", label: "Campaign Buckets", icon: "📊" },
  { id: "copy", label: "Creative Output", icon: "✍️" },
];

function Spinner({ size = 20, color = B }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" />
    </svg>
  );
}

function StepIndicator({ steps, currentStep, completedSteps }) {
  return (
    <div style={{ display: "flex", gap: 0, margin: "0 0 32px 0" }}>
      {steps.map((s, i) => {
        const active = currentStep === s.id;
        const done = completedSteps.includes(s.id);
        const past = done && !active;
        return (
          <div key={s.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {i > 0 && <div style={{ position: "absolute", top: 18, left: 0, right: "50%", height: 3, background: past || active || done ? B : "#D6DCE8", transition: "background 0.5s" }} />}
            {i < steps.length - 1 && <div style={{ position: "absolute", top: 18, left: "50%", right: 0, height: 3, background: past ? B : "#D6DCE8", transition: "background 0.5s" }} />}
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: active || done ? B : "#D6DCE8",
              color: active || done ? "#fff" : "#8896AB",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, zIndex: 2,
              boxShadow: active ? "0 0 0 5px rgba(74,144,255,0.18)" : "none",
              transition: "all 0.4s",
            }}>{done && !active ? "✓" : s.icon}</div>
            <div style={{ marginTop: 6, fontSize: 11, fontWeight: active ? 700 : 500, color: active ? D : "#8896AB", textAlign: "center", fontFamily: F }}>{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function Card({ children, style, glow }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "24px 28px",
      boxShadow: glow ? "0 0 0 2px rgba(74,144,255,0.13), 0 8px 32px rgba(74,144,255,0.10)" : "0 2px 12px rgba(11,29,58,0.06)",
      ...style,
    }}>{children}</div>
  );
}

function Tag({ children, color = B }) {
  return <span style={{ display: "inline-block", background: color + "14", color, borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 600, marginRight: 5, marginBottom: 5, fontFamily: F }}>{children}</span>;
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: "#8896AB", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10, fontFamily: F }}>{children}</div>;
}

function ThreadCard({ thread }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#F8FAFF", borderRadius: 12, padding: "14px 18px", marginBottom: 8, border: "1px solid #E8EDF5", cursor: "pointer" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: D, flex: 1, fontFamily: F }}>{thread.title}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0, marginLeft: 12 }}>
          <Tag color={thread.sentiment === "Positive" ? "#22C55E" : thread.sentiment === "Negative" ? "#EF4444" : "#F59E0B"}>{thread.sentiment}</Tag>
          <span style={{ fontSize: 11, color: "#8896AB" }}>{thread.subreddit}</span>
          <span style={{ fontSize: 14, color: "#8896AB", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#5A6B84", lineHeight: 1.7, fontFamily: F }}>
          <div style={{ marginBottom: 8 }}>{thread.summary}</div>
          <div style={{ fontSize: 11, color: "#8896AB", marginBottom: 6 }}>
            <strong>Who's talking:</strong> {thread.demographics} · <strong>Engagement:</strong> {thread.upvotes} upvotes, {thread.comments} comments
          </div>
          {thread.micro_conversations?.length > 0 && (
            <div style={{ marginTop: 8, borderTop: "1px solid #E8EDF5", paddingTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: B, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Micro-conversations inside this thread</div>
              {thread.micro_conversations.map((mc, j) => (
                <div key={j} style={{ background: "#fff", borderRadius: 8, padding: "8px 12px", marginBottom: 6, border: "1px solid #EEF1F8" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: D }}>{mc.topic}</div>
                  <div style={{ fontSize: 11, color: "#5A6B84", marginTop: 3 }}>{mc.detail}</div>
                  <div style={{ marginTop: 4 }}>{mc.specifics?.map((s, k) => <Tag key={k} color="#7C3AED">{s}</Tag>)}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 6 }}>{thread.themes?.map((t, i) => <Tag key={i}>{t}</Tag>)}</div>
        </div>
      )}
    </div>
  );
}

function DeepDiveCard({ cluster }) {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ marginBottom: 14, cursor: "pointer" }}>
      <div onClick={() => setOpen(!open)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3, fontFamily: F }}>{cluster.subculture}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: D, fontFamily: FS, marginBottom: 4 }}>{cluster.cluster_name}</div>
            <div style={{ fontSize: 12, color: "#5A6B84", lineHeight: 1.6 }}>{cluster.narrative}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: B, fontFamily: FS, marginLeft: 16, flexShrink: 0 }}>{cluster.intensity_score}<span style={{ fontSize: 11, color: "#8896AB" }}>/10</span></div>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 14, borderTop: "1px solid #F0F2F7", paddingTop: 12 }}>
          {cluster.specific_entities?.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: B, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Specific names, tools, companies mentioned</div>
              <div>{cluster.specific_entities.map((e, i) => <Tag key={i} color="#7C3AED">{e}</Tag>)}</div>
            </div>
          )}
          {cluster.verbatim_language?.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>How people actually say it</div>
              {cluster.verbatim_language.map((v, i) => (
                <div key={i} style={{ fontSize: 12, color: "#5A6B84", padding: "4px 0", borderLeft: "3px solid " + A, paddingLeft: 10, marginBottom: 4, fontStyle: "italic" }}>"{v}"</div>
              ))}
            </div>
          )}
          {cluster.tension && (
            <div style={{ background: "#FFF7ED", borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Core tension</div>
              <div style={{ fontSize: 12, color: D, fontWeight: 500 }}>{cluster.tension}</div>
            </div>
          )}
          {cluster.naukri_entry_point && (
            <div style={{ background: "#EFF6FF", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: B, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Naukri entry point</div>
              <div style={{ fontSize: 12, color: D, fontWeight: 500 }}>{cluster.naukri_entry_point}</div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function BucketCard({ bucket, onDrillDown, isLoading }) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 3, fontFamily: F }}>{bucket.pillar}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: D, marginBottom: 4, fontFamily: FS }}>{bucket.title}</div>
          <div style={{ fontSize: 13, color: "#5A6B84", lineHeight: 1.7, marginBottom: 8, fontFamily: F }}>{bucket.insight}</div>
          {bucket.human_truth && (
            <div style={{ background: "#FFF7ED", borderRadius: 8, padding: "8px 12px", marginBottom: 8, fontSize: 12, color: D, fontStyle: "italic", borderLeft: "3px solid " + A }}>
              "{bucket.human_truth}"
            </div>
          )}
          <div style={{ marginBottom: 6 }}>{bucket.keywords?.map((k, i) => <Tag key={i}>{k}</Tag>)}</div>
          {bucket.reddit_proof && <div style={{ fontSize: 11, color: "#8896AB" }}>📍 Reddit proof: {bucket.reddit_proof}</div>}
        </div>
        <button onClick={() => onDrillDown(bucket)} disabled={isLoading} style={{
          background: B, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13,
          fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer", whiteSpace: "nowrap",
          opacity: isLoading ? 0.6 : 1, fontFamily: F, display: "flex", alignItems: "center", gap: 6, marginLeft: 16, flexShrink: 0,
        }}>
          {isLoading ? <Spinner size={14} /> : null}
          Double Click →
        </button>
      </div>
    </Card>
  );
}

function CopyOutput({ copyData }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const handleCopy = (text, idx) => { navigator.clipboard.writeText(text); setCopiedIdx(idx); setTimeout(() => setCopiedIdx(null), 1500); };
  return (
    <div>
      {copyData.map((theme, i) => (
        <Card key={i} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 3, fontFamily: F }}>{theme.format}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: D, marginBottom: 3, fontFamily: FS }}>{theme.headline}</div>
          <div style={{ fontSize: 12, color: "#8896AB", marginBottom: 6, fontFamily: F }}>Target: {theme.audience} · Tone: {theme.tone}</div>
          {theme.creative_direction && <div style={{ fontSize: 12, color: "#5A6B84", marginBottom: 12, lineHeight: 1.6, fontStyle: "italic", borderLeft: "3px solid " + B, paddingLeft: 10 }}>{theme.creative_direction}</div>}
          {theme.copies?.map((copy, j) => (
            <div key={j} style={{ background: "#F4F6FB", borderRadius: 10, padding: "14px 18px", marginBottom: 10, position: "relative", border: "1px solid #E8EDF5" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: B, marginBottom: 4, fontFamily: F }}>{copy.variant}</div>
              {copy.hook && <div style={{ fontSize: 11, color: "#7C3AED", marginBottom: 6, fontWeight: 600 }}>Hook: {copy.hook}</div>}
              <div style={{ fontSize: 14, color: D, lineHeight: 1.7, fontFamily: F, whiteSpace: "pre-wrap" }}>{copy.text}</div>
              {copy.cta && <div style={{ marginTop: 10, display: "inline-block", background: B, color: "#fff", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, fontFamily: F }}>{copy.cta}</div>}
              {copy.visual_note && <div style={{ marginTop: 8, fontSize: 11, color: "#8896AB", fontStyle: "italic" }}>🎨 Visual: {copy.visual_note}</div>}
              <button onClick={() => handleCopy(copy.text + (copy.cta ? "\n\nCTA: " + copy.cta : ""), i + "-" + j)} style={{
                position: "absolute", top: 12, right: 12, background: copiedIdx === i + "-" + j ? "#22C55E" : "#E8EDF5",
                border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer",
                color: copiedIdx === i + "-" + j ? "#fff" : "#5A6B84", fontWeight: 600, fontFamily: F,
              }}>{copiedIdx === i + "-" + j ? "Copied!" : "Copy"}</button>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

// ========== AI PIPELINE ==========

async function callClaude(systemPrompt, userPrompt) {
  const resp = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: systemPrompt + "\n\nCRITICAL: Keep string values concise (1-2 sentences max per field). Ensure your entire JSON response is complete and valid. Do NOT let any string exceed 200 characters. Prioritize completing the JSON structure over verbosity.",
      user: userPrompt,
      max_tokens: 16000,
    }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error || "API request failed with status " + resp.status);
  }

  const data = await resp.json();
  const text = data.content?.map(c => c.text || "").join("\n") || "";
  let cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

  try { return JSON.parse(cleaned); } catch (e) { /* attempt repair */ }

  let repaired = cleaned;
  repaired = repaired.replace(/,\s*"[^"]*"?\s*:?\s*"?[^"{}[\]]*$/, "");
  const quoteCount = (repaired.match(/(?<!\\)"/g) || []).length;
  if (quoteCount % 2 !== 0) repaired += '"';
  let opens = 0, closes = 0;
  for (const ch of repaired) { if (ch === "[") opens++; if (ch === "]") closes++; }
  let objOpens = 0, objCloses = 0;
  for (const ch of repaired) { if (ch === "{") objOpens++; if (ch === "}") objCloses++; }
  repaired = repaired.replace(/,\s*$/, "");
  for (let i = 0; i < objOpens - objCloses; i++) repaired += "}";
  for (let i = 0; i < opens - closes; i++) repaired += "]";

  try { return JSON.parse(repaired); } catch (e2) {
    const arrayMatch = repaired.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try { return JSON.parse(arrayMatch[0]); } catch (e3) {}
      let arr = arrayMatch[0];
      const lastComma = arr.lastIndexOf("},");
      if (lastComma > 0) {
        arr = arr.substring(0, lastComma + 1) + "]";
        try { return JSON.parse(arr); } catch (e4) {}
      }
    }
    const objMatch = repaired.match(/\{[\s\S]*\}/);
    if (objMatch) {
      try { return JSON.parse(objMatch[0]); } catch (e5) {}
    }
    throw new Error("Could not parse AI response. Retrying may help — click Run again.");
  }
}

async function surfaceScan(subreddits) {
  const sys = `You are an ethnographic researcher embedded in Reddit communities for Naukri.com, India's #1 job platform. Your job is NOT to summarize threads — it's to find the SPECIFIC, GRANULAR conversations happening inside career subreddits that reveal what people actually do, use, fear, and want.

IMPORTANT: Don't give generic themes like "people are frustrated with hiring." Instead, find the EXACT things: which companies, which tools, which salary ranges, which cities, which job titles, which interview formats, which LinkedIn behaviors, which side-hustles. Specificity is everything.

Return ONLY valid JSON. Array of 6 threads:
{
  "title": "exact thread title",
  "subreddit": "r/subredditname",
  "upvotes": number,
  "comments": number,
  "summary": "What's actually being discussed with specifics",
  "sentiment": "Positive" | "Negative" | "Mixed",
  "themes": ["specific theme 1", "specific theme 2"],
  "demographics": "Exact profile of who is posting",
  "micro_conversations": [
    {
      "topic": "Specific sub-discussion in comments",
      "detail": "What exactly people are saying",
      "specifics": ["Named tool/company/number"]
    }
  ],
  "emotional_undercurrent": "The unspoken feeling beneath this thread"
}

Think like a journalist reading comment sections, not a content summarizer.`;

  const user = `Deep-scan these subreddits: ${subreddits.join(", ")}

For EACH subreddit, find what specific conversations are happening. Examples of depth needed:
- Marketing sub: "performance marketers debating Meta Advantage+ killing A/B testing, sharing exact ROAS numbers"
- Developer sub: "candidates sharing Flipkart's DSA round now includes graph problems, recommending Striver's sheet over Leetcode premium"
- Career sub: "28-year-old CAs asking about switching to FP&A roles in tech, sharing CA-to-tech pivot stories"

Generate 6 threads with this granularity.`;

  return callClaude(sys, user);
}

async function deepDive(threads) {
  const sys = `You are a cultural intelligence analyst for Naukri.com. Identify CONVERSATION CLUSTERS from Reddit threads — groups of micro-discussions revealing a subculture's behavior, language, and unmet needs.

SYNTHESIZE across threads to find:
1. SPECIFIC ENTITIES by name (tools, companies, certifications, salary bands)
2. ACTUAL LANGUAGE people use (slang, abbreviations)
3. TENSIONS where community is genuinely split
4. BEHAVIORAL PATTERNS — what people DO, not what they say

Return ONLY valid JSON. Array of 4 conversation clusters:
{
  "cluster_name": "Sharp specific name",
  "subculture": "Exactly who",
  "narrative": "The story this cluster tells (2-3 sentences)",
  "intensity_score": 8,
  "specific_entities": ["Entity 1", "Entity 2", "Entity 3"],
  "verbatim_language": ["Actual phrases used"],
  "tension": "Where community is divided",
  "behavioral_signals": ["What people actually DO"],
  "naukri_entry_point": "How Naukri enters this conversation specifically"
}`;

  const user = `Synthesize into conversation clusters. Each cluster must be specific enough for a copywriter to write an ad from it alone.

Threads:\n${JSON.stringify(threads, null, 2)}`;

  return callClaude(sys, user);
}

async function strategicInsights(threads, clusters) {
  const sys = `You are the Chief Strategy Officer advising Naukri.com's brand team. Extract STRATEGIC INSIGHTS — not summaries, but insights that make a CMO rethink their brand.

Return ONLY valid JSON. Keep each string value under 150 chars. Provide exactly 3 strategic_tensions, 3 audience_psychographics, 2 white_spaces, 2 cultural_currents:
{
  "overallSentiment": { "positive": number, "negative": number, "mixed": number },
  "strategic_tensions": [
    { "tension": "Fundamental market tension", "evidence": "Proof from conversations", "brand_implication": "What it means for Naukri", "cultural_context": "Deeper cultural force" }
  ],
  "audience_psychographics": [
    { "segment": "Sharp segment name", "who": "Demographics + psychographics", "inner_monologue": "First person thought", "trigger_moments": ["When they'd be receptive"], "language_they_use": ["Their vocabulary"] }
  ],
  "white_spaces": [
    { "gap": "What nobody does well", "evidence": "Reddit proof", "opportunity_size": "How big" }
  ],
  "cultural_currents": [
    { "current": "Cultural shift affecting careers", "how_it_shows_up": "Reddit evidence", "brand_opportunity": "How Naukri rides this" }
  ]
}`;

  const threadSummary = threads.map(t => ({ title: t.title, sub: t.subreddit, summary: t.summary, sentiment: t.sentiment, themes: t.themes, demographics: t.demographics }));
  const user = `Extract strategic insights:\n\nThreads:\n${JSON.stringify(threadSummary)}\n\nClusters:\n${JSON.stringify(clusters)}`;

  return callClaude(sys, user);
}

async function campaignBuckets(analysis, clusters) {
  const sys = `You are an Executive Creative Director building campaign platforms for Naukri.com with deep Reddit cultural intelligence.

Return ONLY valid JSON — array of 4 buckets:
{
  "pillar": "Brand territory",
  "title": "Evocative campaign platform name",
  "human_truth": "Raw honest thing people feel — like a confession",
  "insight": "Strategic insight connecting truth to brand opportunity",
  "target_subculture": "Which Reddit subculture",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "reddit_proof": "Which conversations prove this",
  "emotional_territory": "Exact emotional space",
  "creative_springboards": ["Execution idea 1", "Execution idea 2"],
  "messaging_direction": "Tone, voice, strategic direction"
}`;

  const clusterSummary = clusters.map(c => ({ name: c.cluster_name, sub: c.subculture, tension: c.tension, entities: c.specific_entities, entry: c.naukri_entry_point }));
  const user = `Build 4 campaign buckets:\n\nAnalysis:\n${JSON.stringify(analysis)}\n\nClusters:\n${JSON.stringify(clusterSummary)}`;

  return callClaude(sys, user);
}

async function creativeOutput(bucket, analysis, clusters) {
  const sys = `You are the best copywriter Naukri.com has ever hired. Your copy sounds like truth, not advertising.

Return ONLY valid JSON — array of 3 themes:
{
  "headline": "Sharp memorable campaign line",
  "format": "Platform (Instagram Reel, YouTube 15s, LinkedIn, Metro Billboard, Twitter/X, WhatsApp Status)",
  "audience": "Specific audience",
  "tone": "Exact tone description",
  "creative_direction": "How this should FEEL as an ad",
  "copies": [
    { "variant": "Strategic approach name", "hook": "First line that stops the scroll", "text": "Full copy in audience language", "cta": "Call to action", "visual_note": "What viewer sees" }
  ]
}

Rules: Use actual Reddit language. Every hook must stop scrolling. CTA = friend's advice, not sales pitch.`;

  const clusterBrief = clusters.map(c => ({ name: c.cluster_name, language: c.verbatim_language, tension: c.tension }));
  const user = `Create 3 campaign themes:\n\nBucket:\n${JSON.stringify(bucket)}\n\nPsychographics:\n${JSON.stringify(analysis.audience_psychographics || [])}\n\nCulture:\n${JSON.stringify(clusterBrief)}`;

  return callClaude(sys, user);
}

// ========== MAIN COMPONENT ==========

export default function App() {
  const [selectedSubs, setSelectedSubs] = useState(["r/india", "r/IndianWorkplace", "r/developersIndia", "r/jobs", "r/careerguidance"]);
  const [customSubs, setCustomSubs] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [subTab, setSubTab] = useState("suggested");
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [threads, setThreads] = useState(null);
  const [clusters, setClusters] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [buckets, setBuckets] = useState(null);
  const [copyData, setCopyData] = useState({});
  const [loadingCopy, setLoadingCopy] = useState(null);
  const [error, setError] = useState(null);
  const [log, setLog] = useState([]);

  const addLog = (msg) => setLog(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  const toggleSub = (sub) => setSelectedSubs(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);

  const addCustomSub = () => {
    let val = customInput.trim();
    if (!val) return;
    if (!val.startsWith("r/")) val = "r/" + val;
    if (!selectedSubs.includes(val) && !customSubs.includes(val)) {
      setCustomSubs(prev => [...prev, val]);
      setSelectedSubs(prev => [...prev, val]);
    }
    setCustomInput("");
  };

  const removeCustomSub = (sub) => {
    setCustomSubs(prev => prev.filter(s => s !== sub));
    setSelectedSubs(prev => prev.filter(s => s !== sub));
  };

  const runPipeline = async () => {
    setError(null); setLog([]); setThreads(null); setClusters(null); setAnalysis(null); setBuckets(null); setCopyData({}); setCompletedSteps([]);
    try {
      setCurrentStep("crawl");
      addLog("Step 1/4 · Surface scanning " + selectedSubs.length + " subreddits...");
      const t = await surfaceScan(selectedSubs);
      setThreads(t);
      setCompletedSteps(["crawl"]);
      addLog("Found " + t.length + " threads with " + t.reduce((a, x) => a + (x.micro_conversations?.length || 0), 0) + " micro-conversations");

      setCurrentStep("deepdive");
      addLog("Step 2/4 · Deep diving into conversation clusters...");
      const c = await deepDive(t);
      setClusters(c);
      setCompletedSteps(["crawl", "deepdive"]);
      addLog("Identified " + c.length + " conversation clusters with " + c.reduce((a, x) => a + (x.specific_entities?.length || 0), 0) + " named entities");

      setCurrentStep("analyze");
      addLog("Step 3/4 · Extracting strategic insights...");
      const a = await strategicInsights(t, c);
      setAnalysis(a);
      setCompletedSteps(["crawl", "deepdive", "analyze"]);
      addLog("Mapped " + (a.strategic_tensions?.length || 0) + " tensions, " + (a.audience_psychographics?.length || 0) + " segments, " + (a.white_spaces?.length || 0) + " white spaces");

      setCurrentStep("buckets");
      addLog("Step 4/4 · Building campaign buckets...");
      const b = await campaignBuckets(a, c);
      setBuckets(b);
      setCompletedSteps(["crawl", "deepdive", "analyze", "buckets"]);
      addLog("Created " + b.length + " campaign platforms — click 'Double Click' to generate creative");
      setCurrentStep("buckets");
    } catch (err) {
      setError(err.message);
      addLog("Error: " + err.message);
    }
  };

  const handleDrillDown = async (bucket) => {
    setLoadingCopy(bucket.title);
    try {
      addLog('Generating creative for "' + bucket.title + '"...');
      const copy = await creativeOutput(bucket, analysis, clusters);
      setCopyData(prev => ({ ...prev, [bucket.title]: copy }));
      setCompletedSteps(prev => prev.includes("copy") ? prev : [...prev, "copy"]);
      setCurrentStep("copy");
      addLog("Generated " + copy.length + " creative themes");
    } catch (err) { setError(err.message); }
    setLoadingCopy(null);
  };

  const isRunning = currentStep !== null && !completedSteps.includes("buckets");

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, " + D + " 0%, #132B52 35%, " + S + " 35.5%)", fontFamily: F }}>
      <div style={{ padding: "36px 40px 60px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg, #4A90FF, #FF6B35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff" }}>N</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: FS, letterSpacing: -0.5 }}>Naukri Reddit Insights Agent</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Ethnographic intelligence → Strategic insights → Campaign-ready creative</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "-24px auto 0", padding: "0 24px 60px" }}>
        <Card glow style={{ marginBottom: 28, animation: "fadeUp 0.5s ease-out" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: D, marginBottom: 14, fontFamily: FS }}>Select Subreddits to Crawl</div>
          <div style={{ display: "flex", gap: 0, marginBottom: 18, borderBottom: "2px solid #E8EDF5" }}>
            {[{ id: "suggested", label: "Suggested" }, { id: "custom", label: "Add Custom" }].map(tab => (
              <button key={tab.id} onClick={() => setSubTab(tab.id)} style={{
                background: "none", border: "none", borderBottom: subTab === tab.id ? "2px solid " + B : "2px solid transparent",
                padding: "8px 20px", fontSize: 13, fontWeight: subTab === tab.id ? 700 : 500,
                color: subTab === tab.id ? B : "#8896AB", cursor: "pointer", marginBottom: -2, fontFamily: F,
              }}>{tab.label}</button>
            ))}
          </div>
          {subTab === "suggested" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {SUBREDDITS.map(sub => (
                <button key={sub} onClick={() => toggleSub(sub)} style={{
                  background: selectedSubs.includes(sub) ? B : "#F4F6FB", color: selectedSubs.includes(sub) ? "#fff" : "#5A6B84",
                  border: "1.5px solid " + (selectedSubs.includes(sub) ? B : "#D6DCE8"), borderRadius: 10,
                  padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F,
                }}>{sub}</button>
              ))}
            </div>
          )}
          {subTab === "custom" && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#8896AB", fontWeight: 600, pointerEvents: "none" }}>r/</span>
                  <input type="text" value={customInput} onChange={e => setCustomInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustomSub()}
                    placeholder="e.g. ProgrammerHumor, startups" style={{
                      width: "100%", padding: "10px 14px 10px 32px", border: "1.5px solid #D6DCE8", borderRadius: 10,
                      fontSize: 14, fontFamily: F, color: D, outline: "none", background: "#F8FAFF",
                    }} />
                </div>
                <button onClick={addCustomSub} style={{ background: B, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F }}>+ Add</button>
              </div>
              {customSubs.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {customSubs.map(sub => (
                    <div key={sub} style={{ display: "flex", alignItems: "center", gap: 6, background: A + "14", color: A, borderRadius: 10, padding: "6px 10px 6px 14px", fontSize: 13, fontWeight: 600, fontFamily: F }}>
                      {sub}
                      <button onClick={() => removeCustomSub(sub)} style={{ background: "none", border: "none", color: A, cursor: "pointer", fontSize: 16, padding: "0 2px", fontWeight: 700 }}>×</button>
                    </div>
                  ))}
                </div>
              ) : <div style={{ fontSize: 12, color: "#B0BFCF" }}>Type a subreddit name and press Enter</div>}
            </div>
          )}
          <div style={{ fontSize: 12, color: "#8896AB", marginBottom: 14 }}>
            {selectedSubs.length} selected{selectedSubs.length > 0 && <span style={{ color: "#B0BFCF" }}> · {selectedSubs.join(", ")}</span>}
          </div>
          <button onClick={runPipeline} disabled={isRunning || selectedSubs.length === 0} style={{
            background: "linear-gradient(135deg, " + B + ", #2563EB)", color: "#fff", border: "none", borderRadius: 12,
            padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: isRunning || selectedSubs.length === 0 ? "not-allowed" : "pointer",
            opacity: isRunning || selectedSubs.length === 0 ? 0.6 : 1, fontFamily: F, boxShadow: "0 4px 16px rgba(74,144,255,0.3)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            {isRunning ? <><Spinner size={16} /> Running Pipeline...</> : <>🚀 Run Full Pipeline</>}
          </button>
        </Card>

        {currentStep && <div style={{ animation: "fadeUp 0.5s ease-out" }}><StepIndicator steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} /></div>}

        {log.length > 0 && (
          <Card style={{ marginBottom: 24 }}>
            <SectionLabel>Agent Log</SectionLabel>
            <div style={{ maxHeight: 120, overflowY: "auto" }}>
              {log.map((l, i) => <div key={i} style={{ fontSize: 12, color: "#5A6B84", padding: "3px 0", fontFamily: "monospace" }}><span style={{ color: "#B0BFCF" }}>{l.time}</span> {l.msg}</div>)}
            </div>
          </Card>
        )}

        {error && <Card style={{ marginBottom: 24, borderLeft: "4px solid #EF4444" }}><div style={{ color: "#EF4444", fontWeight: 600, fontSize: 14 }}>Error: {error}</div></Card>}

        {threads && (
          <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: D, marginBottom: 4, fontFamily: FS }}>🔍 Surface Scan</div>
            <div style={{ fontSize: 12, color: "#8896AB", marginBottom: 14 }}>{threads.length} threads crawled · Click any to see micro-conversations</div>
            {threads.map((t, i) => <ThreadCard key={i} thread={t} />)}
          </div>
        )}

        {clusters && (
          <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: D, marginBottom: 4, fontFamily: FS }}>🔬 Deep Dive Clusters</div>
            <div style={{ fontSize: 12, color: "#8896AB", marginBottom: 14 }}>Conversation clusters synthesized across threads · Click to expand</div>
            {clusters.map((c, i) => <DeepDiveCard key={i} cluster={c} />)}
          </div>
        )}

        {analysis && (
          <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: D, marginBottom: 14, fontFamily: FS }}>🧠 Strategic Insights</div>
            <Card style={{ marginBottom: 16 }}>
              <SectionLabel>Overall Sentiment</SectionLabel>
              <div style={{ display: "flex", gap: 24 }}>
                {Object.entries(analysis.overallSentiment || {}).map(([key, val]) => (
                  <div key={key} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, fontFamily: FS, color: key === "positive" ? "#22C55E" : key === "negative" ? "#EF4444" : "#F59E0B" }}>{val}%</div>
                    <div style={{ fontSize: 12, color: "#8896AB", textTransform: "capitalize" }}>{key}</div>
                  </div>
                ))}
              </div>
            </Card>
            {analysis.strategic_tensions?.length > 0 && (
              <Card style={{ marginBottom: 16 }}>
                <SectionLabel>Strategic Tensions</SectionLabel>
                {analysis.strategic_tensions.map((t, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < analysis.strategic_tensions.length - 1 ? "1px solid #F0F2F7" : "none" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: D, marginBottom: 4 }}>⚡ {t.tension}</div>
                    <div style={{ fontSize: 12, color: "#5A6B84", marginBottom: 4, lineHeight: 1.6 }}>{t.evidence}</div>
                    {t.cultural_context && <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 500 }}>Cultural context: {t.cultural_context}</div>}
                    <div style={{ fontSize: 12, color: B, marginTop: 4, fontWeight: 600 }}>Brand implication: {t.brand_implication}</div>
                  </div>
                ))}
              </Card>
            )}
            {analysis.audience_psychographics?.length > 0 && (
              <Card style={{ marginBottom: 16 }}>
                <SectionLabel>Audience Psychographics</SectionLabel>
                {analysis.audience_psychographics.map((p, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < analysis.audience_psychographics.length - 1 ? "1px solid #F0F2F7" : "none" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: D, fontFamily: FS }}>{p.segment}</div>
                    <div style={{ fontSize: 12, color: "#5A6B84", marginTop: 2, marginBottom: 6 }}>{p.who}</div>
                    {p.inner_monologue && (
                      <div style={{ background: "#F8FAFF", borderRadius: 8, padding: "10px 14px", borderLeft: "3px solid " + B, marginBottom: 8, fontSize: 12, color: D, fontStyle: "italic", lineHeight: 1.6 }}>"{p.inner_monologue}"</div>
                    )}
                    {p.trigger_moments?.length > 0 && (
                      <div style={{ marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 1 }}>Trigger moments: </span>
                        {p.trigger_moments.map((t, j) => <Tag key={j} color={A}>{t}</Tag>)}
                      </div>
                    )}
                    {p.language_they_use?.length > 0 && <div>{p.language_they_use.map((l, j) => <Tag key={j} color="#7C3AED">{l}</Tag>)}</div>}
                  </div>
                ))}
              </Card>
            )}
            {analysis.white_spaces?.length > 0 && (
              <Card style={{ marginBottom: 16 }}>
                <SectionLabel>White Spaces — Opportunities Nobody Owns</SectionLabel>
                {analysis.white_spaces.map((w, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < analysis.white_spaces.length - 1 ? "1px solid #F0F2F7" : "none" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: D }}>🎯 {w.gap}</div>
                    <div style={{ fontSize: 12, color: "#5A6B84", marginTop: 4 }}>{w.evidence}</div>
                    <div style={{ fontSize: 12, color: "#22C55E", marginTop: 4, fontWeight: 600 }}>Opportunity: {w.opportunity_size}</div>
                  </div>
                ))}
              </Card>
            )}
            {analysis.cultural_currents?.length > 0 && (
              <Card style={{ marginBottom: 16 }}>
                <SectionLabel>Cultural Currents</SectionLabel>
                {analysis.cultural_currents.map((c, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: i < analysis.cultural_currents.length - 1 ? "1px solid #F0F2F7" : "none" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: D }}>🌊 {c.current}</div>
                    <div style={{ fontSize: 12, color: "#5A6B84", marginTop: 4 }}>{c.how_it_shows_up}</div>
                    <div style={{ fontSize: 12, color: B, marginTop: 4, fontWeight: 600 }}>{c.brand_opportunity}</div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        )}

        {buckets && (
          <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: D, marginBottom: 4, fontFamily: FS }}>📊 Campaign Buckets</div>
            <div style={{ fontSize: 12, color: "#8896AB", marginBottom: 16 }}>Click "Double Click →" to generate production-ready creative.</div>
            {buckets.map((b, i) => <BucketCard key={i} bucket={b} onDrillDown={handleDrillDown} isLoading={loadingCopy === b.title} />)}
          </div>
        )}

        {Object.keys(copyData).length > 0 && (
          <div style={{ animation: "fadeUp 0.5s ease-out", marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: D, marginBottom: 14, fontFamily: FS }}>✍️ Creative Output</div>
            {Object.entries(copyData).map(([title, themes]) => (
              <div key={title} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: A, marginBottom: 12, padding: "8px 16px", background: A + "0D", borderRadius: 10, display: "inline-block", fontFamily: F }}>{title}</div>
                <CopyOutput copyData={themes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
