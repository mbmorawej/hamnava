# HamNava — Project continuity and development rules

Last verified: 2026-10-16. This is the canonical handoff document for future ChatGPT conversations. Read this document AND inspect current source code before editing. It is a working record, not a substitute for GitHub history or live testing.

## Identity and locations
- Repository: https://github.com/mbmorawej/hamnava
- Branch: `main`
- Current development preview: `preview-v78.html`
- Preview URL: https://mbmorawej.github.io/hamnava/preview-v78.html?v=252
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

- 2026-10-16 V250: Removed the `Meine Favoriten` heading and subtitle from the original `#favoritesPage` HTML. Extended existing V239 mobile header CSS so, only while Favoriten is current, the logo/tagline block is hidden and top spacing removed; navigation toggle, account identity, song cards and player remain intact. Backup `backup-before-v250-favorites-clean-header-20261016`. Verified GitHub readback, no physical iPhone test claimed. Preview `preview-v78.html?v=250`.

- 2026-10-16 V251: Replaced two stray literal `\\n` text artifacts in HTML/CSS boundaries with actual line breaks, preserving JavaScript string escapes and CSV parsing. Updated the existing `hn-v156-library-parity` CSS to remove redundant outer panel border/background/shadow only on active song-list pages with rendered song articles and reduce mobile top whitespace in song grids. Kept individual song cards, navigation and player unchanged. Backup branch `backup-before-v251-song-card-layout-20261016`. GitHub file reread verified; visual iPhone verification pending. Preview `preview-v78.html?v=251`.

- 2026-10-16 V252: Corrected the existing shared mobile `main` layout rule in `hamnava-mobile-sidebar-access-v3`, reducing authenticated page top padding from 85px to 12px. Explicitly retained 85px for active `#member-profile` as requested. No card, player, navigation or data logic changed. Backup: `backup-before-v252-mobile-top-gap-20261016`. HTML GitHub readback verified; iPhone visual verification pending. Preview `preview-v78.html?v=252`.

- 2026-10-16 V253: In the original `hamnava-mobile-sidebar-access-v3` mobile header rule, stopped re-showing the redundant `main>header` on authenticated content pages; removed its 20px bottom margin. Retained original header on active `#member-profile`, with its spacing. Logo/tagline and redundant header whitespace no longer occupy mobile content pages; core song cards, controls and player unchanged. Backup `backup-before-v253-mobile-header-cleanup-20261016`. HTML GitHub readback verified; iPhone visual test pending. Preview `preview-v78.html?v=253`.

- 2026-10-16 V254: Began conservative CSS deduplication audit (149 style blocks, approximately 1750 simple rule matches, 292 repeated selector strings; repetitions are not necessarily redundant). Removed one earlier superseded mobile `main>header{display:none}` declaration and one earlier superseded `main{padding-top:76px}` declaration. Retained current 12px mobile top padding, member-profile exception, and separate playing/logged-out states. No new CSS blocks, no JavaScript edits. Backup `backup-before-v254-safe-mobile-css-dedup-20261016`. Source readback verified; browser/iPhone regression testing pending. Preview `preview-v78.html?v=254`.

- 2026-10-16 V255: Continued conservative CSS deduplication. Removed only one occurrence each of three exact duplicate declarations: hidden old playlist header options, hidden closed playlist option menus, and hidden redundant Community social heading. One identical declaration of each remains in original stylesheets. No JavaScript, card, playback or data edits. Backup `backup-before-v255-exact-css-dedup-20261016`. GitHub readback verified; iPhone/browser regression testing pending. Preview `preview-v78.html?v=255`.

- 2026-10-16 V256: Investigated reported slow song-card cover display. V235 authenticated startup and V236 home/popular eager/high-priority cover logic were still present after V254/V255 CSS cleanup. Root code-level limitation: `renderSongs()` only prioritized first two covers in home/popular; first covers in library/favorites/artist/playlist were lazy. Updated that existing cover-rendering statement so first two images in every `renderSongs` list get eager/high priority, and image attributes are set before `src`. Remaining covers remain lazy/async. No changes to Supabase fetching, data, CSS or cache implementation. Backup `backup-before-v256-visible-song-cover-priority-20261016`. GitHub readback verified; real iPhone speed improvement unverified. Preview `preview-v78.html?v=256`.

- 2026-10-16 V257: Owner screenshot showed unnecessary four-column footer on iPhone. Updated existing `<style id="hn-footer-bottom-fix">` with a max-width:760px media rule to hide `#hnFooter` in mobile logged-in and logged-out states, overriding the existing always-visible footer rules. Desktop footer markup and styles preserved. No changes to mobile navigation, player, songs or image priority. Backup `backup-before-v257-hide-mobile-footer-20261016`. GitHub readback verified; iPhone visual verification pending. Preview `preview-v78.html?v=257`.

- 2026-10-16 V258: User screenshot shows redundant green outer frame around public/private playlist section frames on iPhone. In original `hn-v75-playlist-overlap-fix` CSS added a narrowly scoped mobile `#playlists.hn-v71-home` declaration removing outer panel border, shadow, background and padding, preserving inner `.hn-v71-section` frames and all playlist handlers/cards. Desktop and non-landing playlist states unaffected. Backup `backup-before-v258-playlist-outer-frame-20261016`. GitHub readback verified; iPhone visual verification pending. Preview `preview-v78.html?v=258`.

- 2026-10-16 V259: User confirmed V258 outer panel frame still appeared on mobile Playlists and Artists. Source inspection found both `#artists` and `#playlists` are `<section class="panel">`; V258 selector only applied to playlist landing and V251 only when song cards exist. Removed V258 rule from original `hn-v75-playlist-overlap-fix`; integrated a single mobile rule into existing `hn-v156-library-parity`: `body:not(.logged-out) :is(#artists,#playlists).hn-current` removes outer border, shadow, background, padding. Internal `.hn-v71-section`, cards, menus and JS remain unchanged. Backup `backup-before-v259-mobile-artists-playlists-frame-20261016`. GitHub readback verified; iPhone visual verification pending. Preview `preview-v78.html?v=259`.

- 2026-10-16 V260: Owner clarified with screenshots that the redundant frame is a thin GREEN line around artist and playlist panels. Source audit found original `.panel:target{outline:1px solid #2d8a54}` in initial stylesheet, matching color and hash-route target behavior; border/background removal in V258/V259 could not affect this outline. Removed that original rule (globally removes green target outline, not button keyboard focus outlines) and removed the ineffective V259 mobile panel override. Kept internal playlist frames, cards, player and other CSS. Backup `backup-before-v260-remove-target-panel-outline-20261016`. GitHub readback verified; owner iPhone confirmation pending. Preview `preview-v78.html?v=260`.

- 2026-10-17 V261: After V260 successfully removed green `.panel:target` outline, user screenshots still show gray outer panel frame around artists and playlist sections. Updated original `hn-v156-library-parity` mobile media block with narrowly scoped selector `body.hn-ready:not(.logged-out) :is(section#artists.panel,section#playlists.panel).hn-current`, removing border, outline, shadow, background and padding on mobile outer page shells only. Internal artist cards and `.hn-v71-section` purple playlist frames unchanged; no JS/data changes. Backup `backup-before-v261-remove-mobile-outer-panel-frame-20261017`. GitHub readback verified; iPhone visual verification pending. Preview `preview-v78.html?v=261`.

- 2026-10-17 V262: Owner requested removal of redundant HamNava logo and top informational header in profile/following/followers views. Source showed special mobile exception for `#member-profile.hn-current` re-displaying shared `main>header` and increasing main padding to 85px, despite V253 hiding it elsewhere. Removed those two exception declarations from original `hamnava-mobile-sidebar-access-v3` style. Existing general mobile header-hidden rule and 12px main padding now apply to member profile. Profile content and follow controls untouched. Backup `backup-before-v262-mobile-profile-shared-header-20261017`. GitHub readback verified; iPhone confirmation pending. Preview `preview-v78.html?v=262`.

- 2026-10-17 V263: User reports mobile top spacing still excessive, desktop must retain HamNava logo/header, and selected-artist song cards are huge on both devices. Source inspection found original `#artists #artistSongs` explicitly forced one full-width column. Replaced with desktop responsive auto-fill minmax 210px, mobile two-column grid with 9px gap; reused existing V167 compact mobile glass-button styling for artist songs and changed existing V167 artist sync to retain on-cover actions on desktop with matching desktop glass CSS. Changed only authenticated mobile `main` padding-top from 12px to 0; no desktop header/logo rules touched. Backup `backup-before-v263-mobile-spacing-artist-cards-20261017`. GitHub readback verified, actual iPhone/laptop layout not yet verified. Preview `preview-v78.html?v=263`.

- 2026-10-17 V264: User reports artist song cards/buttons still do not match Musikbibliothek on laptop and mobile; requested cautious cleanup. Compared actual main HTML and found artist-specific V263 grid rules, desktop oversized glass action overrides, and independent V167 artist DOM observer competing with shared V140/V141 handlers. Backup `backup-before-v264-artist-library-card-parity-20261017`. In original artist CSS removed independent column widths; added `#artistSongs` to the existing V156 desktop and mobile shared grid selectors (desktop auto-fill minmax 210px, mobile 2 columns). Added `artistSongs` to existing V140 shared action placement roots and V141 shared icon generation roots. Removed the V263 desktop artist-only glass-button styling and V167 artist-specific DOM manipulation/icons, preserving V167 public-playlist permission logic and observer. V167 shared mobile CSS already includes artistSongs. No changes to renderSongs handlers, favorite/playlist actions, player, data, auth, desktop header or Supabase. Verified GitHub readback SHA 40b2bf91670e4c7d15a77605ca975ecbf5bc0ead; actual laptop/iPhone regression testing pending. Preview `preview-v78.html?v=264`.
