const mem = { sessions: [], foundations: [] };
const LS_KEY = 'beauty_kiosk_foundations_v2';
function persist() { try { localStorage.setItem(LS_KEY, JSON.stringify(mem.foundations)); } catch {} }
function load() { try { const raw = localStorage.getItem(LS_KEY); if (raw) mem.foundations = JSON.parse(raw); } catch {} }
load();
function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
const SKIN_TONES = ["#F8E7DA","#F6DFC6","#F4D7B4","#F4CFA6","#F4C2A1","#F0B895","#E8B4A0","#DCA58B","#CF987A","#C2866A","#B5755B","#A9674F","#9C5A44","#8E4B38","#7F3F2F","#6F3327","#5F2A21"];
export const db = {
  resetRuntime() { mem.sessions = []; },
  clearFoundations() { mem.foundations = []; persist(); },
  Foundation: { bulkCreate(list) { mem.foundations.push(...list); persist(); return list.map((_, i) => i); }, listAll() { return [...mem.foundations]; } },
  UserSession: {
    create(data) { const id = 'sess_' + Math.random().toString(36).slice(2,9); mem.sessions.push({ id, ...data }); return id; },
    update(id, patch) { const idx = mem.sessions.findIndex(s => s.id === id); if (idx >= 0) mem.sessions[idx] = { ...mem.sessions[idx], ...patch }; },
    get(id) { return mem.sessions.find(s => s.id === id); }
  },
  util: {
    randomFoundation() {
      const undertones = ['warm','cool','neutral'];
      const coverage = ['light','medium','full'];
      const finish = ['matte','satin','dewy','natural'];
      const skinTypes = ['dry','oily','combination','normal','sensitive'];
      return {
        shade_name: 'Shade ' + Math.random().toString(36).slice(2,6).toUpperCase(),
        hex_color: pick(SKIN_TONES),
        undertone: pick(undertones),
        coverage: pick(coverage),
        finish: pick(finish),
        skin_type: pick(skinTypes),
        confidence_score: Math.round(82 + Math.random()*16),
      };
    }
  }
};