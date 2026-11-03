 let filteredData = [...milestones];
 let currentPage = 1;
 const itemsPerPage = 10;

 function renderResults() {
     const list = document.getElementById("milestoneList");
     const count = document.getElementById("resultsCount");
     list.innerHTML = "";

     const start = (currentPage - 1) * itemsPerPage;
     const end = start + itemsPerPage;
     const paginatedItems = filteredData.slice(start, end);

     count.innerText = `Showing ${filteredData.length} milestones found.`;

     if (paginatedItems.length === 0) {
         list.innerHTML =
             '<p style="text-align:center">No milestones found for this search.</p>';
     }

     paginatedItems.forEach((item) => {
         const card = document.createElement("div");
         card.className = "milestone-card";
         card.innerHTML = `
                <div class="milestone-date">${item.date}</div>
                <div class="milestone-text">${item.event}</div>
            `;
         list.appendChild(card);
     });

     renderPagination();
 }

 function renderPagination() {
     const nav = document.getElementById("pagination");
     nav.innerHTML = "";
     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

     if (totalPages <= 1) return;

     for (let i = 1; i <= totalPages; i++) {
         const btn = document.createElement("button");
         btn.innerText = i;
         btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
         btn.onclick = () => {
             currentPage = i;
             renderResults();
             window.scrollTo(0, 0);
         };
         nav.appendChild(btn);
     }
 }




 // 1. The main search logic
 function handleSearch() {
     const keyword = document.getElementById("keywordSearch").value.toLowerCase();
     const start = parseInt(document.getElementById("startYear").value) || 0;
     const end = parseInt(document.getElementById("endYear").value) || 3000;

     filteredData = milestones.filter((item) => {
         const matchesKeyword = item.event.toLowerCase().includes(keyword);
         const matchesYear = item.year >= start && item.year <= end;
         return matchesKeyword && matchesYear;
     });

     filteredData.sort((a, b) => a.year - b.year);

     currentPage = 1;
     renderResults();

     // Smooth scroll to results
     const resultsSection = document.getElementById("resultsCount");
     if (resultsSection) {
         resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
 }

 // 2. The Initial Render (Keep this!)
 window.onload = renderResults;