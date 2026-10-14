/* HamNava V79 preview: single audio engine, Spotify-inspired compact dock. */
(()=>{'use strict';
const css=document.createElement('style');css.id='hn-v79-player-css';css.textContent=`
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window{position:fixed!important;inset:auto 10px calc(12px + env(safe-area-inset-bottom,0px)) 10px!important;width:auto!important;max-width:none!important;height:76px!important;min-height:0!important;max-height:76px!important;overflow:hidden!important;transform:none!important;z-index:19000!important;border:1px solid #5f436e!important;border-radius:16px!important;background:#18121e!important;box-shadow:0 8px 28px #0008!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window:before{background:#18121ef2!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-background{opacity:.12!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-content{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;height:100%!important;min-height:0!important;padding:8px 13px 11px!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-header,body.hn-playing:not(.hn-player-fullscreen) .hn-player-transport,body.hn-playing:not(.hn-player-fullscreen) #audioPlayer{display:none!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-center{display:flex!important;align-items:center!important;flex:1!important;min-width:0!important;gap:11px!important;margin:0!important;padding:0!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-window .player-icon{width:52px!important;height:52px!important;min-width:52px!important;flex:none!important;border-radius:9px!important;overflow:hidden!important}
body.hn-playing:not(.hn-player-fullscreen) .hn-player-meta{flex:1!important;min-width:0!important;display:flex!important;flex-direction:column!important;gap:3px!important}
body.hn-playing:not(.hn-player-fullscreen) #nowPlaying{font-size:14px!important;font-weight:700!important;line-height:1.3!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.hn-playing:not(.hn-player-fullscreen) #hnPlayerArtist{font-size:12px!important;line-height:1.3!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;color:#b5a9bd!important}
body.hn-playing:not(.hn-player-fullscreen) main{padding-top:0!important;padding-bottom:118px!important}
.hn-v79-actions{display:none;align-items:center;gap:5px;flex:none;z-index:5}
body.hn-playing:not(.hn-player-fullscreen) .hn-v79-actions{display:flex!important}
.hn-v79-actions button{border:0!important;background:transparent!important;color:#f4eefa!important;border-radius:50%!important;width:40px!important;height:42px!important;min-width:0!important;padding:0!important;font-size:22px!important;cursor:pointer!important;box-shadow:none!important}
.hn-v79-actions .hn-v79-play{font-size:25px!important}
.hn-v79-progress{display:none;position:absolute;left:76px;right:12px;bottom:3px;height:3px;border-radius:4px;background:#5c5361;z-index:8;cursor:pointer;touch-action:none}
body.hn-playing:not(.hn-player-fullscreen) .hn-v79-progress{display:block}
.hn-v79-progress>span{display:block;width:0;height:100%;background:#ba83eb;border-radius:4px;pointer-events:none}
body.hn-player-fullscreen .hn-v79-actions,body.hn-player-fullscreen .hn-v79-progress{display:none!important}
@media(max-width:760px){body.hn-playing:not(.hn-player-fullscreen) .hn-player-window{inset:auto 8px calc(76px + env(safe-area-inset-bottom,0px)) 8px!important;height:70px!important;max-height:70px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-player-content{padding:7px 10px 10px!important;gap:5px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-player-window .player-icon{width:47px!important;height:47px!important;min-width:47px!important}body.hn-playing:not(.hn-player-fullscreen) .hn-v79-progress{left:67px;right:10px}body.hn-playing:not(.hn-player-fullscreen) main{padding-bottom:180px!important}}
#hnExternalPlayer[hidden]{display:none!important}
#hnExternalPlayer.hn-v79-embed{position:fixed!important;inset:auto 10px calc(12px + env(safe-area-inset-bottom,0px)) 10px!important;display:flex!important;align-items:flex-end!important;justify-content:center!important;padding:0!important;background:transparent!important;backdrop-filter:none!important;pointer-events:none!important;z-index:19500!important}
#hnExternalPlayer.hn-v79-embed .hn-external-card{pointer-events:auto!important;width:min(440px,100%)!important;max-height:75dvh!important;overflow:auto!important;padding:12px!important;border-radius:16px!important;background:#18121e!important;border:1px solid #5f436e!important}
#hnExternalPlayer.hn-v79-embed .hn-external-head h2{font-size:15px!important}
#hnExternalPlayer.hn-v79-embed iframe{display:block!important;width:100%!important;min-width:200px!important;min-height:200px!important;aspect-ratio:16/9!important;border:0!important;margin:8px 0!important}
@media(max-width:760px){#hnExternalPlayer.hn-v79-embed{bottom:calc(76px + env(safe-area-inset-bottom,0px))!important}}
`;document.head.append(css);
function init(){const player=document.querySelector('.hn-player-window'),audio=document.getElementById('audioPlayer'),modal=document.getElementById('hnExternalPlayer');if(!player||!audio)return;
const old=document.querySelectorAll('.hn-v78-controls,.hn-v78-progress,#hnV78Expand');old.forEach(el=>el.remove());
const actions=document.createElement('div');actions.className='hn-v79-actions';
const expand=document.getElementById('hnPlayerFullscreen');if(expand){const expandProxy=document.createElement('button');expandProxy.type='button';expandProxy.textContent='⛶';expandProxy.setAttribute('aria-label','Player öffnen');expandProxy.addEventListener('click',e=>{e.stopPropagation();expand.click()});actions.append(expandProxy)}
const play=document.createElement('button');play.type='button';play.className='hn-v79-play';play.setAttribute('aria-label','Wiedergabe starten oder pausieren');play.addEventListener('click',e=>{e.stopPropagation();if(audio.paused)audio.play().catch(()=>{});else audio.pause()});actions.append(play);player.querySelector('.hn-player-content')?.append(actions);
const progress=document.createElement('div');progress.className='hn-v79-progress';progress.setAttribute('role','slider');progress.setAttribute('aria-label','Wiedergabeposition');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');progress.innerHTML='<span></span>';player.append(progress);
function sync(){play.textContent=audio.paused?'▶':'❚❚';const pct=Number.isFinite(audio.duration)&&audio.duration>0?Math.max(0,Math.min(100,audio.currentTime/audio.duration*100)):0;progress.firstElementChild.style.width=pct+'%';progress.setAttribute('aria-valuenow',String(Math.round(pct)))}
['play','pause','timeupdate','durationchange','loadedmetadata','ended'].forEach(evt=>audio.addEventListener(evt,sync));sync();
function seek(e){if(!Number.isFinite(audio.duration)||audio.duration<=0)return;const r=progress.getBoundingClientRect();audio.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*audio.duration;sync()}
progress.addEventListener('pointerdown',e=>{e.stopPropagation();seek(e);progress.setPointerCapture?.(e.pointerId)});progress.addEventListener('pointermove',e=>{if(e.buttons)seek(e)});progress.addEventListener('click',e=>e.stopPropagation());
player.querySelector('.hn-player-center')?.addEventListener('click',e=>{if(e.target.closest('button,a'))return;expand?.click()});
if(modal){const observe=()=>{modal.classList.toggle('hn-v79-embed',!modal.hidden)};new MutationObserver(observe).observe(modal,{attributes:true,attributeFilter:['hidden']});observe()}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();