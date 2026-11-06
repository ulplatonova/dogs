const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file:///home/user/dogs/pdf-src/techpack.html');await p.waitForTimeout(800);
await p.pdf({path:'/home/user/dogs/jumpsuit-techpack.pdf',format:'A4',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,
headerTemplate:'<span></span>',footerTemplate:'<div style="font-size:8px;color:#777;width:100%;text-align:center;font-family:sans-serif">Комбинезон с закрытыми лапками · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',margin:{top:'14mm',bottom:'16mm',left:'13mm',right:'13mm'}});
await b.close()})();
