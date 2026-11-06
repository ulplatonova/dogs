
document.querySelectorAll('.pr').forEach(b=>{const btn=b.querySelector('button');btn.addEventListener('click',async()=>{const t=b.querySelector('pre').textContent;try{await navigator.clipboard.writeText(t);btn.textContent='Скопировано'}catch(e){const r=document.createRange();r.selectNodeContents(b.querySelector('pre'));const s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Выделено'}setTimeout(()=>btn.textContent='Копировать',1800)})});
const NS='http://www.w3.org/2000/svg';
const set=(id,html)=>{document.getElementById(id).innerHTML=html};

/* Общие defs: кнопка и нога */
const defs=`
<defs>
  <pattern id="quilt" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 5H10" stroke="var(--fabric-dark)" stroke-width=".6" opacity=".45"/></pattern>
  <pattern id="check" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="var(--lining)"/><path d="M0 0L6 6M6 0L0 6" stroke="var(--paper)" stroke-width=".7" opacity=".6"/></pattern>
  <g id="snap"><circle r="4.2" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/><circle r="1.4" fill="var(--ink)"/></g>
  <g id="leg">
    <path d="M-24 0 L-22 112 L22 112 L24 0Z" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M-24 0 L-22 112 L22 112 L24 0Z" fill="url(#quilt)"/>
    <rect x="-27" y="100" width="54" height="36" rx="4" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.6"/>
    <use href="#snap" x="12" y="108"/><use href="#snap" x="12" y="118"/><use href="#snap" x="12" y="128"/>
    <path d="M-27 136 L27 136 L27 152 C27 170 6 174 -16 174 C-36 174 -42 160 -34 152Z" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M-30 168 C-24 177 4 177 24 168" fill="none" stroke="var(--black)" stroke-width="5" stroke-linecap="round"/>
    <rect x="-28" y="136" width="56" height="8" fill="var(--black)"/>
    <path d="M24 139 C40 140 42 150 38 160" fill="none" stroke="var(--black)" stroke-width="5" stroke-linecap="round"/>
  </g>
</defs>`;

/* Нумерованные метки */
function co(n,px,py,lx,ly){
  return `<g><line x1="${px}" y1="${py}" x2="${lx}" y2="${ly}" stroke="var(--accent)" stroke-width="1.2"/>
  <circle cx="${px}" cy="${py}" r="3" fill="var(--accent)"/>
  <circle cx="${lx}" cy="${ly}" r="11" fill="var(--accent)"/>
  <text x="${lx}" y="${ly+4}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--paper)">${n}</text></g>`;
}

/* ВИД СБОКУ: голова слева */
set('side',defs+`
  <!-- дальние ноги -->
  <g opacity=".72"><use href="#leg" x="305" y="262"/><use href="#leg" x="505" y="262"/></g>
  <!-- ближние ноги -->
  <use href="#leg" x="245" y="262"/><use href="#leg" x="565" y="262"/>
  <!-- корпус -->
  <path d="M215 150 C300 134 520 134 604 156 C656 172 660 250 620 288 L262 292 C214 292 194 232 215 150Z" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.8"/>
  <path d="M215 150 C300 134 520 134 604 156 C656 172 660 250 620 288 L262 292 C214 292 194 232 215 150Z" fill="url(#quilt)"/>
  <path d="M290 175 C400 185 500 190 640 195 M280 215 C400 225 500 232 650 236" fill="none" stroke="var(--fabric-dark)" stroke-width="1" opacity=".6"/>
  <!-- сборки плечо/бедро -->
  <path d="M250 245 q10 6 0 14 M258 243 q10 6 0 14 M266 245 q10 6 0 14" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
  <path d="M556 250 q-10 6 0 14 M564 248 q-10 6 0 14 M572 250 q-10 6 0 14" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
  <!-- молния -->
  <path d="M236 148 C320 134 520 134 604 156" fill="none" stroke="var(--black)" stroke-width="4"/>
  <path d="M236 148 C320 134 520 134 604 156" fill="none" stroke="var(--paper)" stroke-width="1.2" stroke-dasharray="2 3"/>
  <!-- петля -->
  <path d="M296 140 q4 -22 20 -12" fill="none" stroke="var(--black)" stroke-width="4" stroke-linecap="round"/>
  <!-- капюшон -->
  <g transform="translate(258 192) scale(.76) translate(-258 -192)">
  <path d="M96 96 C96 50 172 30 218 58 C254 82 266 132 258 180 L238 192 L150 182 C114 170 96 134 96 96Z" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.8"/>
  <path d="M96 96 C96 50 172 30 218 58 C254 82 266 132 258 180 L238 192 L150 182 C114 170 96 134 96 96Z" fill="url(#quilt)"/>
  <ellipse cx="136" cy="116" rx="30" ry="42" fill="var(--card)" stroke="url(#check)" stroke-width="8"/>
  <ellipse cx="136" cy="116" rx="30" ry="42" fill="none" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3"/>
  <use href="#snap" x="244" y="170"/><use href="#snap" x="226" y="68"/>
  </g>
  <!-- ворот-сборка -->
  <path d="M196 186 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
  <!-- хвост -->
  <path d="M660 180 C700 170 712 200 700 230" fill="none" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 4"/>
  <text x="690" y="252" font-size="11" text-anchor="middle" fill="var(--muted)">хвост снаружи</text>
  ${co(1,190,115,90,50)}${co(2,430,205,430,100)}${co(3,420,138,430,60)}${co(4,306,128,330,78)}
  ${co(5,258,252,170,260)}${co(6,577,368,650,330)}${co(7,555,432,660,430)}${co(8,598,408,690,390)}
  <!-- размерные линии -->
  <g stroke="var(--muted)" stroke-width="1" fill="none"><path d="M236 480 H604 M236 474 V486 M604 474 V486"/></g>
  <text x="420" y="474" text-anchor="middle" font-size="12" fill="var(--muted)">ДС изделия</text>
`);

/* ВИД СВЕРХУ */
set('top',defs+`
  <!-- ноги в стороны -->
  <g>
    <g transform="translate(158 190) rotate(90) scale(.62)"><use href="#leg"/></g>
    <g transform="translate(262 190) rotate(-90) scale(.62)"><use href="#leg"/></g>
    <g transform="translate(158 355) rotate(90) scale(.62)"><use href="#leg"/></g>
    <g transform="translate(262 355) rotate(-90) scale(.62)"><use href="#leg"/></g>
  </g>
  <!-- корпус -->
  <path d="M158 150 C158 130 262 130 262 150 L270 360 C270 395 150 395 150 360Z" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.8"/>
  <path d="M158 150 C158 130 262 130 262 150 L270 360 C270 395 150 395 150 360Z" fill="url(#quilt)"/>
  <!-- молния -->
  <line x1="210" y1="120" x2="210" y2="372" stroke="var(--black)" stroke-width="5"/>
  <line x1="210" y1="120" x2="210" y2="372" stroke="var(--paper)" stroke-width="1.2" stroke-dasharray="2 3"/>
  <rect x="204" y="364" width="12" height="9" fill="var(--black)"/>
  <!-- петля -->
  <path d="M222 170 q14 -4 14 8" fill="none" stroke="var(--black)" stroke-width="4" stroke-linecap="round"/>
  <!-- капюшон -->
  <path d="M148 120 C148 54 272 54 272 120 L262 150 H158Z" fill="var(--fabric)" stroke="var(--ink)" stroke-width="1.8"/>
  <path d="M148 120 C148 54 272 54 272 120 L262 150 H158Z" fill="url(#quilt)"/>
  <ellipse cx="210" cy="88" rx="38" ry="26" fill="url(#check)" stroke="var(--ink)" stroke-width="1"/>
  <use href="#snap" x="172" y="143"/><use href="#snap" x="248" y="143"/>
  <!-- сборки -->
  <path d="M160 178 q8 6 0 12 M168 176 q8 6 0 12 M260 178 q-8 6 0 12 M252 176 q-8 6 0 12" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
  <path d="M158 345 q8 6 0 12 M168 343 q8 6 0 12 M262 345 q-8 6 0 12 M252 343 q-8 6 0 12" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
  ${co(1,210,70,350,40)}${co(3,210,260,300,260)}${co(4,236,176,320,150)}${co(5,166,184,120,236)}${co(6,90,190,50,110)}${co(7,64,360,50,450)}
  <text x="210" y="500" text-anchor="middle" font-size="11" fill="var(--muted)">вид по спинке, голова вверху</text>
`);

/* УЗЕЛ ЛАПКА, крупно */
set('paw',defs+`
  <g transform="translate(190 20) scale(2.1)"><use href="#leg"/></g>
  ${co(6,240,260,360,230)}${co(7,200,345,360,345)}${co(8,268,300,360,290)}
  <g stroke="var(--muted)" stroke-width="1" fill="none"><path d="M70 225 V300 M64 225 H76 M64 300 H76"/><path d="M110 305 V385 M104 305 H116 M104 385 H116"/></g>
  <text x="60" y="262" text-anchor="end" font-size="11" fill="var(--muted)">манжета</text>
  <text x="100" y="346" text-anchor="end" font-size="11" fill="var(--muted)">лапка</text>
  <text x="210" y="500" text-anchor="middle" font-size="11" fill="var(--muted)">манжета: 3 кнопки, ботиночек и ремешок</text>
`);
