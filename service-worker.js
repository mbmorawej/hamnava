/* HamNava PWA v44: only public app shell and local static assets.
   No Supabase/API/audio/Spotify/YouTube requests are cached. */
const CACHE='hamnava-static-v44';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const IMAGES=['./hamnava-sunset-banner.jpeg','./hamnava-banner-2.jpg','./hamnava-banner-3.jpg','./hayede-portrait.jpg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>Promise.allSettled([...SHELL,...IMAGES].map(path=>cache.add(path)))));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('hamnava-static-')&&key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()]));
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const url=new URL(request.url);
 if(!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));}
   return response;
  }).catch(()=>caches.match('./index.html').then(cached=>cached||Response.error())));
  return;
 }
 const allowed=new Set([...SHELL.slice(1),...IMAGES].map(path=>new URL(path,self.registration.scope).pathname));
 if(!allowed.has(url.pathname))return;
 event.respondWith(caches.match(request,{ignoreSearch:true}).then(cached=>cached||fetch(request).then(response=>{
  if(response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}
  return response;
 })));
});
