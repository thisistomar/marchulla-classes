
const feed = document.getElementById('study-feed');
const buttons = document.querySelectorAll('.filter-btn');

const esc = (s='') => String(s)
  .replaceAll('&','&amp;')
  .replaceAll('<','&lt;')
  .replaceAll('>','&gt;')
  .replaceAll('"','&quot;');

function renderQuestion(item){
  const hiStatements = item.statements_hi.map((s,i)=>`<li>${esc(s)}</li>`).join('');
  const enStatements = item.statements_en.map((s,i)=>`<li>${esc(s)}</li>`).join('');
  const options = item.options.map(o=>`<div class="option">${esc(o)}</div>`).join('');
  const explanations = item.explanations.map(e=>`
    <div class="explanation-item">
      <strong>${esc(e.title)}</strong>
      <p>${esc(e.text)}</p>
    </div>`).join('');
  const facts = item.facts.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('');

  return `
  <article class="content-card" id="${esc(item.id)}" data-type="${esc(item.type)}">
    <div class="content-card-header">
      <div>
        <span class="section-label">${esc(item.category)}</span>
        <h2>${esc(item.topic)}</h2>
        <div class="content-tags">
          <span>${esc(item.level)}</span>
          <span>Bilingual</span>
          <span>Prelims</span>
        </div>
      </div>
      <div class="content-date">${esc(item.date)}</div>
    </div>

    <div class="question-layout">
      <section class="lang-block" lang="hi">
        <h3>प्रश्न (हिंदी)</h3>
        <p>${esc(item.intro_hi)}</p>
        <p><strong>${esc(item.question_hi)}</strong></p>
        <ol class="statements">${hiStatements}</ol>
        <p><strong>${esc(item.prompt_hi)}</strong></p>
      </section>

      <section class="lang-block" lang="en">
        <h3>Question (English)</h3>
        <p><strong>${esc(item.question_en)}</strong></p>
        <ol class="statements">${enStatements}</ol>
        <p><strong>${esc(item.prompt_en)}</strong></p>
      </section>

      <div class="options">${options}</div>
    </div>

    <div class="answer-panel">
      <details>
        <summary>Show answer & detailed explanation</summary>
        <div class="correct-answer">✓ ${esc(item.answer_hi)}</div>

        <h3>विस्तृत व्याख्या | Detailed Explanation</h3>
        ${explanations}

        <h3>परीक्षा के लिए 5 विशिष्ट तथ्य</h3>
        <table class="fact-table">
          <thead><tr><th>विशेषता</th><th>चार्टर अधिनियम, 1853</th></tr></thead>
          <tbody>${facts}</tbody>
        </table>

        <div class="trap-box">
          <strong>UPSC/UPPCS का विशेष ट्रैप</strong>
          <p>${esc(item.trap)}</p>
        </div>
      </details>
    </div>
  </article>`;
}

function render(filter='all'){
  const items = (window.MARCHULLA_STUDY_CONTENT || [])
    .filter(i => filter==='all' || i.type===filter)
    .sort((a,b)=>b.date.localeCompare(a.date));

  if(!items.length){
    feed.innerHTML = `<div class="empty-study">No material has been published in this category yet.</div>`;
    return;
  }
  feed.innerHTML = items.map(i => i.type==='question' ? renderQuestion(i) : '').join('');
}

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  });
});

render();
document.getElementById('year').textContent = new Date().getFullYear();
