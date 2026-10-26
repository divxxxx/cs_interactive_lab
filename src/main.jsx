import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowDownRight, ArrowLeftRight, Binary, BookOpen, Check, ChevronRight,
  CircleHelp, Code2, Cpu, GitBranch, GraduationCap, Layers3, Play, RotateCcw,
  Sparkles, Terminal, X
} from "lucide-react";
import "./styles.css";

const topics = [
  { id: "dfa", number: "01", title: "DFA Simulator", course: "Formal Language & Automata Theory", icon: GitBranch, tag: "FINITE AUTOMATA", color: "violet", desc: "See how a deterministic finite automaton reads a string, one symbol at a time." },
  { id: "binary", number: "02", title: "Number Systems", course: "Computer Organization & Architecture", icon: Binary, tag: "NUMBER SYSTEMS", color: "cyan", desc: "Convert values between decimal, binary, octal and hexadecimal with clear steps." },
  { id: "bfs", number: "03", title: "BFS Graph Explorer", course: "Design & Analysis of Algorithms", icon: GitBranch, tag: "GRAPH TRAVERSAL", color: "lime", desc: "Explore breadth-first search and watch nodes get visited level by level." }
];

function Header({ active, setActive }) {
  return <header className="topbar">
    <div className="brand"><div className="brand-mark"><Code2 size={19}/></div><div><strong>CS<span>LAB</span></strong><small>INTERACTIVE LEARNING SPACE</small></div></div>
    <nav>{topics.map(t => <button key={t.id} className={active === t.id ? "nav-link active" : "nav-link"} onClick={() => setActive(t.id)}><t.icon size={15}/><span>{t.title}</span></button>)}</nav>
    <div className="top-status"><span className="status-dot"/> ALL SYSTEMS READY</div>
  </header>
}

function Hero({ setActive }) {
  return <section className="hero">
    <div className="hero-copy">
      <div className="eyebrow"><Sparkles size={13}/> YOUR COMPUTER SCIENCE PLAYGROUND</div>
      <h1>Learn the logic.<br/><span>See it in action.</span></h1>
      <p>Three core CS concepts. Three interactive playgrounds. Explore the ideas behind the code instead of just memorising them.</p>
      <div className="hero-actions"><button className="primary-btn" onClick={() => setActive("dfa")}>Explore the lab <ChevronRight size={17}/></button><div className="learners"><div className="avatar-stack"><i>A</i><i>B</i><i>C</i></div><span><b>3</b> interactive modules</span></div></div>
    </div>
    <div className="hero-art">
      <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
      <div className="core"><Cpu size={54}/><span>CS</span></div>
      <div className="float-card card-top"><span className="mini-dot purple"/>FINITE STATE <b>01</b></div>
      <div className="float-card card-right"><Binary size={16}/><span>0101 1010</span></div>
      <div className="float-card card-bottom"><GitBranch size={16}/><span>GRAPH TRAVERSAL</span><b>↗</b></div>
      <div className="node n1"/><div className="node n2"/><div className="node n3"/>
    </div>
  </section>
}

function ModuleCard({ topic, index, onClick }) {
  const Icon = topic.icon;
  return <button className={`module-card ${topic.color}`} onClick={onClick}>
    <div className="module-card-top"><div className="module-icon"><Icon size={21}/></div><span className="module-number">{topic.number}</span></div>
    <div className="module-tag">{topic.tag}</div>
    <h3>{topic.title}</h3><p>{topic.desc}</p>
    <div className="module-footer"><span>Open playground</span><span className="arrow-circle"><ChevronRight size={17}/></span></div>
  </button>
}

function SectionTitle({ eyebrow, title, desc }) {
  return <div className="section-title"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div><p>{desc}</p></div>
}

function DFAPlayground() {
  const [input, setInput] = useState("1011");
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const valid = /^[01]*$/.test(input);
  const trace = useMemo(() => {
    let state = "q0";
    const out = [{ state, symbol: "Start", index: 0 }];
    [...input].forEach((symbol, i) => {
      state = symbol === "0" ? "q0" : state === "q0" ? "q1" : "q0";
      out.push({ state, symbol, index: i + 1 });
    });
    return out;
  }, [input]);
  const run = () => { if (valid && input.length) { setResult(trace[trace.length - 1].state === "q0"); setStep(trace.length - 1); } };
  const reset = () => { setInput(""); setResult(null); setStep(0); };
  return <div className="playground">
    <div className="playground-head"><div><div className="eyebrow">MODULE 01 / AUTOMATA THEORY</div><h2>DFA Simulator</h2><p>Build intuition for state transitions with a simple binary-string machine.</p></div><button className="icon-btn" onClick={() => setShowHelp(!showHelp)} title="About this machine"><CircleHelp size={18}/></button></div>
    {showHelp && <div className="info-callout"><b>Machine rule:</b> This DFA accepts binary strings containing an even number of <code>1</code>s. Reading <code>0</code> keeps the machine in the same state; reading <code>1</code> switches between q0 and q1.</div>}
    <div className="dfa-layout">
      <div className="panel input-panel"><label>INPUT STRING <span>Σ = {"{0, 1}"}</span></label><input value={input} onChange={e => {setInput(e.target.value);setResult(null);setStep(0)}} placeholder="Type e.g. 1011" className={!valid ? "invalid" : ""}/><div className="input-note">{valid ? `${input.length} symbols · Binary alphabet` : "Only 0 and 1 are allowed."}</div><div className="button-row"><button className="primary-btn" onClick={run} disabled={!valid || !input.length}><Play size={15} fill="currentColor"/> Run machine</button><button className="secondary-btn" onClick={reset}><RotateCcw size={15}/> Reset</button></div>
        <div className="rule-box"><span className="rule-icon"><Activity size={17}/></span><div><b>Acceptance condition</b><p>End in <strong>q0</strong> to accept (even number of 1s).</p></div></div>
      </div>
      <div className="panel diagram-panel"><div className="panel-label"><span>STATE DIAGRAM</span><span className="live-pill"><i/> LIVE MODEL</span></div>
        <svg viewBox="0 0 500 245" className="dfa-svg" role="img" aria-label="DFA state diagram with states q0 and q1">
          <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#8993b7"/></marker></defs>
          <path d="M38 120 L105 120" stroke="#8993b7" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M146 91 C180 44 258 44 290 91" fill="none" stroke="#8993b7" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M290 150 C256 198 180 198 146 150" fill="none" stroke="#8993b7" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M105 92 C64 48 140 25 146 85" fill="none" stroke="#8993b7" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M290 91 C335 47 406 50 398 96" fill="none" stroke="#8993b7" strokeWidth="2" markerEnd="url(#arrow)"/>
          <circle cx="126" cy="122" r="36" fill={trace[step]?.state === "q0" && result !== null ? "#1e594b" : "#191e36"} stroke={trace[step]?.state === "q0" && result !== null ? "#4ee0a0" : "#8d83ff"} strokeWidth="2.5"/>
          <circle cx="326" cy="122" r="36" fill={trace[step]?.state === "q1" && result !== null ? "#5c3348" : "#191e36"} stroke={trace[step]?.state === "q1" && result !== null ? "#ff729d" : "#8d83ff"} strokeWidth="2.5"/>
          <circle cx="126" cy="122" r="29" fill="none" stroke="#8d83ff" strokeWidth="1" opacity=".45"/>
          <text x="126" y="127" fill="#f5f6ff" textAnchor="middle" fontSize="16" fontWeight="700">q0</text><text x="326" y="127" fill="#f5f6ff" textAnchor="middle" fontSize="16" fontWeight="700">q1</text>
          <text x="219" y="54" fill="#a9b1d1" textAnchor="middle" fontSize="13">1</text><text x="219" y="202" fill="#a9b1d1" textAnchor="middle" fontSize="13">1</text><text x="86" y="47" fill="#a9b1d1" textAnchor="middle" fontSize="13">0</text><text x="399" y="45" fill="#a9b1d1" textAnchor="middle" fontSize="13">0</text>
          <text x="18" y="105" fill="#a9b1d1" fontSize="11">start</text><text x="126" y="174" fill="#4ee0a0" textAnchor="middle" fontSize="11">ACCEPT</text><text x="326" y="174" fill="#ff729d" textAnchor="middle" fontSize="11">REJECT</text>
        </svg>
        <div className="state-legend"><span><i className="legend-green"/> q0 · even 1s</span><span><i className="legend-pink"/> q1 · odd 1s</span></div>
      </div>
    </div>
    <div className="panel trace-panel"><div className="panel-label"><span>TRANSITION TRACE</span><span>{trace.length - 1} transitions</span></div><div className="trace-strip">{trace.map((item, i) => <React.Fragment key={i}>{i > 0 && <ChevronRight size={14} className="trace-chevron"/>}<div className={`trace-item ${result !== null && i <= step ? "visited" : ""}`}><small>{i === 0 ? "START" : `READ ${item.symbol}`}</small><b>{item.state}</b></div></React.Fragment>)}</div>
      {result !== null && <div className={`result-banner ${result ? "accepted" : "rejected"}`}><span>{result ? <Check size={18}/> : <X size={18}/>}</span><div><b>String {result ? "accepted" : "rejected"}</b><p>{result ? "The machine ended in q0, so the string has an even number of 1s." : "The machine ended in q1, so the string has an odd number of 1s."}</p></div></div>}
    </div>
  </div>
}

function NumberSystems() {
  const [value, setValue] = useState("42");
  const [from, setFrom] = useState("10");
  const [showSteps, setShowSteps] = useState(true);
  const valid = value.trim() !== "" && !Number.isNaN(parseInt(value, Number(from))) && parseInt(value, Number(from)) >= 0 && /^[0-9a-f]+$/i.test(value) && [...value.toLowerCase()].every(c => parseInt(c, 16) < Number(from));
  const n = valid ? parseInt(value, Number(from)) : null;
  const formats = [{label:"Binary", base:2, prefix:"0b"},{label:"Octal",base:8,prefix:"0o"},{label:"Decimal",base:10,prefix:""},{label:"Hexadecimal",base:16,prefix:"0x"}];
  const outputs = n === null ? [] : formats.map(f => ({...f, result:n.toString(f.base).toUpperCase()}));
  const steps = n === null ? [] : n.toString(2).split("").map((bit,i,arr)=>({bit,power:arr.length-i-1,term:Number(bit)*2**(arr.length-i-1)}));
  return <div className="playground">
    <div className="playground-head"><div><div className="eyebrow">MODULE 02 / COMPUTER ORGANIZATION</div><h2>Number Systems Lab</h2><p>Convert a number across common bases and understand how its value is represented.</p></div><div className="module-icon cyan"><Binary size={22}/></div></div>
    <div className="panel converter-panel"><div className="converter-input"><div><label>ENTER A VALUE</label><input value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. 42"/></div><div><label>INPUT BASE</label><select value={from} onChange={e=>setFrom(e.target.value)}><option value="2">Binary · Base 2</option><option value="8">Octal · Base 8</option><option value="10">Decimal · Base 10</option><option value="16">Hexadecimal · Base 16</option></select></div></div>
      {!valid && <div className="error-text">Enter a valid non-negative number for the selected base.</div>}
      <div className="conversion-grid">{formats.map(f=><div key={f.base} className={`conversion-result ${f.base===Number(from)?"selected":""}`}><div className="conversion-top"><span>{f.label}</span><span className="base-chip">BASE {f.base}</span></div><strong>{n===null?"—":outputs.find(o=>o.base===f.base)?.result}</strong><div className="conversion-bottom"><span>{f.prefix || "No prefix"}</span><button onClick={()=>n!==null && navigator.clipboard?.writeText(outputs.find(o=>o.base===f.base).result)} disabled={n===null}>Copy</button></div></div>)}</div>
    </div>
    <div className="panel steps-panel"><div className="panel-label"><span>UNDER THE HOOD</span><button className="text-btn" onClick={()=>setShowSteps(!showSteps)}>{showSteps?"Hide steps":"Show steps"}</button></div>{showSteps && <>{n===null?<p className="muted">A valid value will show the conversion breakdown here.</p>:<><div className="equation">{n} <span>₁₀</span> = {n.toString(2)} <span>₂</span></div><p className="muted">Each binary digit represents a power of 2. Add the place values where the digit is 1.</p><div className="bit-breakdown">{steps.map((s,i)=><div key={i} className={s.bit==="1"?"bit-card on":"bit-card"}><small>2<sup>{s.power}</sup></small><b>{s.bit}</b><span>{s.term}</span></div>)}</div><div className="sum-line"><span>Place-value sum</span><b>{steps.filter(s=>s.bit==="1").map(s=>s.term).join(" + ")} = {n}</b></div></>}</>}</div>
  </div>
}

const graphNodes = [{id:"A",x:90,y:65},{id:"B",x:220,y:40},{id:"C",x:350,y:65},{id:"D",x:90,y:180},{id:"E",x:220,y:190},{id:"F",x:350,y:180},{id:"G",x:470,y:120}];
const graphEdges = [["A","B"],["A","D"],["B","C"],["B","E"],["C","F"],["C","G"],["D","E"],["E","F"],["F","G"]];
function bfsOrder(start) {
  const adj = Object.fromEntries(graphNodes.map(n=>[n.id,[]]));
  graphEdges.forEach(([a,b])=>{adj[a].push(b);adj[b].push(a)});
  const queue=[start], seen=new Set([start]), order=[];
  while(queue.length){const node=queue.shift();order.push(node);adj[node].forEach(next=>{if(!seen.has(next)){seen.add(next);queue.push(next)}})}
  return order;
}
function BFSExplorer() {
  const [start,setStart] = useState("A");
  const [count,setCount] = useState(0);
  const order = useMemo(()=>bfsOrder(start),[start]);
  const visited = order.slice(0,count);
  const current = visited[visited.length-1];
  const reset=()=>setCount(0);
  return <div className="playground">
    <div className="playground-head"><div><div className="eyebrow">MODULE 03 / ALGORITHM VISUALIZER</div><h2>BFS Graph Explorer</h2><p>Traverse a graph with Breadth-First Search, visiting nearby nodes before moving farther away.</p></div><div className="module-icon lime"><GitBranch size={22}/></div></div>
    <div className="bfs-controls panel"><div><label>STARTING NODE</label><select value={start} onChange={e=>{setStart(e.target.value);setCount(0)}}>{graphNodes.map(n=><option key={n.id}>{n.id}</option>)}</select></div><div className="bfs-actions"><button className="primary-btn" onClick={()=>setCount(Math.min(order.length,count+1))} disabled={count>=order.length}><Play size={15} fill="currentColor"/> Next step</button><button className="secondary-btn" onClick={()=>setCount(order.length)}><Activity size={15}/> Run all</button><button className="secondary-btn" onClick={reset}><RotateCcw size={15}/></button></div></div>
    <div className="panel graph-panel"><div className="panel-label"><span>UNDIRECTED GRAPH</span><span className="live-pill"><i/> {visited.length} / {order.length} VISITED</span></div><svg viewBox="0 0 560 245" className="graph-svg" role="img" aria-label="Interactive BFS graph">
      {graphEdges.map(([a,b])=>{const na=graphNodes.find(n=>n.id===a),nb=graphNodes.find(n=>n.id===b);const lit=visited.includes(a)&&visited.includes(b);return <line key={a+b} x1={na.x+20} y1={na.y+20} x2={nb.x+20} y2={nb.y+20} stroke={lit?"#8d83ff":"#343b59"} strokeWidth={lit?3:2} strokeDasharray={lit?"0":"5 5"}/>})}
      {graphNodes.map(n=>{const idx=visited.indexOf(n.id),isCurrent=n.id===current;return <g key={n.id}><circle cx={n.x+20} cy={n.y+20} r="23" fill={isCurrent?"#8d83ff":idx>=0?"#233f42":"#171d34"} stroke={isCurrent?"#c6c0ff":idx>=0?"#4ee0a0":"#4b5477"} strokeWidth="2"/><text x={n.x+20} y={n.y+25} textAnchor="middle" fill="#f6f7ff" fontSize="14" fontWeight="700">{n.id}</text>{idx>=0&&<text x={n.x+20} y={n.y+54} textAnchor="middle" fill="#4ee0a0" fontSize="10">#{idx+1}</text>}</g>})}
    </svg><div className="graph-legend"><span><i className="legend-current"/> Current node</span><span><i className="legend-green"/> Visited</span><span><i className="legend-grey"/> Not visited</span></div></div>
    <div className="bfs-bottom"><div className="panel queue-panel"><div className="panel-label"><span>VISIT ORDER</span><span>{count>=order.length?"COMPLETE":"IN PROGRESS"}</span></div><div className="queue-chips">{visited.length?visited.map((n,i)=><span key={n} className={n===current?"current-chip":""}>{n}<small>{i+1}</small></span>):<p className="muted">Press “Next step” to begin.</p>}</div></div><div className="panel concept-panel"><div className="panel-label"><span>WHY BFS?</span><Layers3 size={15}/></div><p>BFS uses a <b>queue (FIFO)</b> to explore all neighbours at the current distance before moving to the next level.</p><div className="complexity"><span>Time complexity</span><b>O(V + E)</b></div></div></div>
  </div>
}

function Quiz() {
  const [answers,setAnswers] = useState({});
  const [submitted,setSubmitted] = useState(false);
  const questions = [
    {q:"Which state accepts strings with an even number of 1s in our DFA?",opts:["q0","q1","Both states"],correct:0},
    {q:"What is the binary representation of decimal 10?",opts:["1001","1010","1100"],correct:1},
    {q:"Which data structure does BFS use?",opts:["Stack","Priority queue","Queue"],correct:2}
  ];
  const score=questions.filter((q,i)=>answers[i]===String(q.correct)).length;
  return <section className="quiz-section"><SectionTitle eyebrow="CHECK YOUR UNDERSTANDING" title="Quick knowledge check" desc="Three questions to see what stuck. No pressure — learning is the point."/><div className="quiz-grid">{questions.map((q,i)=><div className="panel quiz-card" key={q.q}><div className="quiz-num">QUESTION 0{i+1}</div><h3>{q.q}</h3><div className="quiz-options">{q.opts.map((o,j)=><button key={o} className={`${answers[i]===String(j)?"chosen":""} ${submitted&&j===q.correct?"correct":submitted&&answers[i]===String(j)?"wrong":""}`} onClick={()=>{setAnswers({...answers,[i]:String(j)});setSubmitted(false)}}>{o}{submitted&&j===q.correct&&<Check size={15}/>}</button>)}</div></div>)}</div><div className="quiz-submit"><span>{Object.keys(answers).length} of {questions.length} answered</span><div>{submitted&&<b className="score">Score: {score}/{questions.length}</b>}<button className="primary-btn" onClick={()=>setSubmitted(true)} disabled={Object.keys(answers).length<questions.length}>Check answers <ChevronRight size={16}/></button></div></div></section>
}

function App() {
  const [active,setActive] = useState("dfa");
  const [showAll,setShowAll] = useState(true);
  const chosen = topics.find(t=>t.id===active);
  return <div className="app-shell"><Header active={active} setActive={id=>{setActive(id);document.getElementById("playground")?.scrollIntoView({behavior:"smooth",block:"start"})}}/>
    <main><Hero setActive={id=>{setActive(id);document.getElementById("playground")?.scrollIntoView({behavior:"smooth",block:"start"})}}/>
      <section className="modules-section"><SectionTitle eyebrow="THE LEARNING PATH" title="Pick a playground" desc="Each module is designed to make a classroom concept easier to see, test, and remember."/><div className="module-grid">{topics.map((t,i)=><ModuleCard key={t.id} topic={t} index={i} onClick={()=>{setActive(t.id);document.getElementById("playground")?.scrollIntoView({behavior:"smooth",block:"start"})}}/>)}</div></section>
      <section className="workspace-section" id="playground"><div className="workspace-heading"><div><div className="eyebrow"><Terminal size={13}/> HANDS-ON WORKSPACE</div><h2>Try it yourself<span>.</span></h2></div><div className="workspace-tabs">{topics.map(t=><button key={t.id} className={active===t.id?"selected":""} onClick={()=>setActive(t.id)}>{t.number} <span>{t.title}</span></button>)}</div></div>
        {active==="dfa"?<DFAPlayground/>:active==="binary"?<NumberSystems/>:<BFSExplorer/>}
      </section>
      <Quiz/>
      <section className="bottom-cta"><div className="cta-icon"><GraduationCap size={25}/></div><div><h3>Curiosity is the best compiler.</h3><p>Change an input. Break a pattern. Run it again. That’s how concepts click.</p></div><button className="secondary-btn" onClick={()=>{setActive("dfa");window.scrollTo({top:0,behavior:"smooth"})}}>Back to start <ArrowDownRight size={16}/></button></section>
    </main>
    <footer><div className="brand footer-brand"><div className="brand-mark"><Code2 size={16}/></div><strong>CS<span>LAB</span></strong></div><span>Built for learning · Frontend-only interactive demo</span><span>© 2026 CS Lab</span></footer>
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);
