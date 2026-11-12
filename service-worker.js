/* A versioned offline shell. No skipWaiting during an active reign. */
const CACHE = 'reignseed-p28-v1';
const SHELL=['./','./index.html','./styles/main.css','./scripts/main.js','./scripts/core.js','./scripts/content.js','./scripts/council.js','./scripts/persistence.js','./scripts/scene.js','./scripts/adventure.js','./scripts/adventure_ui.js','./scripts/battle_fx.js','./scripts/military.js','./scripts/military_ui.js','./scripts/military_fx.js','./scripts/regional.js','./scripts/regional_ui.js','./scripts/frontier.js','./scripts/frontier_ui.js','./scripts/depth.js','./scripts/depth_ui.js','./scripts/act3.js','./scripts/act3_ui.js','./scripts/act4.js','./scripts/act4_ui.js','./scripts/act5.js','./scripts/act5_ui.js','./scripts/polish27.js','./manifest.webmanifest','./static/icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('reignseed-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==location.origin)return;event.respondWith((async()=>{try {const network=await fetch(request);if(network.ok){const cache=await caches.open(CACHE);cache.put(request,network.clone()).catch(()=>{});}return network;} catch {return (await caches.match(request)) || Response.error();}})());});

/* Updates activate only after the player chooses to reload from Settings. */
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_WHEN_SAFE')self.skipWaiting();});
