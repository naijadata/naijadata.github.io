let filteredData = [...mineralsData];
let currentPage = 1;
const itemsPerPage = 8;

// Mineral Scientific Education Profile Map
const educationalProfiles = {
    "Au": {
        color: "#e5a900",
        definition: "A highly sought-after precious metal, Gold occurs in hydrothermal quartz veins and alluvial placer deposits within the Nigerian schist belts.",
        facts: [
            "Occurs naturally as native gold nuggets or fine flakes.",
            "Extremely ductile and resistant to oxidation or tarnishing.",
            "Gold exploration in Nigeria has historically focused on the western half of the country's basement complex."
        ],
        uses: "Predominantly utilized in national currency reserves, fine jewelry crafting, precision electronics manufacture, and dental restorations."
    },
    "Ls": {
        color: "#94a3b8",
        definition: "A sedimentary rock composed largely of calcium carbonate (CaCO3). Nigeria is endowed with massive cretaceous and tertiary limestone bands.",
        facts: [
            "Forms from the accumulation of shell, coral, algal, and fecal debris.",
            "Easily reacts with dilute acids due to high calcium concentrations.",
            "The bedrock behind multi-billion-dollar local manufacturing giants."
        ],
        uses: "The vital raw material in Portland cement production, structural building stone, agricultural soil conditioners, and chemical manufacturing."
    },
    "Gy": {
        color: "#38bdf8",
        definition: "A hydrated calcium sulfate mineral (CaSO4·2H2O). Highly soluble and heavily mined from Cretaceous sedimentary basins in Nigeria.",
        facts: [
            "Often found as transparent tabular crystals called selenite.",
            "Loses water of crystallization when heated, changing structure.",
            "Essential for controlling the setting time of manufactured cement."
        ],
        uses: "Widely used in plasterboard fabrication, Portland cement manufacturing, agricultural soil amendment, and sculpture casts."
    },
    "Cl": {
        color: "#b45309",
        definition: "A natural earthy fine-grained raw material. Abundant across all geological zones of Nigeria as ball clay, fireclay, or kaolin.",
        facts: [
            "Develops plasticity when wet, retaining shape when baked.",
            "Rich in hydrous aluminum phyllosilicates.",
            "Locally processed for millennia to fabricate historical pottery and construction bricks."
        ],
        uses: "Essential for manufacturing bricks, structural ceramics, porcelain ware, paper fillers, cosmetics, and pottery."
    },
    "Cy": { color: "#b45309", definition: "A generic classification for clay minerals.", facts: ["Varying aluminum silicate ratios.", "Plastifying behaviors."], uses: "Traditional pottery, brick laying, and building plaster." },
    "ka": { color: "#cbd5e1", definition: "A soft, fine white clay mineral (Kaolinite), heavily mined across Kankara (Katsina) and other zones.", facts: ["Highly chemically inert.", "Maintains excellent heat resistance qualities."], uses: "Paper coating, porcelain tableware, cosmetics, and pharmaceutical binders." },
    "Ka": { color: "#cbd5e1", definition: "A soft, fine white clay mineral (Kaolinite), heavily mined across Kankara (Katsina) and other zones.", facts: ["Highly chemically inert.", "Maintains excellent heat resistance qualities."], uses: "Paper coating, porcelain tableware, cosmetics, and pharmaceutical binders." },
    "Mb": {
        color: "#e2e8f0",
        definition: "A metamorphic rock formed when limestone is subjected to intense heat and structural pressures. Exceptional high-purity deposits are found in Jakura and Igbetti.",
        facts: [
            "Characterized by tight interlocking calcite crystal structures.",
            "Highly polishable to a glass-like sheen.",
            "Features characteristic mineral swirls and veins."
        ],
        uses: "Extensively specified for high-end flooring, sculptural architectural elements, and pulverized calcium carbonate fillers."
    },
    "Ba": {
        color: "#10b981",
        definition: "A barium sulfate mineral (BaSO4) occurring in vein deposits. Highly dense and strategically critical for the hydrocarbon extraction process.",
        facts: [
            "Exhibits a unusually high specific density for a non-metallic mineral.",
            "Almost completely insoluble in water or acid.",
            "Crucial component for controlling downhole pressures in active wells."
        ],
        uses: "Primarily used as a weighting agent in crude oil and natural gas drilling muds, paint formulation, and healthcare imaging contrasts."
    },
    "Tc": {
        color: "#cbd5e1",
        definition: "The world's softest known mineral, consisting of hydrated magnesium silicate. Large, high-grade talc fields occur within Nigeria's central schist belts.",
        facts: [
            "Possesses a distinctively greasy or soapy tactile feel.",
            "Highly resistant to electricity, extreme heat, and acid damage.",
            "Forms by alteration of metamorphic rocks under hydrous conditions."
        ],
        uses: "Widely used as an anti-caking agent, talcum powder base, industrial lubricant, ceramic clay bodies, and paint formulation fillers."
    },
    "P": {
        color: "#ef4444",
        definition: "A generic geological term indicating phosphate ore, vital for agricultural fertilizers.",
        facts: ["Found in localized nodules.", "Critical component of the phosphorus element cycle."],
        uses: "Production of chemical agricultural fertilizers, animal feed supplements, and specialty matches."
    },
    "Nb": {
        color: "#475569",
        definition: "Niobium (Columbite), historically mined alongside tin in Jos younger granites.",
        facts: ["Commonly found closely associated with Tantalite.", "Enhances steel strength even in microscopic amounts."],
        uses: "Vital in specialty superalloys for jet engines, rocket nozzles, and high-strength construction steels."
    },
    "Sn": {
        color: "#94a3b8",
        definition: "Tin ore (principally cassiterite), which drove the historical mining boom of the Jos Plateau.",
        facts: ["Forms deep within younger granitic pegmatites.", "Mined extensively as alluvial ore from ancient river beds."],
        uses: "Corrosion-resistant steel plating, electronic solders, bronze alloy production, and chemical stabilizers."
    },
    "Ta": {
        color: "#334155",
        definition: "Tantalite ore, a strategic mineral used globally for high-technology componentry.",
        facts: ["Invaluable thermal and electrical conductivity values.", "Extracted from highly pegmatitic geological terrains."],
        uses: "Primary component for microscopic capacitors in modern smartphones, computers, and medical implants."
    },
    "Pb. Zn": {
        color: "#64748b",
        definition: "Lead-Zinc sulfide ores, occurring in localized hydrothermal vein arrays.",
        facts: ["Mined as primary galena and sphalerite ores.", "Typically occurs along the extensive Benue Trough fault line."],
        uses: "Lead-acid vehicle batteries, rustproofing galvanization coatings, and ammunition manufacturing."
    },
    "Pb Zn": {
        color: "#64748b",
        definition: "Lead-Zinc sulfide ores, occurring in localized hydrothermal vein arrays.",
        facts: ["Mined as primary galena and sphalerite ores.", "Typically occurs along the extensive Benue Trough fault line."],
        uses: "Lead-acid vehicle batteries, rustproofing galvanization coatings, and ammunition manufacturing."
    },
    "Pbs": {
        color: "#1e293b",
        definition: "Galena (Lead Sulfide), the principal mineral source of metallic lead.",
        facts: ["Features a striking metallic luster and cubic crystals.", "Very heavy due to concentrated lead molecules."],
        uses: "Primary lead smelting, battery plates, radiation shielding, and historical ceramic glazes."
    },
    "EmI": {
        color: "#10b981",
        definition: "An elite variety of the beryl crystal family, colored deep green by trace chromium or vanadium.",
        facts: ["One of the most valuable gemstones in commercial circulation.", "Gem-quality emeralds occur in complex granitic pegmatites."],
        uses: "High-jewelry cutting and display, and specialized scientific laser applications."
    },
    "Fr": {
        color: "#6366f1",
        definition: "Fluorite (Calcium Fluoride), occurring as an industrial vein mineral.",
        facts: ["Fluoresces beautifully under ultraviolet radiation waves.", "Occurs in a rainbow of vivid hues from violet to green."],
        uses: "Flux agent in steel smelting, high-clarity optical lenses, and fluorine chemical synthesis."
    },
    "Br": {
        color: "#b45309",
        definition: "Subterranean salt-brine resources, historically boiled off in local salt industries.",
        facts: ["Highly concentrated mineral spring waters.", "Prevalent in low plains near major tectonic fault systems."],
        uses: "Raw table salt manufacturing, basic chemical preservation, and local tanning industries."
    },
    "C Br": {
        color: "#1e293b",
        definition: "A composite occurrence of coal seams and concentrated salt brine.",
        facts: ["Reveals deep historical swamp basins that have salt-crusted over epochs."],
        uses: "Dual fuel and saline extraction processing."
    }
};

// Default profile for missing/miscellaneous minerals
const fallbackProfile = {
    color: "#008751",
    definition: "An industrial mineral found within the geological formations of Nigeria.",
    facts: [
        "Contributes to the diverse solid mineral profile of the region.",
        "Formed under localized metamorphic or sedimentary environments."
    ],
    uses: "Used across local manufacturing, construction, and structural value chains."
};

// Run on window boot
window.onload = function() {
    populateFilters();
    handleSearch();
};

// Create dropdown lists based on actual JSON data
function populateFilters() {
    const states = new Set();
    const mineralNames = new Set();

    mineralsData.forEach(item => {
        if (item.state) states.add(item.state);
        if (item.mineral_names) {
            item.mineral_names.forEach(mName => mineralNames.add(mName));
        }
    });

    const stateSelect = document.getElementById("stateFilter");
    const minSelect = document.getElementById("mineralFilter");

    // Populate States
    Array.from(states).sort().forEach(state => {
        const opt = document.createElement("option");
        opt.value = state;
        opt.innerText = state;
        stateSelect.appendChild(opt);
    });

    // Populate Minerals
    Array.from(mineralNames).sort().forEach(mName => {
        const opt = document.createElement("option");
        opt.value = mName;
        opt.innerText = mName;
        minSelect.appendChild(opt);
    });
}

// Search, Sort, and Filter Logic
function handleSearch() {
    const keyword = document.getElementById("keywordSearch").value.toLowerCase();
    const stateVal = document.getElementById("stateFilter").value;
    const minVal = document.getElementById("mineralFilter").value;
    const zoneVal = document.getElementById("zoneFilter").value;

    filteredData = mineralsData.filter(item => {
        // 1. Text filter
        const matchesKeyword = (
            item.name.toLowerCase().includes(keyword) ||
            item.lga.toLowerCase().includes(keyword) ||
            item.state.toLowerCase().includes(keyword) ||
            item.mineral_names.some(n => n.toLowerCase().includes(keyword))
        );

        // 2. Strict dropdown filters
        const matchesState = !stateVal || item.state === stateVal;
        const matchesMineral = !minVal || item.mineral_names.includes(minVal);
        const matchesZone = !zoneVal || item.zone === zoneVal;

        return matchesKeyword && matchesState && matchesMineral && matchesZone;
    });

    // Sort alphabetically by town name
    filteredData.sort((a, b) => a.name.localeCompare(b.name));

    currentPage = 1;
    renderGrid();
    updateMeta(keyword || stateVal || minVal || zoneVal);
}

// Clear Search
function clearFilters() {
    document.getElementById("keywordSearch").value = "";
    document.getElementById("stateFilter").value = "";
    document.getElementById("mineralFilter").value = "";
    document.getElementById("zoneFilter").value = "";
    handleSearch();
}

// Update search count and visibility of "Clear" button
function updateMeta(isActiveFilter) {
    const countLabel = document.getElementById("resultsCount");
    const clearBtn = document.getElementById("clearFiltersBtn");

    countLabel.innerText = `Showing ${filteredData.length} mineral deposits found.`;
    clearBtn.style.display = isActiveFilter ? "inline-block" : "none";
}

// Render Results Grid
function renderGrid() {
    const grid = document.getElementById("mineralGrid");
    grid.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredData.slice(start, end);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: white; border-radius:12px; border:1px solid #ddd;">
        <p style="font-size: 1.2rem; color: #555;">No mineral occurrences found matching your current parameters.</p>
        <button class="clear-btn" onclick="clearFilters()" style="margin-top: 1rem;">Reset Search Criteria</button>
      </div>
    `;
        document.getElementById("pagination").innerHTML = "";
        return;
    }

    paginatedItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "mineral-card";
        card.onclick = () => openDetails(item);

        // Build abbreviation badges
        let tagHtml = "";
        item.minerals.forEach(sym => {
            tagHtml += `<span class="symbol-tag">${sym}</span>`;
        });

        card.innerHTML = `
      <div class="card-top">
        <div class="mineral-tag-row">
          ${tagHtml}
          <span class="zone-tag">Zone ${item.zone}</span>
        </div>
        <h3>${item.name}</h3>
        <div class="mineral-location-line">
          <span>LGA: <strong>${item.lga}</strong></span>
          <span>State: <strong>${item.state}</strong></span>
        </div>
      </div>
      <div class="card-bottom-meta">
        Occurrences: ${item.mineral_names.join(", ")}
      </div>
    `;
        grid.appendChild(card);
    });

    renderPagination();
}

// Render Pagination Buttons
function renderPagination() {
    const nav = document.getElementById("pagination");
    nav.innerHTML = "";
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (totalPages <= 1) return;

    const range = 2; // Number of pages to show on either side of the active page
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
        // Keep first, last, and active page + adjacent pages
        if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
            pages.push(i);
        } else if (pages[pages.length - 1] !== "...") {
            pages.push("...");
        }
    }

    pages.forEach(p => {
        if (p === "...") {
            const span = document.createElement("span");
            span.innerText = "...";
            span.style.padding = "0.6rem 0.8rem";
            span.style.color = "var(--text-muted)";
            span.style.fontWeight = "600";
            nav.appendChild(span);
        } else {
            const btn = document.createElement("button");
            btn.innerText = p;
            btn.className = `page-btn ${p === currentPage ? "active" : ""}`;
            btn.onclick = () => {
                currentPage = p;
                renderGrid();
                window.scrollTo({ top: 400, behavior: 'smooth' });
            };
            nav.appendChild(btn);
        }
    });
}

// Generate an SVG illustrative icon based on the mineral type/color
function generateCrystalSVG(colorHex) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 130px; height: 130px;">
      <!-- Faceted Crystal Base -->
      <polygon points="50,10 75,35 50,60 25,35" fill="${colorHex}" stroke="#222" stroke-width="2" stroke-linejoin="round" />
      <!-- Lower Facet -->
      <polygon points="50,60 75,35 50,90" fill="${colorHex}" opacity="0.8" stroke="#222" stroke-width="2" stroke-linejoin="round" />
      <polygon points="50,60 25,35 50,90" fill="${colorHex}" opacity="0.6" stroke="#222" stroke-width="2" stroke-linejoin="round" />
      <!-- Facet Highlights -->
      <polygon points="50,10 50,60 75,35" fill="white" opacity="0.15" />
      <polygon points="50,10 50,60 25,35" fill="black" opacity="0.1" />
      <!-- Sparkle -->
      <circle cx="68" cy="22" r="3" fill="white" />
    </svg>
  `;
}

// Load Details into Modal and Display
function openDetails(item) {
    const primarySymbol = item.minerals[0];
    const profile = educationalProfiles[primarySymbol] || fallbackProfile;

    // Set visual columns
    document.getElementById("modalMineralGraphic").innerHTML = generateCrystalSVG(profile.color);
    document.getElementById("modalStateBadge").innerText = `${item.state} State`;
    document.getElementById("modalLgaBadge").innerText = `${item.lga} LGA`;
    document.getElementById("modalZoneBadge").innerText = `Zone ${item.zone}`;

    // Set Info Column
    document.getElementById("modalTitle").innerText = item.mineral_names.join(" & ");
    document.getElementById("modalSymbol").innerText = item.minerals.join(" / ");
    document.getElementById("modalTown").innerText = `Deposits discovered at ${item.name}`;

    document.getElementById("modalDescription").innerText = profile.definition;
    document.getElementById("modalUses").innerText = profile.uses;

    // Set Key Facts List
    const factsList = document.getElementById("modalFacts");
    factsList.innerHTML = "";
    profile.facts.forEach(fact => {
        const li = document.createElement("li");
        li.innerText = fact;
        factsList.appendChild(li);
    });

    toggleModal(true);
}

// Show/Hide Modal overlay
function toggleModal(show) {
    const overlay = document.getElementById("mineralModal");
    if (show) {
        overlay.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent page scroll behind modal
    } else {
        overlay.classList.remove("open");
        document.body.style.overflow = "auto";
    }
}

// Close Modal when background overlay is clicked
function closeModal(e) {
    if (e.target.id === "mineralModal") {
        toggleModal(false);
    }
}

// Close on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        toggleModal(false);
    }
});