
(() => {
const id=new URLSearchParams(location.search).get('s');

const data=window.SUBJECTS;
const subject=data.find(s=>s.id===(id||'psychotherapy'))||data[0];
if(!subject)return;
document.body.replaceChildren();
document.body.insertAdjacentHTML('afterbegin',"<header class=\"topbar\">\n  <a class=\"brand\" href=\"index.html\"><span class=\"psi\">\u03a8</span><span class=\"bt\">Psynthesized<small>PSYCHOLOGIST BOARD EXAM REVIEW</small></span></a>\n  <span class=\"sp\"></span>\n  <button class=\"tlink subject-toggle\" type=\"button\" aria-expanded=\"false\" aria-controls=\"subject-panel\">Subjects</button>\n  <a class=\"tlink hide-s\" href=\"index.html#how\">How to study</a>\n  <a class=\"tlink hide-s\" href=\"index.html#references\">References</a>\n<details class=\"profile-menu\"><summary aria-label=\"Open profile menu\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"3.5\"/><path d=\"M5 21v-2a7 7 0 0 1 14 0v2\"/></svg></summary><div class=\"profile-pop\"><strong>Your study account</strong><p>Profile, notes, and bookmarks will be connected in the account build.</p></div></details>\n\n</header>"+"<section class=\"hero\"><div class=\"intro\"><div class=\"eyebrow\">SUBJECTS / PSYCHOTHERAPY</div><h1>Psychotherapy &amp; Counseling</h1><p>Explore the theories, approaches, and foundations of psychological treatment and counseling.</p></div><img src=\"assets/therapy-room.png\" alt=\"Bright therapy room with cream seating, plants and the Psynthesized mascot\"></section><div class=\"page-layout\"><main><div class=\"toolbar\"><div><h2>Chapters</h2><p>Your study path for Psychotherapy &amp; Counseling.</p></div><div class=\"chapter-controls\"><button id=\"toggle\">Close all chapters</button><button id=\"subjects-toggle\" aria-controls=\"subject-panel\" aria-expanded=\"false\">Subjects \u25be</button></div></div><div id=\"chapters\"></div></main><div class=\"subject-backdrop\" aria-hidden=\"true\"></div><aside hidden tabindex=\"-1\" id=\"subject-panel\" aria-labelledby=\"subjects-title\"><div class=\"dialoghead\"><h2 id=\"subjects-title\">Subjects</h2><button id=\"subjects-close\" aria-label=\"Close subjects\">\u2715</button></div><p>Choose your next study subject.</p><div class=\"subjects\" id=\"real-subjects\"></div></aside></div><footer class=\"foot\">PSYNTHESIZED \u00b7 ALL RIGHTS RESERVED 2026</footer>");
document.title=subject.name+' · Psynthesized';
document.documentElement.style.setProperty('--active-subject',subject.color);
document.documentElement.style.setProperty('--active-subject-light',subject.light);
document.querySelector('a[href="index.html#how"]').remove();
const referencesLink=document.querySelector('a[href="index.html#references"]');referencesLink.href='#subject-references';referencesLink.classList.remove('hide-s');
const references=document.createElement('section');references.id='subject-references';references.className='subject-references';
const referencesTitle=document.createElement('h2');referencesTitle.textContent=subject.name+' · References';references.append(referencesTitle);
const refs=subject.references||[];
if(refs.length){const list=document.createElement('ul');refs.slice().sort((a,b)=>a.apa.localeCompare(b.apa)).forEach(ref=>{const item=document.createElement('li');ref.apa.split(/(\*[^*]+\*)/g).forEach(piece=>{if(piece.startsWith('*')&&piece.endsWith('*')){const em=document.createElement('em');em.textContent=piece.slice(1,-1);item.append(em)}else item.append(document.createTextNode(piece))});list.append(item)});references.append(list)}else{const message=document.createElement('p');message.textContent='References will appear here when this subject’s reviewer is added.';references.append(message)}
document.querySelector('.page-layout').after(references);
referencesLink.addEventListener('click',()=>{document.getElementById('subject-panel').hidden=true;document.querySelectorAll('[aria-controls="subject-panel"]').forEach(t=>t.setAttribute('aria-expanded','false'))});

const covers={psychotherapy:'therapy-room.png',assessment:'assessment-room.png',abnormal:'abnormal-room.png',personality:'personality-room.png'};
const image=document.querySelector('.hero img');image.src='assets/'+covers[subject.id];image.alt=subject.name+' study room with Astrid';
document.querySelector('.hero h1').textContent=subject.name;
document.querySelector('.eyebrow').textContent='SUBJECTS / '+subject.name.toUpperCase();
if(subject.id!=='psychotherapy')document.querySelector('.hero .intro p').remove();
document.querySelector('.toolbar p').textContent='Your study path for '+subject.name+'.';

for(const href of ['assets/subject-home-style.css','assets/psychotherapy-subject.css']){const l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.append(l)}
const container=document.getElementById('chapters');
subject.parts.forEach((part,index)=>{
 const d=document.createElement('details');d.className='group';d.open=true;d.style.setProperty('--tone',part.color);d.style.setProperty('--pale',part.light);
 const summary=document.createElement('summary');const badge=document.createElement('span');badge.className='badge';badge.textContent=index+1;summary.append(badge);
 const title=document.createElement(part.page?'a':'span');title.textContent=part.name;if(part.page)title.href=part.page;summary.append(title);
 const meta=document.createElement('span');meta.className='meta';meta.textContent=part.sub;summary.append(meta);
 const arrow=document.createElement('span');arrow.className='chev';arrow.textContent='⌄';summary.append(arrow);d.append(summary);
 part.chapters.forEach(ch=>{
  const row=document.createElement(ch.page?'a':'div');row.className='row'+(ch.page?'':' soon');if(ch.page)row.href=ch.page;
  const num=document.createElement('span');num.className='badge';num.textContent=ch.n;
  const text=document.createElement('span');text.className='ct';text.textContent=ch.title;
  const action=document.createElement('span');action.className='study';action.textContent=ch.page?(ch.note||'Study')+' ›':'Coming soon';
  row.append(num,text,action);d.append(row);
 });container.append(d);
});
if(!subject.parts.length){const empty=document.createElement('p');empty.className='subject-empty';empty.textContent='Chapters coming soon.';container.append(empty)}
const chapterToggle=document.getElementById('toggle');
const subtitle=document.querySelector('.toolbar p');const controls=document.createElement('div');controls.className='chapter-subtitle-controls';subtitle.before(controls);controls.append(subtitle,chapterToggle);

const sync=()=>chapterToggle.textContent=[...container.querySelectorAll('details')].every(d=>d.open)?'Close all chapters':'Open all chapters';
chapterToggle.disabled=!subject.parts.length;chapterToggle.onclick=()=>{const groups=[...container.querySelectorAll('details')];const open=!groups.every(d=>d.open);groups.forEach(d=>d.open=open);sync()};container.addEventListener('toggle',sync,true);
const panel=document.getElementById('subject-panel'),trigger=document.getElementById('subjects-toggle'),compact=matchMedia('(max-width:1024px)');trigger.hidden=true;document.querySelector('.chapter-controls').hidden=true;
const triggers=[trigger,document.querySelector('.subject-toggle')];let lastTrigger=trigger;
const links=document.getElementById('real-subjects');
data.forEach(s=>{const a=document.createElement('a');a.className='subject'+(s===subject?' selected':'');a.href='subject.html?s='+encodeURIComponent(s.id);a.style.setProperty('--subject-color',s.color);a.style.setProperty('--subject-light',s.light);if(s===subject)a.setAttribute('aria-current','page');const dot=document.createElement('i');dot.className='dot';const label=document.createElement('span');label.textContent=s.name;const status=document.createElement('small');status.textContent=s===subject?'Current subject':s.parts.length?'Open reviewer →':'Coming soon';a.append(dot,label,status);links.append(a)});
function mode(){panel.setAttribute('role',compact.matches?'dialog':'complementary');if(compact.matches)panel.setAttribute('aria-modal','true');else panel.removeAttribute('aria-modal')}
function setSubjects(open){panel.classList.toggle("from-header",lastTrigger.classList.contains("subject-toggle"));panel.hidden=!open;triggers.forEach(t=>t.setAttribute('aria-expanded',String(open)));mode();if(open){document.querySelector('.profile-menu').open=false;if(compact.matches)document.getElementById('subjects-close').focus()}else lastTrigger.focus()}
triggers.forEach(t=>t.onclick=()=>{lastTrigger=t;setSubjects(panel.hidden)});
document.getElementById('subjects-close').onclick=()=>setSubjects(false);document.querySelector('.subject-backdrop').onclick=()=>setSubjects(false);compact.addEventListener('change',mode);mode();
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.profile-menu').open=false;if(!panel.hidden)setSubjects(false)}if(panel.hidden||!compact.matches||e.key!=='Tab')return;const items=[...panel.querySelectorAll('button,a[href]')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
document.addEventListener('click',e=>{const profile=document.querySelector('.profile-menu');if(!profile.contains(e.target))profile.open=false});
// Header uses the homepage's compact list menu; chapter control retains the side panel/dialog.
const headerTrigger=document.querySelector('.subject-toggle');
const headerMenu=document.createElement('nav');headerMenu.id='header-subject-menu';headerMenu.className='subject-pop';headerMenu.hidden=true;headerMenu.setAttribute('aria-label','Subjects');
const menuHead=document.createElement('div');menuHead.className='pop-head';const menuTitle=document.createElement('strong');menuTitle.textContent='Subjects';const menuClose=document.createElement('button');menuClose.className='subject-close';menuClose.type='button';menuClose.setAttribute('aria-label','Close subjects');menuClose.textContent='×';menuHead.append(menuTitle,menuClose);headerMenu.append(menuHead);
data.forEach(s=>{const link=document.createElement('a');link.href='subject.html?s='+encodeURIComponent(s.id);if(s===subject)link.setAttribute('aria-current','page');const label=document.createElement('span');label.textContent=s.name;const status=document.createElement('small');status.textContent=s.parts.length?'Open reviewer →':'Coming soon';link.append(label,status);headerMenu.append(link)});
document.querySelector('header').append(headerMenu);headerTrigger.setAttribute('aria-controls',headerMenu.id);
function closeHeader(returnFocus=false){headerMenu.hidden=true;headerTrigger.setAttribute('aria-expanded','false');if(returnFocus)headerTrigger.focus()}
headerTrigger.onclick=()=>{const open=headerMenu.hidden;if(!panel.hidden){panel.hidden=true;trigger.setAttribute('aria-expanded','false')}headerMenu.hidden=!open;headerTrigger.setAttribute('aria-expanded',String(open));if(open){document.querySelector('.profile-menu').open=false;headerMenu.querySelector('a').focus()}};
menuClose.onclick=()=>closeHeader(true);
trigger.addEventListener('click',()=>closeHeader());
document.addEventListener('click',e=>{if(!headerMenu.contains(e.target)&&!headerTrigger.contains(e.target))closeHeader()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!headerMenu.hidden){e.stopImmediatePropagation();closeHeader(true)}},true);

})();
