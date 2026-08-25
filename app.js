const toast = document.querySelector('#toast');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const suggestions = document.querySelector('#suggestions');
const localResults = document.querySelector('#localResults');
const themes = ['circuit', 'pixel', 'solar'];
let themeIndex = 0;
const searchIndex = [
	{ title: 'The strange world of deep space', type: 'Featured topic · Science', text: 'Black holes, strange planets, and the questions that keep astronomers looking up.', source: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/' , art: 'space-result' },
	{ title: 'How memory works', type: 'Learn · 5 min', text: 'Build a better mental model and understand how memory works.', source: 'Simply Psychology', url: 'https://www.simplypsychology.org/memory.html', art: 'memory-result' },
	{ title: 'Spot the pattern', type: 'Think · 8 min', text: 'Train your observation skills by finding patterns.', source: 'NRICH Mathematics', url: 'https://nrich.maths.org/' , art: 'pattern-result' },
	{ title: 'Build a tiny world', type: 'Create · 12 min', text: 'Turn an idea into a system and make something new.', source: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn', art: 'code-result' },
	{ title: 'Our changing planet', type: 'Learn · 6 min', text: 'See the big picture clearly and explore our changing planet.', source: 'NASA Climate', url: 'https://climate.nasa.gov/' , art: 'planet-result' },
];

searchForm.addEventListener('submit', (event) => { event.preventDefault(); renderResults(searchInput.value.trim()); });
searchInput.addEventListener('input', () => { if (searchInput.value.trim()) renderResults(searchInput.value.trim(), true); else { suggestions.innerHTML = ''; localResults.innerHTML = ''; } });
function renderResults(query, preview = false) { const normalized = query.toLowerCase(); const matches = searchIndex.filter((item) => `${item.title} ${item.type} ${item.text} ${item.source}`.toLowerCase().includes(normalized)); const safeQuery = escapeHTML(query); suggestions.innerHTML = ''; localResults.innerHTML = `<div class="results-top"><span>${matches.length} ${matches.length === 1 ? 'RESULT' : 'RESULTS'}</span><small>for "${safeQuery}"</small></div>${matches.length ? matches.map((item) => `<article class="local-result"><a class="result-art ${item.art}" href="${item.url}" target="_blank" rel="noopener" aria-label="Open ${escapeHTML(item.title)}"><span>↗</span></a><div class="result-copy"><span>${escapeHTML(item.type)}</span><h3><a href="${item.url}" target="_blank" rel="noopener">${escapeHTML(item.title)}</a></h3><p>${escapeHTML(item.text)}</p><small>${escapeHTML(item.source)}</small></div></article>`).join('') : '<p class="empty-results">No matches yet. Try a topic like science, memory, or coding.</p>'}`; if (!preview) { localResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); showToast(`${matches.length} ${matches.length === 1 ? 'result' : 'results'} found.`); } }
function escapeHTML(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]); }

document.querySelector('#themeToggle').addEventListener('click', () => { themeIndex = (themeIndex + 1) % themes.length; document.body.dataset.theme = themes[themeIndex]; showToast(`${themes[themeIndex].toUpperCase()} theme selected.`); });
document.querySelectorAll('[data-search]').forEach((link) => link.addEventListener('click', () => { window.location.hash = 'search'; }));
document.querySelectorAll('[data-coming]').forEach((button) => button.addEventListener('click', () => showToast(`${button.dataset.coming} is coming soon.`)));
document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active')); button.classList.add('active'); document.querySelectorAll('.game-card').forEach((card) => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; }); }));
function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.clearTimeout(showToast.timeout); showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600); }
