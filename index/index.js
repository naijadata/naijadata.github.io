let allRecords = [];

// LOAD: Fetch from Go Server
async function fetchRecords() {
    try {
        const response = await fetch('/api/data');
        allRecords = await response.json() || [];
        renderDisplay(allRecords);
    } catch (e) {
        console.error("Failed to load records", e);
    }
}

// CREATE: Submit form to Go Server
document.getElementById('indexForm').onsubmit = async(e) => {
    e.preventDefault();
    const btn = document.getElementById('saveBtn');
    btn.innerText = "Indexing...";

    const newEntry = {
        id: 'IDX-' + Date.now(),
        subject: document.getElementById('subject').value.toUpperCase(),
        source: document.getElementById('source').value,
        pub_date: document.getElementById('pub_date').value,
        page: document.getElementById('page').value,
        link: document.getElementById('link').value,
        fact: document.getElementById('fact').value,
        tags: document.getElementById('tags').value.split(',').map(t => t.trim())
    };

    allRecords.unshift(newEntry); // Add to top
    await syncWithServer();

    e.target.reset();
    btn.innerText = "Archive to Digital Cabinet";
};

// DELETE: Remove record and sync
async function removeRecord(id) {
    if (!confirm("Are you sure you want to delete this record from the archive?")) return;
    allRecords = allRecords.filter(r => r.id !== id);
    await syncWithServer();
}

// SYNC: Send state to Go backend
async function syncWithServer() {
    await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(allRecords)
    });
    renderDisplay(allRecords);
}

// SEARCH: Real-time filtering
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allRecords.filter(r =>
        r.fact.toLowerCase().includes(term) ||
        r.subject.toLowerCase().includes(term) ||
        r.tags.some(t => t.toLowerCase().includes(term))
    );
    renderDisplay(filtered);
});

// RENDER: Logic to draw cards
function renderDisplay(data) {
    const container = document.getElementById('cardsContainer');
    const stats = document.getElementById('statsCount');

    stats.innerText = `DATABASE ACCESS: ${data.length} records retrieved from digital cabinet`;
    container.innerHTML = '';

    data.forEach(r => {
                const card = document.createElement('div');
                card.className = 'index-card';
                card.innerHTML = `
                    <span class="card-subject">${r.subject}</span>
                    <div class="card-fact">"${r.fact}"</div>
                    <div class="card-meta">
                        <span>${r.source}, ${r.pub_date}</span>
                        <span>Page ${r.page}</span>
                    </div>
                    <div class="card-actions">
                        <div class="card-tags">
                            ${r.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
                        </div>
                        <div style="display:flex; gap:15px; align-items:center;">
                            ${r.link ? `<a href="${r.link}" target="_blank" class="btn-link">🔗 View Source</a>` : ''}
                            <button class="btn-delete" onclick="removeRecord('${r.id}')">Delete</button>
                        </div>
                    </div>
                    <div class="card-hole"></div>
                `;
                container.appendChild(card);
            });
        }

        // Initial Start
        fetchRecords();