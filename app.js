const rosters = {
  2: ['Anaya','Kofi A','Derely','Cristian','Ivannah','Chelsea','Chris','Elijah','Alexandra','Jadee','Jayden','Gabriel','Ata','Kofi N','Amy','Evelyn','Kenneth','Amanda','Judith','Milo','Emilie','Fauziya','Valerie'],
  5: ['Abdul','Prince','Seydou','Abrahim','Summer','Issa','India','Ilannah','Colin','Yeronni','Rover','Cameron','Jayden','Lebron','Keith','Mamady','Daniel','Nathan','Sergio','Bryan','Alie','Joshua'],
  6: ['Angel','Johan','Jacob','Francis','Lynn','Melanie','Adrian','Joseph','Melina','Kemil','Jahseal'],
  7: ['Pedro','Kienan','Danny','Sean','Jhoriel','Rosselyn','Siah','Chad','Suso']
};
// Add the actual game URL and screenshot here as files arrive, keyed by period/name.
// Example: '2/Anaya': { url: 'games/period-2/anaya/index.html', screenshot: 'assets/anaya.webp' }
const games = {
  '2/Ivannah': { title: 'Candy Coast Sprint', url: 'games/period-2/ivannah/index.html', screenshot: 'assets/ivannah-preview.webp' },
  '2/Judith': { title: 'Kawaii Chomp', url: 'games/period-2/judith/index.html', screenshot: 'assets/judith-preview.webp' },
  '2/Anaya': { title: 'Haunted School Showdown', url: 'games/period-2/anaya/index.html', screenshot: 'assets/anaya-preview.webp' },
  '2/Kofi A': { title: 'Marceline: Rise of the Vampire Queen', url: 'games/period-2/kofi-a/index.html', screenshot: 'assets/kofi-a-preview.webp' },
  '2/Derely': { title: 'Dress Up Dash: Don’t Turn Zombie', url: 'games/period-2/derely/index.html', screenshot: 'assets/derely-preview.webp' },
  '2/Chris': { title: 'Free Kick Pro', url: 'games/period-2/chris/index.html', screenshot: 'assets/chris-preview.webp' },
  '2/Amanda': { title: 'Operation Deaddrop', url: 'games/period-2/amanda/index.html', screenshot: 'assets/amanda-preview.webp' },
  '2/Evelyn': { title: 'Sky Obby', url: 'games/period-2/evelyn/index.html', screenshot: 'assets/evelyn-preview.webp' },
  '2/Elijah': { title: 'Speedster City', url: 'games/period-2/elijah/index.html', screenshot: 'assets/elijah-preview.webp' },
  '2/Gabriel': { title: 'Ink Duel', url: 'games/period-2/gabriel/index.html', screenshot: 'assets/gabriel-preview.webp' },
  '2/Amy': { title: 'St. Morrow Hospital: Dead Wing', url: 'games/period-2/amy/index.html', screenshot: 'assets/amy-preview.webp' },
  '2/Fauziya': { title: 'Zombie Panic: Fast Forest', url: 'games/period-2/fauziya/index.html', screenshot: 'assets/fauziya-preview.webp' },
  '2/Valerie': { title: 'Errand Town 3D', url: 'games/period-2/valerie/index.html', screenshot: 'assets/valerie-preview.webp' },
  '5/Alie': { title: 'Escape Mr Pino', url: 'games/period-5/alie/index.html', screenshot: 'assets/alie-preview.webp' },
  '2/Cristian': { title: 'Blight Rain', url: 'games/period-2/cristian/index.html', screenshot: 'assets/cristian-preview.webp' }
};
const colors=['#ff7b9c','#78d9d4','#b69ae9','#ffca73'];
const grid=document.querySelector('#game-grid');
const player=document.querySelector('#player');
let activePeriod=2,previousFocus=null;
function thumbnail(index){
  const accent=colors[index%colors.length];
  const stars=Array.from({length:22},(_,i)=>`<rect x="${(i*73+index*17)%384}" y="${(i*41)%182}" width="2" height="2" fill="#ffffff" opacity="${i%3===0?'.8':'.3'}"/>`).join('');
  const scenes=[
    `<circle cx="286" cy="70" r="30" fill="#e684a2"/><path d="M0 168L60 105L109 155L170 86L252 168L319 118L384 170V240H0Z" fill="#323358"/><path d="M0 195H384V240H0Z" fill="#24213b"/><g fill="${accent}"><rect x="33" y="176" width="70" height="8"/><rect x="150" y="144" width="62" height="8"/><rect x="281" y="182" width="72" height="8"/></g><path d="M174 125h14v18h-14z" fill="#ffcf70"/><path d="M177 119h8v8h-8z" fill="#fff3d2"/>`,
    `<path d="M0 190H384M0 209H384M0 236H384M192 162L10 240M192 162L110 240M192 162L274 240M192 162L374 240" stroke="#483665" fill="none"/><g fill="${accent}">${[0,1,2,3,4].map(i=>`<path d="M${56+i*57} 52h21v8h7v15h-7v-7h-21v7h-7V60h7z"/>`).join('')}</g><path d="M184 185h16v-9h7v22h-30v-13z" fill="#ffcf70"/><rect x="191" y="129" width="3" height="16" fill="#fff3d2"/>`,
    `<path d="M0 182L82 127L136 181L240 105L384 185V240H0Z" fill="#2c2d4b"/><path d="M0 211H384V240H0Z" fill="#35354e"/><path d="M126 211L178 157H214L270 211Z" fill="#776091"/><path d="M166 199h52v9h-52zM173 186h38v12h-38z" fill="${accent}"/><circle cx="178" cy="210" r="6" fill="#111021"/><circle cx="210" cy="210" r="6" fill="#111021"/><path d="M192 159v13M192 179v8" stroke="#ffe5b2" stroke-width="3"/>`
  ];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="384" height="240" viewBox="0 0 384 240"><rect width="384" height="240" fill="#11152c"/>${stars}${scenes[index%3]}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function render(){
  const match=location.hash.match(/^#period-([2567])$/);
  activePeriod=match?Number(match[1]):2;
  if(player.open)closeGame();
  document.title=`Period ${activePeriod} | Oz’s Arcade`;
  document.querySelector('#period-title').textContent=`Period ${activePeriod}`;
  document.querySelector('#game-count').textContent=rosters[activePeriod].length?`${rosters[activePeriod].length} CREATORS · ALL IMAGINATION`:'ROSTER COMING SOON';
  document.querySelectorAll('[data-period]').forEach(a=>{const selected=Number(a.dataset.period)===activePeriod;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  grid.replaceChildren();
  document.querySelector('#empty').hidden=rosters[activePeriod].length>0;
  rosters[activePeriod].forEach((name,index)=>{
    const game=games[`${activePeriod}/${name}`];
    const card=document.createElement('button');card.type='button';card.className='game-card';card.style.setProperty('--accent',colors[index%4]);card.setAttribute('aria-label',`Open ${name}’s game${game?'':' preview'}`);
    const nameplate=document.createElement('span');nameplate.className='card-name';nameplate.append(document.createTextNode(name));const num=document.createElement('span');num.className='card-number';num.textContent=`PLAYER ${String(index+1).padStart(2,'0')}`;nameplate.append(num);
    const picture=document.createElement('div');picture.className='thumbnail';const img=document.createElement('img');img.src=game?.screenshot||thumbnail(index);img.alt=game?.screenshot?`${name}’s game screenshot`:'Illustrated placeholder game preview';img.width=384;img.height=240;img.loading='lazy';img.decoding='async';picture.append(img);
    if(!game?.screenshot){const badge=document.createElement('span');badge.className='preview-badge';badge.textContent='PLACEHOLDER PREVIEW';picture.append(badge);}
    const meta=document.createElement('span');meta.className='card-meta';const status=document.createElement('span');status.textContent=game?'READY TO PLAY':'GAME COMING SOON';const action=document.createElement('b');action.textContent=game?'PLAY GAME ↗':'VIEW PREVIEW ↗';meta.append(status,action);card.append(nameplate,picture,meta);card.addEventListener('click',()=>openGame(name,index,card));grid.append(card);
  });
}
function openGame(name,index,card){
  previousFocus=card;
  document.querySelector('#player-title').textContent=`${name}’s game`;
  document.querySelector('#player-period').textContent=`OZ’S ARCADE / PERIOD ${activePeriod}`;
  const stage=document.querySelector('#game-stage');stage.replaceChildren();
  const game=games[`${activePeriod}/${name}`];
  if(game?.url){const frame=document.createElement('iframe');frame.title=`${name}’s game`;frame.setAttribute('sandbox','allow-scripts allow-pointer-lock');frame.allow='fullscreen; gamepad';frame.src=game.url;frame.addEventListener('load',()=>{try{frame.contentDocument?.addEventListener('keydown',escapeHandler);}catch{ /* Sandboxed games use the visible parent close button. */ }});stage.append(frame);}
  else{const room=document.createElement('div');room.className='waiting-room';const img=document.createElement('img');img.src=thumbnail(index);img.alt='Placeholder pixel-art game scene';const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent='COMING TO THIS CABINET SOON';const h=document.createElement('h3');h.textContent=`${name}’s game is on its way.`;const p=document.createElement('p');p.textContent='This is a placeholder preview. The real game will be ready to play once it has been added to the arcade.';room.append(img,eyebrow,h,p);stage.append(room);}
  player.showModal();document.body.style.overflow='hidden';document.querySelector('#close-player').focus();
}
function closeGame(){player.close();document.querySelector('#game-stage').replaceChildren();document.body.style.overflow='';previousFocus?.focus();}
function escapeHandler(e){if(e.key==='Escape'&&player.open){e.preventDefault();closeGame();}}
document.querySelector('#close-player').addEventListener('click',closeGame);
player.addEventListener('cancel',e=>{e.preventDefault();closeGame();});
document.addEventListener('keydown',escapeHandler);
// Bundled games can request closing even while keyboard focus is inside their frame.
window.addEventListener('message',e=>{const frame=document.querySelector('#game-stage iframe');if(frame&&e.source===frame.contentWindow&&e.data?.type==='oz-arcade:close')closeGame();});
window.addEventListener('hashchange',render);render();
