/* HamNava V78 unified dock: presentation only; existing audio and official embeds remain authoritative. */
(()=>{const $=s=>document.querySelector(s);let external=false;
const css=document.createElement('style');css.textContent=`
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window{position:fixed!important;top:auto!important;left:12px!important;right:12px!important;bottom:calc(12px + env(safe-area-inset-bottom,0px))!important;width:auto!important;max-width:none!important;height:auto!important;min-height:0!important;z-index:19000!important;border-radius:18px!important;background:#251925!important;border:1px solid #7b458b88!important;box-shadow:0 10px 32px #0009!important;transform:none!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-content{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:5px 12px!important;min-height:0!important;padding:10px 12px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-header{display:none!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-center{display:flex!important;grid-column:1!important;align-items:center!important;gap:10px!important;min-height:0!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window .player-icon{width:54px!important;height:54px!important;flex:none!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window #nowPlaying{font-size:15px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-meta{min-width:0!important;gap:3px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-transport{grid-column:2!important;display:flex!important;align-items:center!important;gap:3px!important}
body.hn-playing:not(.hn-player-fullscreen) #hnShuffleSongs{display:none!important}
body.hn-playing:not(.hn-player-fullscreen) #audioPlayer{grid-column:1/-1!important;width:100%!important;height:28px!important;min-width:0!important}
body.hn-playing:not(.hn-player-fullscreen) main{padding-top:0!important;padding-bottom:140px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window:before{background:#251925e8!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-background{opacity:.18!important}
#hnV78Expand{border:0;background:transparent;color:#c88bff;font-size:21px;cursor:pointer;padding:7px}
body.hn-player-fullscreen #hnV78Expand{display:none}
@media(max-width:760px){body.hn-playing:not(.hn-player-fullscreen) .hn-player-window{bottom:calc(76px + env(safe-area-inset-bottom,0px))!important;left:8px!important;right:8px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-player-content{padding:8px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-player-window .player-icon{width:46px!important;height:46px!important}body.hn-playing:not(.hn-player-fullscreen) main{padding-bottom:190px!important}}
#hnExternalPlayer.hn-v78-docked{display:block!important;position:fixed!important;inset:auto 10px calc(12px + env(safe-area-inset-bottom,0px)) 10px!important;z-index:19001!important;background:transparent!important;backdrop-filter:none!important;padding:0!important;pointer-events:none!important}
#hnExternalPlayer.hn-v78-docked .hn-external-card{pointer-events:auto!important;width:100%!important;max-height:70dvh!important;padding:10px!important;background:#251925!important;border:1px solid #7b458b88!important;border-radius:18px!important}
#hnExternalPlayer.hn-v78-docked .hn-external-head h2{font-size:15px!important}
#hnExternalPlayer.hn-v78-docked .hn-external-frame{display:block!important;width:100%!important;max-width:380px!important;min-height:200px!important;aspect-ratio:16/9!important;margin:8px auto!important}
#hnExternalPlayer.hn-v78-docked .hn-external-footer,#hnExternalPlayer.hn-v78-docked .hn-external-nav,#hnExternalPlayer.hn-v78-docked .hn-external-nav-status{display:none!important}
@media(max-width:760px){#hnExternalPlayer.hn-v78-docked{bottom:calc(76px + env(safe-area-inset-bottom,0px))!important}}
`;document.head.append(css);
function setup(){const player=$('.hn-player-window'),audio=$('#audioPlayer'),modal=$('#hnExternalPlayer');if(!player||!audio||!modal)return;
document.body.classList.add('hn-v78-dock-ready');const expand=document.createElement('button');expand.id='hnV78Expand';expand.type='button';expand.title='Player vergrößern';expand.setAttribute('aria-label','Player vergrößern');expand.textContent='⛶';expand.addEventListener('click',()=>$('#hnPlayerFullscreen')?.click());$('.hn-player-transport')?.append(expand);
player.addEventListener('click',e=>{if(e.target.closest('button,a,audio,input'))return;$('#hnPlayerFullscreen')?.click()});
const observer=new MutationObserver(()=>{if(!modal.hidden){modal.classList.add('hn-v78-docked');external=true;document.body.classList.remove('hn-playing')}else{modal.classList.remove('hn-v78-docked');external=false}});
observer.observe(modal,{attributes:true,attributeFilter:['hidden']});if(!modal.hidden)observer.takeRecords(),modal.classList.add('hn-v78-docked');
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
/* V78.1 compact override: this stylesheet intentionally wins over legacy !important rules. */
(()=>{const style=document.createElement('style');style.textContent=`
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window{top:auto!important;bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;left:12px!important;right:12px!important;width:auto!important;max-width:none!important;min-height:0!important;height:74px!important;overflow:hidden!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-content{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;height:100%!important;min-height:0!important;padding:8px 14px!important;gap:12px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-header,body.hn-playing:not(.hn-player-fullscreen) .hn-player-transport,body.hn-playing:not(.hn-player-fullscreen) #audioPlayer{display:none!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-center{display:flex!important;flex:1!important;min-width:0!important;align-items:center!important;gap:12px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window .player-icon{width:55px!important;height:55px!important;min-width:55px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-meta{flex:1!important;min-width:0!important}
body.hn-playing:not(.hn-player-fullscreen) #nowPlaying{font-size:15px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.hn-playing:not(.hn-player-fullscreen) main{padding-top:0!important;padding-bottom:110px!important}
.hn-v78-controls{display:none;align-items:center;gap:10px;flex:none;z-index:5}
body.hn-playing:not(.hn-player-fullscreen) .hn-v78-controls{display:flex}
.hn-v78-controls button{border:0!important;background:transparent!important;color:#f3e6ff!important;min-width:40px!important;height:44px!important;padding:5px!important;font-size:25px!important;cursor:pointer}
.hn-v78-controls button.hn-v78-play{font-size:29px!important}
.hn-v78-progress{position:absolute;bottom:0;left:0;width:100%;height:3px;background:#64436a;z-index:6;cursor:pointer}
.hn-v78-progress span{display:block;height:100%;width:0;background:#c37cff;pointer-events:none}
@media(max-width:760px){body.hn-playing:not(.hn-player-fullscreen) .hn-player-window{bottom:calc(76px + env(safe-area-inset-bottom,0px))!important;left:8px!important;right:8px!important;height:68px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-player-content{padding:6px 10px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-player-window .player-icon{width:48px!important;height:48px!important;min-width:48px!important}}
#hnExternalPlayer.hn-v78-docked .hn-external-card{width:min(430px,100%)!important;margin-left:auto!important;margin-right:auto!important}
#hnExternalPlayer.hn-v78-docked .hn-external-frame{min-width:200px!important;min-height:200px!important;max-width:100%!important}
`;document.head.append(style);
function ready(){const player=document.querySelector('.hn-player-window'),audio=document.getElementById('audioPlayer');if(!player||!audio||player.querySelector('.hn-v78-controls'))return;const controls=document.createElement('div');controls.className='hn-v78-controls';const expand=document.createElement('button');expand.textContent='▣';expand.title='Vollbild';expand.setAttribute('aria-label','Vollbild');expand.onclick=e=>{e.stopPropagation();document.getElementById('hnPlayerFullscreen')?.click()};const play=document.createElement('button');play.className='hn-v78-play';play.setAttribute('aria-label','Play/Pause');play.onclick=e=>{e.stopPropagation();if(audio.paused)audio.play().catch(()=>{});else audio.pause()};controls.append(expand,play);player.querySelector('.hn-player-content').append(controls);const bar=document.createElement('div');bar.className='hn-v78-progress';bar.innerHTML='<span></span>';player.append(bar);const update=()=>{play.textContent=audio.paused?'▶':'❚❚';bar.firstElementChild.style.width=audio.duration&&Number.isFinite(audio.duration)?(audio.currentTime/audio.duration*100)+'%':'0%'};['play','pause','timeupdate','durationchange','ended'].forEach(e=>audio.addEventListener(e,update));bar.addEventListener('click',e=>{e.stopPropagation();if(audio.duration&&Number.isFinite(audio.duration))audio.currentTime=(e.clientX-bar.getBoundingClientRect().left)/bar.clientWidth*audio.duration});update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();