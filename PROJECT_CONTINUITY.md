# HamNava — Project continuity and development rules

Last verified: 2026-10-16. This is the canonical handoff document for future ChatGPT conversations. Read this document AND inspect current source code before editing. It is a working record, not a substitute for GitHub history or live testing.

## Identity and locations
- Repository: https://github.com/mbmorawej/hamnava
- Branch: `main`
- Current development preview: `preview-v78.html`
- Preview URL: https://mbmorawej.github.io/hamnava/preview-v78.html?v=236
- Main preview companion script: `scripts/hamnava-v78-community-preview-v181.js`
- Other relevant upload page: `add-song.html`
- Supabase: external backend for authentication, database, storage; NEVER commit private keys or user credentials to this document.
- `index.html` MUST NOT be changed without explicit user permission.
- User-facing UI language: German. Conversation with owner: Persian.

## Non-negotiable engineering workflow
1. Before any change, inspect the latest actual code on `main` and locate the original implementation. Do not guess function names or add parallel code for behavior that already exists.
2. Preserve working functionality: song cards, playback, fixed mini-player, Favorites, playlists, account/security and Community.
3. Create a unique backup branch from `main` before each modification.
4. Make the smallest targeted change to existing implementation. Only introduce new code when the required functionality genuinely does not exist.
5. Do not alter database schema, Supabase policies, production `index.html`, or authentication configuration without explicit authorization.
6. Re-fetch changed GitHub files and verify exact committed code after writing. Distinguish source verification from real-device tests.
7. Increment preview cache-busting query `?v=N` in the link given to the owner after each code revision. Update script cache-busting URL only when the referenced script is actually changed.
8. Explain changes in Persian and provide a clickable preview link. Request an iPhone test for mobile changes. Never claim to have tested on owner's phone.
9. When a task is finished, update this continuity file with verified changes, known issues, latest tested version, and next steps. Prefer updating this same file, not creating duplicate status files.
10. Avoid unnecessary large code additions, competing implementations, accumulating CSS/JS patches, and regressions. Backups are safety nets, not a reason to make broad changes.

## Current baseline: V236 (owner confirmed improvement on iPhone)
- V235: In `preview-v78.html`, `cfg()` deduplicated initial authenticated load by using the auth state listener instead of separately initiating another `getSession()` load. `loadAll()` now renders initial songs before waiting for `hn_get_play_counts` RPC; popular-song view refreshes after stats arrive. Owner confirmed mobile startup improved.
- V236: `renderSongs()` sets the first two home and popular cover images to eager/high priority, while others remain lazy. Owner confirmed images appeared faster on iPhone.
- V236 code commit: `62a57c1d0fa165b407787a38bfef50715ac7272b` (historical, later commits may exist).
- Backup branches: `backup/before-mobile-initial-load-optimization-20261016`, `backup/before-mobile-cover-priority-v236-20261016`.
- As of latest check, V235 and V236 logic is present on main.

## Playback and UI expectations
- Library song cards have prominent play action, favorite heart and playlist-add (+); do not replace play controls with edit buttons.
- Favorites and playlist song cards should match Library card presentation; playlist and Favorites support queue navigation (play/pause, next/previous, expand, stop).
- Single-track player must have a stop/close control without causing duplicate close buttons in playlist mode.
- Mini-player remains fixed at bottom during scrolling, including mobile.
- Public/private playlist navigation is hierarchical: choosing a category shows only that category; entering one playlist hides other playlists until Back.
- Playlist track removal is a dedicated icon button; access controls must be preserved.
- Community includes member profiles, following/followers and fixed floating navigation.

## Known architectural risks and priorities
- `preview-v78.html` is large and contains many inline script/style blocks and DOM MutationObservers. Do not attempt sweeping refactors without measurement and explicit consent.
- Initial data loading selects up to 1000 songs using `select('*')`. Before narrowing columns, inventory every field consumed by all views.
- Cover images have lazy loading in multiple views; first home covers were prioritized in V236.
- Next requested work: examine image sizes, Supabase Storage caching, and repeat-visit loading time. Measure and identify root causes before changing code. Preserve V236 performance.
- Avoid claiming that attaching a custom domain by itself accelerates Supabase or page loading.
- Potential later rebrand/domain migration is postponed; do not change domain, repository name or branding until explicitly requested.

## How to resume in a new chat
Owner can say: "ادامه پروژه HamNava؛ ابتدا فایل PROJECT_CONTINUITY.md در GitHub را بخوان، سپس کد اصلی را بررسی کن و از آخرین نسخه تأییدشده ادامه بده. هیچ کد موازی اضافه نکن."
Assistant should fetch this file from main, verify latest source and current preview version, and continue without requiring a long manually copied chat history.

## Change log
- 2026-10-16: Created canonical continuity document. No runtime/application code changed in this documentation commit.

- 2026-10-16 V247: Added admin-only `Spotify-Link bearbeiten` action to existing song cards in `preview-v78.html`. It updates the existing Supabase `songs` row `url` and `external_id` (and resets/refetches cover) without changing the song ID, preserving favorites and playlist references. Backup branch `backup-before-v247-spotify-link-editor-20261016`. Test target: Ebi Arezou, Spotify `https://open.spotify.com/track/5WC0p8exH1UlVFKI7paK81`. This was not tested on a real iPhone or live Supabase by the assistant; user must verify.

- 2026-10-16 V248: Moved existing admin Spotify track URL editor off song cards into desktop-only `Verwaltung > Spotify-Links` tab with search, using the existing `hnEditSongExternalLink` function and existing `hnManageOpen` tab logic. Improved mobile library/favorites song card overlay controls from 32px/4px spacing to 44px/13px spacing in a mobile media query; `index.html` unchanged. Backup branch `backup-before-v248-admin-spotify-mobile-cards-20261016`. GitHub source re-read; no real-device or Supabase execution claimed. Preview `preview-v78.html?v=248`.

- 2026-10-16 V249: Changed the original V156 mobile song-grid CSS to render Favoriten (`#favoriteSongs`) as larger single-column, full-width cards with square cover images, instead of compact two-column cards. Other song grids and song actions remain unchanged. Backup `backup-before-v249-favorites-card-size-20261016`. Verified GitHub readback; iPhone visual check pending. Preview `preview-v78.html?v=249`.
