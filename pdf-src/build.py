import re
src=open('/home/user/dogs/jumpsuit-reference.html',encoding='utf-8').read()
body=src[src.index('<main>'):src.index('<script>')]
script=re.search(r'<script>(.*)</script>',src,re.S).group(1)

# replace prompts section with photos
a=body.index('<section>\n  <h2>Промпты')
b=body.index('</section>',a)+len('</section>')
photos='''<section class="pb">
  <h2>Визуальные референсы</h2>
  <p>Изображения сгенерированы нейросетью по видео-референсу. Это визуализация идеи, а не техническая документация: форму, пропорции и материалы уточняет технолог.</p>
  <figure class="ph"><img src="../images/dog-standing.jpg"><figcaption>Общий вид. Съёмный капюшон на кнопках, воротник-стойка, молния по спинке, сборки на бёдрах, закрытые лапки с манжетами на кнопках.</figcaption></figure>
  <div class="ph2">
    <figure class="ph"><img src="../images/paw-closeup.jpg"><figcaption>Лапка крупно: манжета на трёх кнопках, чёрная лента-ремешок, подошва с протектором.</figcaption></figure>
    <figure class="ph"><img src="../images/dog-walking.jpg"><figcaption>Образ на прогулке: капюшон надет, поводок крепится к петле на спинке.</figcaption></figure>
  </div>
  <figure class="ph"><img src="../images/flatlay-hood.jpg"><figcaption>Комбинезон и съёмный капюшон отдельно. Капюшон с клетчатой подкладкой, люверсы под кнопки по краю, шнурок со стопперами. Воротник-стойка с двумя кнопками.</figcaption></figure>
  <figure class="ph"><img src="../images/colors-lineup.jpg"><figcaption>Линейка цветов: верблюжий, графит, олива, молочный, пыльная роза, шоколад, бордо. Фурнитура одинаковая.</figcaption></figure>
</section>'''
body=body[:a]+photos+body[b:]

# reference from video after header
hdr_end=body.index('</header>')+len('</header>')
ref='''
<section>
  <h2>Источник: видео и фото</h2>
  <div class="ph2 ref"><figure class="ph"><img src="../images/reference-photo.jpg"><figcaption>Кадр из референса: лапки закрыты, манжеты на кнопках.</figcaption></figure>
  <figure class="ph"><img src="../images/video-frames.jpg"><figcaption>Кадры из видео: процесс надевания, капюшон, молния, ремешки.</figcaption></figure></div>
</section>'''
body=body[:hdr_end]+ref+body[hdr_end:]

# add burgundy swatch
body=body.replace('<div><i style="background:#5a3a2e"></i><span><b>Шоколад</b><code>#5A3A2E</code>тёмный коричневый</span></div>',
 '<div><i style="background:#5a3a2e"></i><span><b>Шоколад</b><code>#5A3A2E</code>тёмный коричневый</span></div>\n    <div><i style="background:#6e1f2b"></i><span><b>Бордо</b><code>#6E1F2B</code>насыщенный красный</span></div>')
body=body.replace('Основной цвет из референса — верблюжий.','Основной цвет из референса — верблюжий. Остальные цвета те же, что на вашей линейке.')

# spec from generated photos before questions
spec='''<section>
  <h2>Что зафиксировать по референсным фото</h2>
  <div class="tw"><table class="spec">
    <thead><tr><th>Узел</th><th>Что видно на фото</th><th>Что решает технолог</th></tr></thead>
    <tbody>
      <tr><td>Капюшон</td><td>Стёганый, подкладка в клетку, по низу люверсы под кнопки, шнурок со стопперами</td><td>Количество и шаг кнопок, форма выреза под мордочку, как не зацеплять шерсть</td></tr>
      <tr><td>Воротник</td><td>Стойка, две кнопки по бокам, на комбинезоне работает без капюшона</td><td>Высота стойки, ответные части кнопок под капюшон</td></tr>
      <tr><td>Молния</td><td>Чёрная, по спинке от воротника до крупа, бегунок с петлёй</td><td>Длина, разъёмная или нет, защитная планка от шерсти</td></tr>
      <tr><td>Сборки</td><td>Резинка на бёдрах и у плеч, горизонтальная сборка на животе</td><td>Ширина резинки, припуск на сборку, градация по размерам</td></tr>
      <tr><td>Манжета</td><td>Накладная, внахлёст, 3 серебристые кнопки</td><td>Длина манжеты, расстояние между кнопками, усиление под кнопки</td></tr>
      <tr><td>Ремешок</td><td>Чёрная лента, липучка или регулируемая застёжка, над лапкой</td><td>Ширина ленты, способ фиксации, как пришить, чтобы не перетирало</td></tr>
      <tr><td>Ботиночек</td><td>Мягкий утеплённый носок, подошва с протектором</td><td>Форма стопы, материал подошвы, как прикрепить к утеплённому носку</td></tr>
      <tr><td>Туалет</td><td>Не видно на фото, обязательное требование</td><td>Открытый вырез снизу под животом и вокруг паха, обработка краёв</td></tr>
    </tbody></table></div>
</section>
'''
q=body.index('<section>\n  <h2>Вопросы к технологу</h2>')
body=body[:q]+spec+body[q:]
body=body.replace('<section>\n  <h2>Эскизы</h2>','<section class="sk">\n  <h2>Эскизы</h2>',1)

css='''
@page{size:A4;margin:14mm 13mm 16mm}
:root{--paper:#fff;--card:#f6f7f8;--ink:#1d2733;--muted:#5b6876;--rule:#c9d0d7;--fabric:#c9a27a;--fabric-far:#d9bf9f;--fabric-dark:#a8805a;--lining:#8e98a3;--accent:#b4532a;--black:#15181c;--body:Inter,sans-serif;--mono:"DejaVu Sans Mono",monospace;--display:Inter,sans-serif}
*{box-sizing:border-box}
body{margin:0;background:#fff;color:var(--ink);font:10.5pt/1.5 var(--body)}
main{display:flex;flex-direction:column;gap:9mm}
h1{font:700 24pt/1.15 var(--display);margin:0}
h2{font:700 15pt/1.2 var(--display);margin:0;break-after:avoid}
h3{font:600 10.5pt var(--body);margin:0 0 4px}
p{margin:0}
.eyebrow{font:500 8pt var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--accent)}
header{display:flex;flex-direction:column;gap:8px;border-bottom:1px solid var(--rule);padding-bottom:6mm}
header p{color:var(--muted);font-size:11pt}
.meta{display:flex;flex-wrap:wrap;gap:4px 16px;font:400 8pt var(--mono);color:var(--muted)}
section{display:flex;flex-direction:column;gap:4mm}
section{break-inside:avoid}
section.pb,section.sk{break-inside:auto}
section.pb{break-before:page}
.figs{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.fig{border:1px solid var(--rule);padding:3mm;display:flex;flex-direction:column;gap:6px;break-inside:avoid}
.fig.wide{grid-column:1/-1}
.fig svg{width:100%;height:auto;display:block}
.cap{font:500 7pt var(--mono);text-transform:uppercase;letter-spacing:.05em;color:var(--muted);display:flex;justify-content:space-between;gap:8px}
.legend{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;margin:0;padding:0;list-style:none}
.legend li{display:grid;grid-template-columns:22px 1fr;gap:8px;align-items:start;break-inside:avoid}
.legend b{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--accent);color:#fff;font:600 8pt var(--mono)}
.legend span{color:var(--muted);font-size:9pt}
.legend strong{display:block;color:var(--ink);font-size:10pt}
.tw{border:1px solid var(--rule)}
table{border-collapse:collapse;width:100%}
th,td{padding:6px 8px;text-align:left;border-bottom:1px solid var(--rule);font-size:9pt;vertical-align:top}
th{font:500 7pt var(--mono);text-transform:uppercase;color:var(--muted);vertical-align:bottom}
tr{break-inside:avoid}
td:first-child{font:600 9pt var(--mono)}
tr.hl td{background:#f6e9e2}
tr:last-child td{border-bottom:0}
.two{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.box{border:1px solid var(--rule);background:var(--card);padding:4mm;display:flex;flex-direction:column;gap:4px;break-inside:avoid}
.box ul{margin:0;padding-left:15px;display:flex;flex-direction:column;gap:3px;font-size:9.5pt}
.note{font-size:9pt;color:var(--muted)}
.sw{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.sw div{border:1px solid var(--rule);break-inside:avoid}
.sw i{height:16mm;display:block;border-bottom:1px solid var(--rule)}
.sw span{display:block;padding:5px 7px;font-size:8.5pt;line-height:1.3}
.sw b{display:block;font-size:9.5pt}
.sw code{font:400 7.5pt var(--mono);color:var(--muted);display:block}
.q{border-left:3px solid var(--accent);padding-left:10px;display:flex;flex-direction:column;gap:3px;break-inside:avoid;font-size:9.5pt}
.ph{margin:0;break-inside:avoid;display:flex;flex-direction:column;gap:4px}
.ph img{width:100%;height:auto;display:block;border:1px solid var(--rule)}
.ph figcaption{font-size:8.5pt;color:var(--muted)}
.ph2{display:grid;grid-template-columns:1fr 1fr;gap:4mm;align-items:start}
.pb figure.ph:first-of-type img{max-height:110mm;object-fit:contain;background:#fff}
.ph2.ref{grid-template-columns:1fr 2fr}
svg text{font-family:var(--mono)}
'''
html=f'<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Комбинезон с закрытыми лапками</title><style>{css}</style></head><body>{body}<script>{script}</script></body></html>'
open('/home/user/dogs/pdf-src/techpack.html','w',encoding='utf-8').write(html)
