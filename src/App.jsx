import { useState, useRef } from 'react'
import axios from 'axios'
import {
  Activity, Heart, Sparkles, ArrowLeft, Info,
  ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [step, setStep] = useState('welcome')
  const [track, setTrack] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const [form, setForm] = useState({
    gender: 'Female',
    age: 45,
    bmi: 25,
    hypertension: 0,
    heart_disease: 0,
    smoking_history: 'never',
    HbA1c_level: 5.7,
    blood_glucose_level: 100,
  })

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleTrackSelect = (t) => { setTrack(t); setStep('input') }

  const handlePredict = async () => {
    setLoading(true)
    try {
      const endpoint = track === 'pre_lab' ? '/predict/pre-lab' : '/predict/post-lab'
      const payload = track === 'pre_lab'
        ? {
            gender: form.gender, age: form.age, bmi: form.bmi,
            hypertension: form.hypertension, heart_disease: form.heart_disease,
            smoking_history: form.smoking_history,
          }
        : form
      const res = await axios.post(`${API_URL}${endpoint}`, payload)
      setResult(res.data)
      setStep('result')
    } catch (err) {
      alert('Prediction failed. Make sure the backend is running on port 8000.\n\n' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => { setStep('welcome'); setTrack(null); setResult(null) }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="blur-orb w-96 h-96 bg-glumina-lavender opacity-40 -top-20 -left-20"></div>
      <div className="blur-orb w-[500px] h-[500px] bg-glumina-blue opacity-30 top-1/3 -right-40"></div>
      <div className="blur-orb w-80 h-80 bg-glumina-purple opacity-30 bottom-0 left-1/4"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 py-8 sm:p-8 md:p-12">
        {step === 'welcome' && <WelcomeScreen onSelectTrack={handleTrackSelect} />}
        {step === 'input' && (
          <InputScreen track={track} form={form} updateForm={updateForm}
            onPredict={handlePredict} onBack={handleReset} loading={loading} />
        )}
        {step === 'result' && (
          <ResultScreen result={result} onReset={handleReset} track={track} />
        )}
      </div>
    </div>
  )
}

// ============================================================
// WELCOME SCREEN
// ============================================================
function WelcomeScreen({ onSelectTrack }) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/80 backdrop-blur-xl shadow-glow mb-6">
          <Sparkles className="w-10 h-10 text-glumina-navy" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-glumina-navy mb-4 tracking-tight">
          Glumina
        </h1>
        <p className="text-glumina-blue text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto px-4">
          A gentle approach to understanding your diabetes risk
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <button onClick={() => onSelectTrack('pre_lab')}
          className="group glass-strong rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-glumina-lavender to-glumina-blue mb-6 mx-auto">
            <Activity className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-display text-2xl font-semibold text-glumina-navy mb-3">
            Pre-Lab Screening
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Quick assessment without lab tests. Recommended for initial screening.
          </p>
          <div className="flex items-center justify-center text-glumina-blue font-medium text-sm group-hover:translate-x-1 transition-transform">
            Start screening <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </button>

        <button onClick={() => onSelectTrack('post_lab')}
          className="group glass-strong rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-glumina-blue to-glumina-navy mb-6 mx-auto">
            <Heart className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-display text-2xl font-semibold text-glumina-navy mb-3">
            Post-Lab Analysis
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Detailed prediction using your lab results. Higher accuracy.
          </p>
          <div className="flex items-center justify-center text-glumina-blue font-medium text-sm group-hover:translate-x-1 transition-transform">
            Begin analysis <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </button>
      </div>

      <div className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-slate-500 text-xs">
        <Info className="w-3.5 h-3.5" />
        Educational tool only. Not a medical diagnosis.
      </div>
    </div>
  )
}

// ============================================================
// INPUT SCREEN
// ============================================================
function InputScreen({ track, form, updateForm, onPredict, onBack, loading }) {
  const isPreLab = track === 'pre_lab'
  return (
    <div className="w-full max-w-2xl mx-auto">
      <button onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-glumina-blue hover:text-glumina-navy transition-colors font-medium text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-glumina-navy mb-2">
            {isPreLab ? 'Pre-Lab Screening' : 'Post-Lab Analysis'}
          </h2>
          <p className="text-slate-500 text-sm">
            {isPreLab ? 'Quick assessment using basic information' : 'Comprehensive analysis with lab results'}
          </p>
        </div>

        <div className="space-y-6">
          <FormSection label="Gender">
            <div className="grid grid-cols-2 gap-3">
              {['Female', 'Male'].map(g => (
                <button key={g} onClick={() => updateForm('gender', g)}
                  className={`py-3 px-4 rounded-2xl text-sm font-medium transition-all ${
                    form.gender === g
                      ? 'bg-gradient-to-r from-glumina-blue to-glumina-navy text-white shadow-glow'
                      : 'bg-white/60 text-slate-600 hover:bg-white/80 border border-white'
                  }`}>{g}</button>
              ))}
            </div>
          </FormSection>

          <FormSection label="Age" value={`${form.age} years`}>
            <input type="range" min="1" max="120" value={form.age}
              onChange={(e) => updateForm('age', parseInt(e.target.value))} />
          </FormSection>

          <BmiInput form={form} updateForm={updateForm} />

          <FormSection label="Hypertension">
            <ToggleButtons value={form.hypertension} onChange={(v) => updateForm('hypertension', v)} />
          </FormSection>

          <FormSection label="Heart Disease">
            <ToggleButtons value={form.heart_disease} onChange={(v) => updateForm('heart_disease', v)} />
          </FormSection>

          <FormSection label="Smoking History">
            <select value={form.smoking_history}
              onChange={(e) => updateForm('smoking_history', e.target.value)}
              className="w-full py-3 px-4 rounded-2xl bg-white/60 border border-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-glumina-blue focus:bg-white/80">
              <option value="never">Never smoked</option>
              <option value="current">Current smoker</option>
              <option value="former">Former smoker</option>
              <option value="ever">Ever smoked</option>
              <option value="not current">Not current</option>
              <option value="No Info">Prefer not to say</option>
            </select>
          </FormSection>

          {!isPreLab && (
            <FormSection label="HbA1c Level" value={`${form.HbA1c_level.toFixed(1)} %`}>
              <input type="range" min="3" max="15" step="0.1" value={form.HbA1c_level}
                onChange={(e) => updateForm('HbA1c_level', parseFloat(e.target.value))} />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Normal &lt;5.7</span><span>Pre 5.7-6.4</span><span>Diabetes &ge;6.5</span>
              </div>
            </FormSection>
          )}

          {!isPreLab && (
            <FormSection label="Blood Glucose Level" value={`${Math.round(form.blood_glucose_level)} mg/dL`}>
              <input type="range" min="50" max="400" step="1" value={form.blood_glucose_level}
                onChange={(e) => updateForm('blood_glucose_level', parseInt(e.target.value))} />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Normal &lt;100</span><span>Pre 100-125</span><span>Diabetes &ge;126</span>
              </div>
            </FormSection>
          )}

          <button onClick={onPredict} disabled={loading}
            className="w-full mt-4 py-4 px-8 rounded-2xl bg-gradient-to-r from-glumina-blue to-glumina-navy text-white font-semibold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyzing...</>
            ) : (
              <>Predict Risk <Sparkles className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// BMI INPUT (Direct or Height+Weight)
// ============================================================
function BmiInput({ form, updateForm }) {
  const [mode, setMode] = useState('direct')
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)

  const updateFromHW = (h, w) => {
    setHeight(h); setWeight(w)
    const bmi = w / ((h / 100) ** 2)
    updateForm('bmi', parseFloat(bmi.toFixed(1)))
  }

  const cat = form.bmi < 18.5 ? { label: 'Underweight', color: 'text-blue-500' }
    : form.bmi < 25 ? { label: 'Normal', color: 'text-emerald-500' }
    : form.bmi < 30 ? { label: 'Overweight', color: 'text-amber-500' }
    : { label: 'Obese', color: 'text-rose-500' }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-glumina-navy">BMI</label>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${cat.color}`}>{cat.label}</span>
          <span className="text-sm font-medium text-glumina-blue bg-white/60 px-3 py-1 rounded-full">
            {form.bmi.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-white/40 rounded-2xl">
        <button type="button" onClick={() => setMode('direct')}
          className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
            mode === 'direct' ? 'bg-white text-glumina-navy shadow-sm' : 'text-slate-500'
          }`}>I know my BMI</button>
        <button type="button" onClick={() => setMode('calculate')}
          className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
            mode === 'calculate' ? 'bg-white text-glumina-navy shadow-sm' : 'text-slate-500'
          }`}>Height &amp; weight</button>
      </div>

      {mode === 'direct' && (
        <input type="range" min="10" max="70" step="0.1" value={form.bmi}
          onChange={(e) => updateForm('bmi', parseFloat(e.target.value))} />
      )}

      {mode === 'calculate' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600">Height</span>
              <span className="text-xs font-medium text-glumina-blue bg-white/60 px-3 py-1 rounded-full">{height} cm</span>
            </div>
            <input type="range" min="100" max="220" value={height}
              onChange={(e) => updateFromHW(parseInt(e.target.value), weight)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600">Weight</span>
              <span className="text-xs font-medium text-glumina-blue bg-white/60 px-3 py-1 rounded-full">{weight} kg</span>
            </div>
            <input type="range" min="30" max="200" value={weight}
              onChange={(e) => updateFromHW(height, parseInt(e.target.value))} />
          </div>
          <div className="text-center p-3 bg-white/40 rounded-2xl">
            <p className="text-xs text-slate-500 mb-1">Calculated BMI</p>
            <p className="text-lg font-semibold text-glumina-navy">
              {form.bmi.toFixed(1)} <span className={`text-sm font-normal ${cat.color}`}>({cat.label})</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function FormSection({ label, value, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-glumina-navy">{label}</label>
        {value && <span className="text-sm font-medium text-glumina-blue bg-white/60 px-3 py-1 rounded-full">{value}</span>}
      </div>
      {children}
    </div>
  )
}

function ToggleButtons({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[['No', 0], ['Yes', 1]].map(([label, v]) => (
        <button key={v} onClick={() => onChange(v)}
          className={`py-3 px-4 rounded-2xl text-sm font-medium transition-all ${
            value === v
              ? 'bg-gradient-to-r from-glumina-blue to-glumina-navy text-white shadow-glow'
              : 'bg-white/60 text-slate-600 hover:bg-white/80 border border-white'
          }`}>{label}</button>
      ))}
    </div>
  )
}

// ============================================================
// RESULT SCREEN
// ============================================================
function ResultScreen({ result, onReset, track }) {
  const primary = result.primary
  const isHigh = primary.risk_level === 'HIGH'
  const isMedium = primary.risk_level === 'MEDIUM'
  const riskColor = isHigh ? 'from-rose-400 to-rose-500'
    : isMedium ? 'from-amber-400 to-orange-400' : 'from-emerald-400 to-teal-400'
  const riskBg = isHigh ? 'bg-rose-50' : isMedium ? 'bg-amber-50' : 'bg-emerald-50'

  const scrollRef = useRef(null)
  const trackRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0
    setScrollProgress(progress)
  }

  const setScrollFromProgress = (progress) => {
    const el = scrollRef.current
    if (!el) return
    const clamped = Math.min(Math.max(progress, 0), 100)
    const maxScroll = el.scrollWidth - el.clientWidth
    el.scrollLeft = (clamped / 100) * maxScroll
    setScrollProgress(clamped)
  }

  const progressFromPointer = (clientX) => {
    const track = trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  const handleThumbPointerDown = (e) => {
    e.stopPropagation()
    const move = (ev) => setScrollFromProgress(progressFromPointer(ev.clientX))
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const handleTrackPointerDown = (e) => {
    setScrollFromProgress(progressFromPointer(e.clientX))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-strong rounded-3xl p-7 sm:p-10 md:p-12 shadow-soft text-center mb-6">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${riskColor} mb-6 shadow-glow`}>
          {isHigh || isMedium ? <AlertCircle className="w-10 h-10 text-white" strokeWidth={2} />
            : <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />}
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-glumina-navy mb-2">
          {primary.risk_level} RISK
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          {track === 'pre_lab' ? 'Pre-Lab Screening' : 'Post-Lab Analysis'} · {primary.model}
        </p>
        <div className="mb-8">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-glumina-blue to-glumina-navy bg-clip-text text-transparent mb-2">
            {primary.probability_percent}%
          </div>
          <p className="text-slate-500 text-sm">Diabetes probability</p>
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-3 bg-white/60 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${riskColor} rounded-full transition-all duration-1000`}
                style={{ width: `${primary.probability_percent}%` }} />
            </div>
          </div>
        </div>
        <div className={`${riskBg} rounded-2xl p-6`}>
          <h3 className="font-semibold text-glumina-navy mb-2">{primary.status}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{primary.action}</p>
        </div>
      </div>

      {track === 'post_lab' && result.interpretations && (
        <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-soft mb-6">
          <h3 className="text-xs font-semibold text-glumina-navy mb-5 uppercase tracking-widest text-center">
            Lab Result Interpretation
          </h3>
          <div className="space-y-3">
            <LabRow label="HbA1c" data={result.interpretations.hba1c} unit=" %" />
            <LabRow label="Blood Glucose" data={result.interpretations.glucose} unit=" mg/dL" />
            <LabRow label="BMI" data={result.interpretations.bmi} unit="" />
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xs font-semibold text-glumina-navy mb-2 uppercase tracking-widest text-center">
          Model Breakdown
        </h3>
        <p className="text-[11px] text-slate-400 text-center mb-4">
          Swipe to compare all models &#8594;
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-glumina-cloud/90 to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-glumina-cloud/90 to-transparent"></div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-stretch gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory smooth-carousel hide-scrollbar">
            {result.breakdown.map((m) => (
              <div key={m.model} className="snap-center shrink-0 flex">
                <ModelCard model={m} isWinner={m.model === primary.model} />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          className="relative mt-3 mx-auto w-48 h-2 rounded-full bg-glumina-blue/15 cursor-pointer">
          <div
            onPointerDown={handleThumbPointerDown}
            className="absolute top-1/2 w-5 h-5 rounded-full bg-glumina-blue shadow-glow cursor-grab active:cursor-grabbing hover:scale-110 transition-transform touch-none"
            style={{ left: `${scrollProgress}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>
      </div>

      <button onClick={onReset}
        className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-glumina-blue to-glumina-navy text-white font-semibold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5">
        New Assessment
      </button>
      <p className="mt-6 text-xs text-slate-400 text-center">
        Educational tool only. Always consult a healthcare professional.
      </p>
    </div>
  )
}

function LabRow({ label, data, unit }) {
  const colorMap = {
    green: 'text-emerald-600 bg-emerald-50',
    amber: 'text-amber-600 bg-amber-50',
    red: 'text-rose-600 bg-rose-50',
    blue: 'text-blue-600 bg-blue-50',
  }
  const badge = colorMap[data.color] || colorMap.green
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-glumina-navy">{label}</span>
          <span className="text-sm text-slate-500">{data.value}{unit}</span>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${badge}`}>{data.category}</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{data.note}</p>
    </div>
  )
}

function ModelCard({ model, isWinner }) {
  const diabetesProb = Number(model.probability_diabetes ?? 0)
  const noDiabetesProb = Number(model.probability_no_diabetes ?? 0)

  const predictedClass = diabetesProb >= noDiabetesProb ? 'Diabetes' : 'No diabetes'
  const confidence = Math.max(diabetesProb, noDiabetesProb)

  const displayRisk =
    diabetesProb < 30 ? 'LOW' :
    diabetesProb < 70 ? 'MEDIUM' :
    'HIGH'

  const riskColors = {
    LOW: {
      text: 'text-emerald-600',
      bar: 'bg-emerald-400',
      badge: 'bg-emerald-100/60 text-emerald-700'
    },
    MEDIUM: {
      text: 'text-amber-600',
      bar: 'bg-amber-400',
      badge: 'bg-amber-100/60 text-amber-700'
    },
    HIGH: {
      text: 'text-rose-600',
      bar: 'bg-rose-400',
      badge: 'bg-rose-100/60 text-rose-700'
    },
  }

  const colors = riskColors[displayRisk]
  const m = model.metrics

  return (
    <div className={`w-[270px] rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
      isWinner
        ? 'glass-card-winner ring-2 ring-glumina-blue/50 shadow-glow-lg'
        : 'glass-card'
    }`}>
      <div className="mb-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Model</p>
        <p className="text-base font-semibold text-glumina-navy leading-tight">{model.model}</p>
        <div className="h-7 flex items-center justify-center mt-2">
          {isWinner && (
            <span className="text-[10px] font-semibold text-glumina-blue bg-glumina-blue/10 px-3 py-1 rounded-full">
              ★ Primary
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <span className={`text-xs font-medium px-4 py-1.5 rounded-full ${colors.badge}`}>
          {displayRisk.charAt(0) + displayRisk.slice(1).toLowerCase()} Risk
        </span>
      </div>

      <div className="mb-5">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
          Confidence Level
        </p>
        <p className={`text-5xl font-bold ${colors.text} mb-1`}>
          {confidence.toFixed(1)}%
        </p>
        <p className="text-xs text-slate-400">
          predicted as {predictedClass}
        </p>
      </div>

      <div className="space-y-2 mb-5">
        <ProbBar label="Diabetes" value={diabetesProb.toFixed(1)} color={colors.bar} />
        <ProbBar label="No diabetes" value={noDiabetesProb.toFixed(1)} color="bg-slate-300" />
      </div>

      <div className="border-t border-white/40 my-4"></div>

      <div>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Model performance</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          <MetricItem label="F1-Score" value={m.f1} highlight />
          <MetricItem label="ROC-AUC" value={m.roc_auc} />
          <MetricItem label="Recall" value={m.recall} />
          <MetricItem label="Precision" value={m.precision} />
        </div>
      </div>
    </div>
  )
}

function ProbBar({ label, value, color }) {
  const numericValue = Number(value)

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-slate-500 w-20 text-left">{label}</span>
      <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${numericValue}%` }} />
      </div>
      <span className="text-[11px] font-medium text-slate-600 w-11 text-right">{value}%</span>
    </div>
  )
}

function MetricItem({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${highlight ? 'text-glumina-blue' : 'text-slate-600'}`}>
        {value.toFixed(4)}
      </span>
    </div>
  )
}

export default App