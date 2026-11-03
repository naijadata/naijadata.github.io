document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// App State Management
let currentSearchTerm = "";
let selectedChapter = "";
let selectedTag = "";

function initApp() {
    renderTOC();
    populateFilters();
    renderConstitution();
    setupListeners();
}

// 1. Populate the Table of Contents Sidebar
function renderTOC() {
    const tocList = document.getElementById('toc-list');
    let html = "";

    constitutionData.chapters.forEach(chap => {
        html += `
            <div class="toc-item">
                <a href="#chap-${chap.chapter_number}" class="toc-link" data-chap="${chap.chapter_number}">
                    Chapter ${chap.chapter_number}: ${chap.chapter_title}
                </a>
            </div>
        `;
    });
    tocList.innerHTML = html;
}

// 2. Populate Dropdowns Dynamically from actual data.js
function populateFilters() {
    const chapSelect = document.getElementById('chapterFilter');
    const tagSelect = document.getElementById('tagFilter');
    const allTags = new Set();

    constitutionData.chapters.forEach(chap => {
        // Populate chapters
        const opt = document.createElement('option');
        opt.value = chap.chapter_number;
        opt.innerText = `Chapter ${chap.chapter_number}: ${chap.chapter_title}`;
        chapSelect.appendChild(opt);

        // Gather unique tags (Fixes the previously broken 't' vs 'tag' variable typo)
        chap.sections.forEach(sec => {
            if (sec.tags) {
                sec.tags.forEach(tag => {
                    allTags.add(tag.toLowerCase().trim());
                });
            }
        });
    });

    // Populate tags dropdown
    Array.from(allTags).sort().forEach(tag => {
        const opt = document.createElement('option');
        opt.value = tag;
        opt.innerText = `#${tag}`;
        tagSelect.appendChild(opt);
    });
}

// Helper to escape regex special characters safely
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to highlight matching text queries safely
function highlight(text, term) {
    if (!term || term.trim() === "") return text;
    try {
        const cleanTerm = escapeRegExp(term.trim());
        const regex = new RegExp(`(${cleanTerm})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    } catch (e) {
        return text;
    }
}

// 3. Render Laws & Apply Search Filters (Optimized for speed using string concatenation)
function renderConstitution() {
    const container = document.getElementById('constitution-render');
    const status = document.getElementById('search-status');
    let mainHTML = "";
    let totalMatches = 0;

    constitutionData.chapters.forEach(chap => {
        // Filter by Chapter Selection
        if (selectedChapter && chap.chapter_number !== selectedChapter) return;

        // Filter sections in this chapter
        const matchedSections = chap.sections.filter(sec => {
            const matchesSearch = !currentSearchTerm ||
                sec.section_title.toLowerCase().includes(currentSearchTerm) ||
                sec.full_text.toLowerCase().includes(currentSearchTerm);

            const matchesTag = !selectedTag ||
                (sec.tags && sec.tags.some(t => t.toLowerCase() === selectedTag));

            return matchesSearch && matchesTag;
        });

        if (matchedSections.length === 0) return;

        // Build Chapter Header
        const chapTitleHTML = highlight(`Chapter ${chap.chapter_number}: ${chap.chapter_title}`, currentSearchTerm);
        let chapterHTML = `<div class="chapter-block" id="chap-${chap.chapter_number}"><h2 class="chap-heading">${chapTitleHTML}</h2>`;

        // Build Section Cards
        matchedSections.forEach(sec => {
            totalMatches++;
            const titleHTML = highlight(`Section ${sec.section_number}: ${sec.section_title}`, currentSearchTerm);
            const textHTML = highlight(sec.full_text, currentSearchTerm);
            const tagsHTML = sec.tags ? sec.tags.map(t => `<span class="tag">#${t}</span>`).join('') : '';

            chapterHTML += `
                <div class="law-card" id="section-card-${sec.id}">
                    <div class="section-header">
                        <span class="section-title">${titleHTML}</span>
                    </div>
                    <div class="verbatim-text" id="raw-${sec.id}">${textHTML}</div>
                    <div class="card-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;
        });

        chapterHTML += `</div>`;
        mainHTML += chapterHTML;
    });

    // Write all elements to DOM in one single paint operation
    container.innerHTML = mainHTML || `<div style="text-align: center; padding: 40px; color: var(--text-muted);">No matching sections found. Please clear your search criteria.</div>`;

    // Update Access Status Bar
    status.innerText = `DATABASE ACCESS: Found ${totalMatches} constitutional matches in repository`;
}

// 4. Setup Event Listeners
function setupListeners() {
    // Real-time Text Search Input
    document.getElementById('mainSearch').addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        renderConstitution();
    });

    // Chapter Dropdown Filter
    document.getElementById('chapterFilter').addEventListener('change', (e) => {
        selectedChapter = e.target.value;
        renderConstitution();
    });

    // Tag Dropdown Filter
    document.getElementById('tagFilter').addEventListener('change', (e) => {
        selectedTag = e.target.value;
        renderConstitution();
    });

    // Sidebar Smooth Scrolling & Active States
    document.getElementById('toc-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('toc-link')) {
            e.preventDefault();

            // Remove active state from other links
            document.querySelectorAll('.toc-link').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');

            // Scroll to Chapter
            const targetId = e.target.getAttribute('href');
            const element = document.querySelector(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}