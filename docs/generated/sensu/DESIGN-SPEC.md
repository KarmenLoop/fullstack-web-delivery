# Design system and UX rules

Project: SENSU Digital — enterprise site and interaction studies. Output language: English public example; use the client-requested language for new projects.

## Composition

Use the existing editorial brand on public service pages: clear business proposition, specific service choices and a visible inquiry path. Treat administration as an operational record workspace. Treat the lab as an index plus one active mechanism and its explanation. Do not repeat one marketing-card grid across these different tasks.

## Typography

Inherit --font from src/tokens.css: installed PingFang SC, Hiragino Sans GB, Microsoft YaHei and system sans fallbacks; no custom font license is claimed. The winning shared body rule is 16px/1.7; lab body typically 11–13px, metadata 9–11px, scene headings 16–32px, display 35px on phones up to 54px on desktop. Keep text readable at the actual viewport and browser zoom; headings need a clear hierarchy, not repeated labels above them.

## Color

Paper #f6f5ef; pale #edf0e6; ink #173d30; green #245b46; muted #58685f; line #dce2d5. Use green/ink for state and focus, tinted pale surfaces for grouping. Error state has written recovery as well as a muted rust treatment. Validate text contrast in the actual combinations; color never carries state alone.

## Spacing

Existing radius tokens are 14px and 8px. The lab uses fine borders, 5–8px specimen surfaces and 28px completion pill/circle geometry. Desktop shell uses 52px side gutters; phone 20px. Group related controls tightly; separate content, state and explanation. Reserve enough card height for phone wrapping; use fluid minmax columns rather than fixed page widths.

## Components

Reuse Radix dialog/icons and native button, link, checkbox, select and form semantics. Controls have visible hover/focus/pressed/disabled states; ordinary hit targets are at least 44px, including label hit area. A disabled control needs an understandable reason. Use a consistent SVG icon vocabulary. Keep success button DOM/focus stable; collapse hidden content and outgoing transition layers must not add focus targets.

## Navigation

Public primary navigation: Home, Services, Approach, About, with inquiry as primary CTA and privacy/staff entry in supporting navigation. Service details return to the service index. The separate lab uses six study links and query-driven view links; honor history, modified clicks and keyboard activation. Admin has search/status/paging and record details, not public marketing navigation.

## Feedback

Distinguish press, pending, confirmed result, recoverable error, empty, disabled and interrupted states. Derive coordinated visuals from a single business state. Success follows the real response; lab work is labeled simulation. Stop in-flight motion when reduced motion becomes active. Avoid fake progress, duplicate writes, lost form input and hidden errors.

## Accessibility

Semantic landmarks/headings; meaningful labels; visible keyboard focus; stable focus after async form replacement and dialog exit; native alternatives for gestures; written final state; aria-live only for useful results. Respect live prefers-reduced-motion changes, touch scrolling outside contained gestures and zoom. Browser operation is not a full assistive-technology audit.

## Responsive

Inspect 1440px desktop, 390px phone and the actual in-app width. Phone layouts expose action and state without hover; admin record details remain operable. Lab index becomes two columns above one canvas. Prevent page overflow and clipped copy, but verify task completion separately. Resizing a completed radial view must not leave a stale pixel clip.

## Assets

Fictional brand and authored mechanism scenes; existing architectural illustration is labeled synthetic. Do not invent client logos, awards, portraits, recordings or customer outcomes. Verify rights/provenance before adding real assets. No third-party skill content or brand skin is copied.
