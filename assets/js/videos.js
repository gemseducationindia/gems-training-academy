/* Clips recorded for the academy (generated). */
(function () {
  const V = new Set([
    "v-calling-intent",
    "v-calling-status",
    "v-crm-basics-arrive",
    "v-crm-basics-open",
    "v-exotel-call",
    "v-exotel-login",
    "v-exotel-setup",
    "v-exotel-verify",
    "v-exotel-why",
    "v-financials-order",
    "v-financials-practice",
    "v-financials-why",
    "v-find-filter-button",
    "v-find-quick-filters",
    "v-junk-lost-popup",
    "v-lead-info-application-status",
    "v-lead-info-enquiry-status",
    "v-lead-info-outcomes",
    "v-visits-handover",
    "v-visits-school",
    "v-walk-in-fill",
    "v-walk-in-next",
    "v-walk-in-when",
  ]);
  window.GCT_CONTENT.MODULES.forEach((m) => m.lessons.forEach((l) => { const n = `v-${m.id}-${l.id}`; if (!l.video && V.has(n)) l.video = n; }));
  window.GTA_ADMIN.SECTIONS.forEach((s) => s.topics.forEach((t) => { const n = `v-hb-${s.id}-${t.id}`; if (!t.video && V.has(n)) t.video = n; }));
})();
