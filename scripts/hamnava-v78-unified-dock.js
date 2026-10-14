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
const expand=document.createElement('button');expand.id='hnV78Expand';expand.type='button';expand.title='Player vergrößern';expand.setAttribute('aria-label','Player vergrößern');expand.textContent='⛶';expand.addEventListener('click',()=>$('#hnPlayerFullscreen')?.click());$('.hn-player-transport')?.append(expand);
player.addEventListener('click',e=>{if(e.target.closest('button,a,audio,input'))return;$('#hnPlayerFullscreen')?.click()});
const observer=new MutationObserver(()=>{if(!modal.hidden){modal.classList.add('hn-v78-docked');external=true;document.body.classList.remove('hn-playing')}else{modal.classList.remove('hn-v78-docked');external=false}});
observer.observe(modal,{attributes:true,attributeFilter:['hidden']});if(!modal.hidden)observer.takeRecords(),modal.classList.add('hn-v78-docked');
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();