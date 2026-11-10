/* GEMS Training Academy: handbook, screen-share trainer and quizzes. No build step. */
(function () {
  const CFG = window.GCT_CONFIG;
  const { MODULES, STAGES, REASONS } = window.GCT_CONTENT;
  const A = window.GTA_ADMIN;
  const app = document.getElementById("app");

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fill = (s) => String(s).replace(/\{\{(\w+)\}\}/g, (_, k) => esc(CFG[k] || ""));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("gta:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("gta:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  const go = (h) => { location.hash = h; };

  /* ---------- layout ---------- */
  function page(active, inner, cls) {
    app.innerHTML = `
      <header class="top">
        <a class="brand" href="#/"><span class="logo">◆</span><span><b>GEMS Training Academy</b><small>Exotel + Admissions CRM</small></span></a>
        <nav class="tabs">
          <a href="#/handbook" class="${active === "handbook" ? "on" : ""}">Admin handbook</a>
          <a href="#/train" class="${active === "train" ? "on" : ""}">Train a counsellor</a>
          <a href="#/quizzes" class="${active === "quizzes" ? "on" : ""}">Quizzes</a>
        </nav>
      </header>
      <main class="${cls || ""}">${inner}</main>`;
    window.scrollTo(0, 0);
  }

  /* ---------- home ---------- */
  function viewHome() {
    const read = store.get("read", {});
    const total = A.SECTIONS.reduce((n, s) => n + s.topics.length, 0);
    const done = Object.keys(read).length;
    page("", `
      <section class="hero">
        <h1>Learn it. Do it. Teach it.</h1>
        <p>Short, visual, step-by-step training for Exotel calling and the GEMS Admissions CRM. Jump to the topic you need, follow the steps, then check yourself with a quiz.</p>
      </section>
      <div class="cards3">
        <a class="big" href="#/handbook"><span class="ic">📘</span><b>Admin handbook</b><span>For the Exotel and CRM owner. Add counsellors, groups, flows and numbers; telephony setup; sales flow; fixing common problems.</span><em>${done} of ${total} topics read →</em></a>
        <a class="big" href="#/train"><span class="ic">🖥️</span><b>Train a counsellor</b><span>Share your screen and walk a counsellor through every step: filters, quick views, calls, intent, lead details, statuses, visits, application and fees.</span><em>${MODULES.length} modules →</em></a>
        <a class="big" href="#/quizzes"><span class="ic">✅</span><b>Quizzes</b><span>Check what you know. Admin quizzes for the platform owner, module quizzes and a final mix for counsellors.</span><em>Pass mark ${CFG.PASS_MARK}% →</em></a>
      </div>
      <section class="panel">
        <h2>How a call works</h2>
        ${extra("callmap")}
      </section>`);
  }

  /* ---------- extras (diagrams, tables, templates) ---------- */
  function extra(kind) {
    if (kind === "callmap") return `
      <div class="flowmap">
        <div class="node crm"><b>CRM</b><span>Counsellor clicks Call on the lead</span></div><div class="arr">→</div>
        <div class="node exo"><b>Exotel flow</b><span>Gems Outbound &lt;name&gt; → their group</span></div><div class="arr">→</div>
        <div class="node sim"><b>Personal SIM rings</b><span>Counsellor picks up (bridge)</span></div><div class="arr">→</div>
        <div class="node parent"><b>Parent's phone</b><span>Sees only the official Exotel number</span></div>
      </div>
      <p class="muted small">Recorded and logged every time. The parent never sees the counsellor's personal number.</p>`;
    if (kind === "newuser") return `<ol class="chips6">${["Add person", "Verify number", "Create group", "Duplicate flow", "Attach ExoPhone", "CRM telephony"].map((s, i) => `<li><span>${i + 1}</span>${s}</li>`).join("")}</ol>`;
    if (kind === "emailtemplate") return template(A.EMAIL_TEMPLATE);
    if (kind === "trainingemail") return template(A.TRAINING_EMAIL);
    if (kind === "journey" || kind === "stages" || kind === "appstages") {
      const row = (label, list, c) => `<div class="journey ${c}"><p class="k">${label}</p><ol>${list.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div>`;
      if (kind === "stages") return row("Enquiry stages", STAGES.enquiry, "enq");
      if (kind === "appstages") return row("Application stages", STAGES.application, "appl");
      return row("1. Enquiry", STAGES.enquiry, "enq") +
        row("2. After Visit Done: fees and discount (Data tab)", ["Enter fees", "Enter discount amount", "Enter discount reason", "Discount approval request goes out", "Approved"], "fee") +
        `<div class="startapp">3. In parallel: Start Application ↓ (update statuses by hand until the ERP link is live)</div>` + row("Application", STAGES.application, "appl");
    }
    if (kind === "statustable") return table(["Status", "Stage", "What it means"], A.STATUS_TABLE);
    if (kind === "viewstable") return table(["Quick view", "What it shows", "When to use"], A.VIEWS_TABLE);
    if (kind === "faq") return `<div class="faq">${A.FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
    if (kind === "walkins") return `<div class="walkins"><p class="k">Walk-in form links</p><div class="grid">${CFG.CAMPUSES.map((c) =>
      `<a class="campus ${c.brand}" target="_blank" rel="noopener" href="${CFG.WALKIN_BASE + c.slug}/new"><span>${esc(c.name)}</span><small>Open form ↗</small></a>`).join("")}</div>
      <p class="muted small">Don't submit test entries: every submit creates a real lead.</p></div>`;
    if (kind === "reasons") return `<div class="reasons"><div><p class="k junk">Junk reasons (examples)</p><ul>${REASONS.junk.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
      <div><p class="k lost">Lost reasons (examples)</p><ul>${REASONS.lost.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div></div>`;
    return "";
  }
  const table = (h, rows) => `<div class="tbl"><table><thead><tr>${h.map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i ? esc(c) : `<b>${esc(c)}</b>`}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const template = (t) => `<div class="tmpl"><pre>${esc(t)}</pre><button class="btn ghost copy" data-copy="${esc(t)}">Copy</button></div>`;

  function media(l) {
    let h = "";
    if (l.video) h += `<figure class="media"><video controls playsinline preload="metadata" poster="assets/video/${l.video}.jpg" src="assets/video/${l.video}.mp4"></video>
      <div class="vctl"><button class="btn ghost" data-speed="0.75">Slower</button><button class="btn ghost" data-speed="1">Normal</button><button class="btn ghost" data-act="replay">↺ Replay</button></div></figure>`;
    const img = l.img || l.image;
    if (img) h += `<figure class="shot"><img src="${img.src}" alt="${esc(img.alt || img.caption || "")}" loading="lazy" data-zoom><figcaption>${esc(img.caption || "")} <span class="muted">(click to enlarge)</span></figcaption></figure>`;
    return h;
  }
  const notes = (l) =>
    (l.remember ? `<div class="note good"><b>Remember</b>${fill(l.remember)}</div>` : "") +
    (l.tip ? `<div class="note good"><b>Tip</b>${fill(l.tip)}</div>` : "") +
    (l.warn ? `<div class="note warn"><b>Careful</b>${fill(l.warn)}</div>` : "");

  /* ---------- handbook ---------- */
  function viewHandbook(sid, tid) {
    const secs = A.SECTIONS;
    const flat = []; secs.forEach((s) => s.topics.forEach((t) => flat.push([s, t])));
    let idx = flat.findIndex(([s, t]) => s.id === sid && t.id === tid);
    if (idx < 0) idx = sid ? Math.max(0, flat.findIndex(([s]) => s.id === sid)) : 0;
    const [S, T] = flat[idx];
    const read = store.get("read", {});
    const key = S.id + "/" + T.id;
    const nav = secs.map((s) => `<div class="navsec"><p>${esc(s.title)}</p>${s.topics.map((t) => {
      const k = s.id + "/" + t.id;
      return `<a href="#/handbook/${k}" class="${k === key ? "cur" : ""} ${read[k] ? "read" : ""}">${esc(t.title)}</a>`;
    }).join("")}</div>`).join("");
    const prev = flat[idx - 1], next = flat[idx + 1];
    page("handbook", `
      <div class="hb">
        <aside class="side"><input class="search" id="q" placeholder="Search topics…" autocomplete="off"><div id="nav">${nav}</div></aside>
        <article class="topic">
          <p class="crumb">${esc(S.title)} · ${idx + 1} of ${flat.length}</p>
          <h1>${esc(T.title)}</h1>
          <p class="lead">${fill(T.intro)}</p>
          ${media(T)}
          ${T.extra ? extra(T.extra) : ""}
          ${T.steps.length ? `<ol class="steps">${T.steps.map((s) => `<li>${fill(s)}</li>`).join("")}</ol>` : ""}
          ${notes(T)}
          <div class="pager">
            ${prev ? `<a class="btn ghost" href="#/handbook/${prev[0].id}/${prev[1].id}">← ${esc(prev[1].title)}</a>` : "<span></span>"}
            <label class="tick"><input type="checkbox" id="readbox" ${read[key] ? "checked" : ""}> I've learnt this</label>
            ${next ? `<a class="btn" href="#/handbook/${next[0].id}/${next[1].id}">${esc(next[1].title)} →</a>` : `<a class="btn" href="#/quizzes">Take the admin quizzes →</a>`}
          </div>
        </article>
      </div>`);
    document.getElementById("readbox").onchange = (e) => { const r = store.get("read", {}); if (e.target.checked) r[key] = 1; else delete r[key]; store.set("read", r); viewHandbook(S.id, T.id); };
    const q = document.getElementById("q");
    q.oninput = () => {
      const v = q.value.toLowerCase().trim();
      document.querySelectorAll("#nav a").forEach((a) => {
        const [s, t] = a.getAttribute("href").replace("#/handbook/", "").split("/");
        const topic = secs.find((x) => x.id === s).topics.find((x) => x.id === t);
        const text = (topic.title + " " + topic.intro + " " + topic.steps.join(" ")).toLowerCase();
        a.style.display = !v || text.includes(v) ? "" : "none";
      });
    };
  }

  /* ---------- trainer (screen share) ---------- */
  function viewTrainList() {
    const prog = store.get("train", {});
    page("train", `
      <section class="hero small"><h1>Train a counsellor</h1>
      <p>Share your screen on Teams, open a module and go step by step. Play the clip, read the steps, then ask the question at the bottom. End each module with its quiz. Use <kbd>→</kbd> and <kbd>←</kbd> to move, and <b>Full screen</b> for a clean view.</p></section>
      <div class="mods">${MODULES.map((m, i) => `
        <a class="mod" href="#/train/${m.id}/0"><span class="num">${i + 1}</span><span class="body"><b>${esc(m.title)}</b><span>${esc(m.summary)}</span>
        <small>${m.lessons.length} steps · about ${m.minutes} min ${prog[m.id] ? `· <span class="ok">last: ${prog[m.id]}%</span>` : ""}</small></span></a>`).join("")}
      </div>`);
  }

  function viewTrain(mid, k) {
    const mi = MODULES.findIndex((m) => m.id === mid);
    if (mi < 0) return go("#/train");
    const m = MODULES[mi];
    k = Math.max(0, Math.min(m.lessons.length - 1, parseInt(k, 10) || 0));
    const l = m.lessons[k];
    const dots = m.lessons.map((x, i) => `<a href="#/train/${mid}/${i}" class="dot ${i === k ? "cur" : i < k ? "done" : ""}" title="${esc(x.title)}">${i + 1}</a>`).join("");
    const last = k === m.lessons.length - 1;
    page("train", `
      <div class="present" id="present">
        <div class="pbar"><a href="#/train" class="muted">← Modules</a><span class="ptitle">Module ${mi + 1}: ${esc(m.title)}</span><span class="dots">${dots}</span><button class="btn ghost" id="fs">⛶ Full screen</button></div>
        <h1>${k + 1}. ${esc(l.title)}</h1>
        <p class="lead">${fill(l.intro)}</p>
        <div class="pgrid ${l.video || l.image ? "" : "nomedia"}">
          <div>${media(l)}${l.extra ? extra(l.extra) : ""}</div>
          <div><ol class="steps big">${l.steps.map((s) => `<li>${fill(s)}</li>`).join("")}</ol>${notes(l)}</div>
        </div>
        ${l.check ? `<section class="ask"><p class="k">Ask the counsellor</p><div id="qbox"></div></section>` : ""}
        <div class="pager">
          ${k > 0 ? `<a class="btn ghost" href="#/train/${mid}/${k - 1}">← Back</a>` : mi > 0 ? `<a class="btn ghost" href="#/train/${MODULES[mi - 1].id}/0">← Previous module</a>` : "<span></span>"}
          ${last ? `<a class="btn" href="#/quiz/mod-${mid}">Module quiz →</a>` : `<a class="btn" href="#/train/${mid}/${k + 1}">Next →</a>`}
        </div>
      </div>`, "wide");
    if (l.check) question(document.getElementById("qbox"), l.check, { reveal: true });
    document.getElementById("fs").onclick = () => {
      const el = document.documentElement;
      if (!document.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen).call(el); else document.exitFullscreen();
    };
  }

  /* ---------- questions ---------- */
  function question(box, q, opt) {
    opt = opt || {};
    const id = Math.random().toString(36).slice(2, 8);
    let body = "", getAns, correct;
    const t = q.type;
    if (t === "single" || t === "multi") {
      const order = shuffle(q.options.map((_, i) => i));
      body = `<div class="opts">${order.map((i) => `<label class="opt"><input type="${t === "single" ? "radio" : "checkbox"}" name="o${id}" value="${i}"><span>${fill(q.options[i])}</span></label>`).join("")}</div>${t === "multi" ? `<p class="muted small">Select all that apply.</p>` : ""}`;
      getAns = () => [...box.querySelectorAll("input:checked")].map((x) => +x.value);
      correct = (a) => t === "single" ? a[0] === q.answer : a.length === q.answer.length && q.answer.every((x) => a.includes(x));
    } else if (t === "order") {
      let items = shuffle(q.items); while (q.items.length > 1 && items.join() === q.items.join()) items = shuffle(q.items);
      body = `<ol class="order">${items.map((s) => `<li><span>${esc(s)}</span><button type="button" class="mv" data-d="-1" aria-label="Move up">▲</button><button type="button" class="mv" data-d="1" aria-label="Move down">▼</button></li>`).join("")}</ol><p class="muted small">Use ▲ ▼ to put them in order.</p>`;
      getAns = () => [...box.querySelectorAll(".order li span")].map((x) => x.textContent);
      correct = (a) => a.join("|") === q.items.join("|");
    } else if (t === "number") {
      body = `<div class="num">${q.prefix ? `<span>${esc(q.prefix)}</span>` : ""}<input type="text" inputmode="numeric" placeholder="Type the number"></div>`;
      getAns = () => +(box.querySelector(".num input").value.replace(/[^\d.]/g, "") || NaN);
      correct = (a) => a === q.answer;
    } else if (t === "hotspot") {
      body = `<div class="hot"><img src="${q.img}" alt=""><span class="mark" hidden></span><span class="zone" hidden></span></div><p class="muted small">Click on the picture.</p>`;
      let pt = null;
      getAns = () => pt;
      correct = (p) => p && p[0] >= q.box[0] && p[0] <= q.box[2] && p[1] >= q.box[1] && p[1] <= q.box[3];
      setTimeout(() => {
        const hot = box.querySelector(".hot"), mk = hot.querySelector(".mark");
        hot.onclick = (e) => {
          if (box.dataset.done) return;
          const r = hot.getBoundingClientRect();
          pt = [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100];
          mk.hidden = false; mk.style.left = pt[0] + "%"; mk.style.top = pt[1] + "%";
        };
      });
    }
    box.innerHTML = `<p class="q">${fill(q.q)}</p>${body}
      <div class="qact"><button class="btn" data-check>Check answer</button>${opt.reveal ? `<button class="btn ghost" data-show>Show answer</button>` : ""}</div><div class="fb" hidden></div>`;
    box.querySelectorAll(".mv").forEach((b) => b.onclick = () => {
      const li = b.parentElement, d = +b.dataset.d;
      if (d < 0 && li.previousElementSibling) li.parentElement.insertBefore(li, li.previousElementSibling);
      if (d > 0 && li.nextElementSibling) li.parentElement.insertBefore(li.nextElementSibling, li);
    });
    const fb = box.querySelector(".fb");
    const answerText = () => t === "single" ? fill(q.options[q.answer]) : t === "multi" ? q.answer.map((i) => fill(q.options[i])).join(", ") :
      t === "order" ? q.items.map(esc).join(" → ") : t === "number" ? esc((q.prefix || "") + q.answer.toLocaleString("en-IN")) : "the highlighted area";
    const finish = (ok, shown) => {
      box.dataset.done = 1;
      box.querySelectorAll("input,.mv").forEach((x) => x.disabled = true);
      box.querySelector("[data-check]").disabled = true;
      const sb = box.querySelector("[data-show]"); if (sb) sb.disabled = true;
      if (t === "hotspot") { const z = box.querySelector(".zone"); z.hidden = false; Object.assign(z.style, { left: q.box[0] + "%", top: q.box[1] + "%", width: q.box[2] - q.box[0] + "%", height: q.box[3] - q.box[1] + "%" }); }
      if (t === "single" || t === "multi") box.querySelectorAll(".opt").forEach((o) => {
        const v = +o.querySelector("input").value, right = t === "single" ? v === q.answer : q.answer.includes(v);
        if (right) o.classList.add("right"); else if (o.querySelector("input").checked) o.classList.add("wrong");
      });
      fb.hidden = false;
      fb.className = "fb " + (shown ? "info" : ok ? "ok" : "bad");
      fb.innerHTML = `<b>${shown ? "Answer" : ok ? "Correct!" : "Not quite."}</b> ${ok ? "" : `Right answer: ${answerText()}. `}${fill(q.explain || "")}`;
      if (opt.onDone) opt.onDone(ok && !shown);
    };
    box.querySelector("[data-check]").onclick = () => {
      const a = getAns();
      if (a == null || (Array.isArray(a) && !a.length && t !== "order") || (t === "number" && isNaN(a))) { fb.hidden = false; fb.className = "fb info"; fb.textContent = "Choose an answer first."; return; }
      finish(correct(a), false);
    };
    const sb = box.querySelector("[data-show]"); if (sb) sb.onclick = () => finish(false, true);
  }

  /* ---------- quizzes ---------- */
  function quizDefs() {
    const list = A.ADMIN_QUIZZES.map((z) => ({ id: z.id, group: "Admin", title: z.title, summary: z.summary, questions: () => shuffle(z.questions) }));
    MODULES.forEach((m, i) => list.push({ id: "mod-" + m.id, group: "Counsellor", title: `${i + 1}. ${m.title}`, summary: m.summary, questions: () => shuffle(m.bank).slice(0, CFG.QUIZ_SIZE) }));
    list.push({ id: "final", group: "Counsellor", title: "Final mix", summary: `${CFG.FINAL_SIZE} questions from every module.`, questions: () => shuffle(MODULES.flatMap((m) => m.bank)).slice(0, CFG.FINAL_SIZE) });
    return list;
  }
  function viewQuizzes() {
    const best = store.get("best", {});
    const card = (z) => `<a class="mod" href="#/quiz/${z.id}"><span class="num">?</span><span class="body"><b>${esc(z.title)}</b><span>${esc(z.summary)}</span>
      <small>${best[z.id] != null ? `<span class="${best[z.id] >= CFG.PASS_MARK ? "ok" : "no"}">Best on this device: ${best[z.id]}%</span>` : "Not taken yet"}</small></span></a>`;
    const d = quizDefs();
    page("quizzes", `
      <section class="hero small"><h1>Quizzes</h1><p>Pass mark ${CFG.PASS_MARK}%. Questions and options are shuffled every time. Each answer shows the right answer and why.</p></section>
      <h2 class="sec">Admin (Senthil)</h2><div class="mods">${d.filter((z) => z.group === "Admin").map(card).join("")}</div>
      <h2 class="sec">Counsellor</h2><div class="mods">${d.filter((z) => z.group === "Counsellor").map(card).join("")}</div>`);
  }
  function viewQuiz(id) {
    const z = quizDefs().find((x) => x.id === id);
    if (!z) return go("#/quizzes");
    const qs = z.questions();
    let i = 0, score = 0;
    const step = () => {
      if (i >= qs.length) return result();
      page("quizzes", `<div class="quiz"><p class="crumb">${esc(z.title)} · Question ${i + 1} of ${qs.length} · Score ${score}</p>
        <div class="bar"><span style="width:${(i / qs.length) * 100}%"></span></div><div class="card" id="qbox"></div>
        <div class="pager"><a class="btn ghost" href="#/quizzes">Leave quiz</a><button class="btn" id="nx" disabled>Next →</button></div></div>`);
      question(document.getElementById("qbox"), qs[i], { onDone: (ok) => { if (ok) score++; const n = document.getElementById("nx"); n.disabled = false; n.focus(); } });
      document.getElementById("nx").onclick = () => { i++; step(); };
    };
    const result = () => {
      const pct = Math.round((score / qs.length) * 100), pass = pct >= CFG.PASS_MARK;
      const best = store.get("best", {}); best[id] = Math.max(best[id] || 0, pct); store.set("best", best);
      if (id.startsWith("mod-")) { const p = store.get("train", {}); p[id.slice(4)] = pct; store.set("train", p); }
      const mi = MODULES.findIndex((m) => "mod-" + m.id === id);
      const nextMod = mi >= 0 && MODULES[mi + 1];
      page("quizzes", `<div class="quiz result ${pass ? "pass" : "fail"}"><div class="big">${pct}%</div><h1>${pass ? "Passed!" : "Not yet"}</h1>
        <p>${score} of ${qs.length} correct. Pass mark ${CFG.PASS_MARK}%.</p>
        <p>${pass ? "Well done." : "Go through the topic again, then retake the quiz."}</p>
        <div class="pager center"><a class="btn ghost" href="#/quiz/${id}">Retake</a>
        ${nextMod ? `<a class="btn" href="#/train/${nextMod.id}/0">Next module: ${esc(nextMod.title)} →</a>` : `<a class="btn" href="#/quizzes">All quizzes</a>`}</div></div>`);
    };
    step();
  }

  /* ---------- global events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.copy != null) { navigator.clipboard && navigator.clipboard.writeText(t.dataset.copy); t.textContent = "Copied ✓"; }
    if (t.dataset && t.dataset.speed) { const v = t.closest("figure").querySelector("video"); v.playbackRate = +t.dataset.speed; }
    if (t.dataset && t.dataset.act === "replay") { const v = t.closest("figure").querySelector("video"); v.currentTime = 0; v.play(); }
    if (t.matches && t.matches("img[data-zoom]")) { const d = document.createElement("div"); d.className = "zoom"; d.innerHTML = `<img src="${t.src}" alt="">`; d.onclick = () => d.remove(); document.body.appendChild(d); }
  });
  document.addEventListener("keydown", (e) => {
    if (!location.hash.startsWith("#/train/") || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const [, , mid, k] = location.hash.split("/");
    const m = MODULES.find((x) => x.id === mid); if (!m) return;
    if (e.key === "ArrowRight") { if (+k < m.lessons.length - 1) go(`#/train/${mid}/${+k + 1}`); else go(`#/quiz/mod-${mid}`); }
    if (e.key === "ArrowLeft" && +k > 0) go(`#/train/${mid}/${+k - 1}`);
  });

  function route() {
    const p = location.hash.replace(/^#\/?/, "").split("/");
    if (p[0] === "handbook") return viewHandbook(p[1], p[2]);
    if (p[0] === "train" && p[1]) return viewTrain(p[1], p[2]);
    if (p[0] === "train") return viewTrainList();
    if (p[0] === "quizzes") return viewQuizzes();
    if (p[0] === "quiz") return viewQuiz(p[1]);
    viewHome();
  }
  window.addEventListener("hashchange", route);
  route();
})();
