// SQL Reference Guide - Main Application Logic

let currentCategoryFilter = "All";
let searchQuery = "";
let db = null; // SQLite Instance via sql.js
let activeTabs = {}; // Stores selected example tab index per topic card (default 0)
let favorites = JSON.parse(localStorage.getItem('sql_ref_favs') || '[]');
let isStackedView = false;

// Initialize App on DOM Loaded
document.addEventListener('DOMContentLoaded', async () => {
  initStats();
  renderCategoryPills();
  renderTopics();
  setupEventListeners();
  initSQLite();
});

// Calculate metrics
function initStats() {
  const totalTopics = sqlData.length;
  let totalExamples = 0;
  const categoriesSet = new Set();

  sqlData.forEach(item => {
    totalExamples += item.examples.length;
    categoriesSet.add(item.category);
  });

  document.getElementById('stat-topics').textContent = totalTopics;
  document.getElementById('stat-examples').textContent = totalExamples;
  document.getElementById('stat-categories').textContent = categoriesSet.size;
}

// Render Navigation Filter Pills
function renderCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;

  const categories = ["All", ...new Set(sqlData.map(item => item.category))];
  
  container.innerHTML = categories.map(cat => `
    <button 
      class="cat-pill px-4 py-2 rounded-full text-xs font-medium border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-sky-400 hover:border-sky-500 whitespace-nowrap ${cat === currentCategoryFilter ? 'active' : ''}"
      onclick="setCategoryFilter('${cat.replace(/'/g, "\\'")}')"
    >
      ${cat}
    </button>
  `).join('');
}

// Category filter setter
function setCategoryFilter(cat) {
  currentCategoryFilter = cat;
  renderCategoryPills();
  renderTopics();
}

// Render Topics list based on search and category filters
function renderTopics() {
  const container = document.getElementById('topics-container');
  const noResults = document.getElementById('no-results');
  if (!container) return;

  let filtered = sqlData.filter(item => {
    const matchesCat = currentCategoryFilter === "All" || item.category === currentCategoryFilter;
    
    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const matchesTitle = item.title.toLowerCase().includes(q);
    const matchesDesc = item.description.toLowerCase().includes(q);
    const matchesCategory = item.category.toLowerCase().includes(q);
    const matchesSession = item.session.toLowerCase().includes(q);
    const matchesSql = item.examples.some(ex => ex.sql.toLowerCase().includes(q));

    return matchesTitle || matchesDesc || matchesCategory || matchesSession || matchesSql;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
  }

  container.innerHTML = filtered.map(item => createTopicCardMarkup(item)).join('');
  
  // Re-highlight syntax using Prism
  if (window.Prism) {
    Prism.highlightAll();
  }
}

// Generate HTML markup for individual topic card
function createTopicCardMarkup(item) {
  const isFav = favorites.includes(item.id);
  const activeIndex = activeTabs[item.id] !== undefined ? activeTabs[item.id] : 0;

  return `
    <div id="${item.id}" class="topic-card bg-slate-900/90 border border-slate-800 rounded-xl p-5 md:p-6 mb-8 scroll-mt-28">
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md">
            ${item.session}
          </span>
          <span class="text-xs font-medium text-slate-400">
            ${item.category}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button 
            onclick="toggleFavorite('${item.id}')"
            class="p-2 rounded-lg border border-slate-800 hover:border-amber-500/50 bg-slate-800/50 text-slate-400 hover:text-amber-400 transition"
            title="${isFav ? 'Remove Bookmark' : 'Bookmark Topic'}"
          >
            <i class="${isFav ? 'fas text-amber-400' : 'far'} fa-star"></i>
          </button>
          <a href="#${item.id}" class="p-2 rounded-lg border border-slate-800 hover:border-sky-500/50 bg-slate-800/50 text-slate-400 hover:text-sky-400 transition" title="Direct Link">
            <i class="fas fa-link text-xs"></i>
          </a>
        </div>
      </div>

      <!-- Title & Description -->
      <h3 class="text-xl md:text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
        ${item.title}
      </h3>
      <p class="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
        ${item.description}
      </p>

      <!-- Tab Buttons for 3 Examples -->
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 mb-5 pb-1">
        <div class="flex items-center gap-1 md:gap-2">
          ${item.examples.map((ex, idx) => `
            <button 
              onclick="switchExampleTab('${item.id}', ${idx})"
              class="ex-tab px-3 py-2 text-xs md:text-sm font-medium transition ${!isStackedView && activeIndex === idx ? 'active' : 'text-slate-400 hover:text-slate-200'}"
            >
              ${ex.type.split(':')[0]}
            </button>
          `).join('')}
        </div>
        <div class="text-xs text-slate-400 hidden sm:block">
          <i class="fas fa-layer-group mr-1 text-sky-400"></i> 3 Distinct Scenarios Included
        </div>
      </div>

      <!-- Examples Body -->
      <div class="examples-wrapper space-y-6">
        ${isStackedView ? 
          item.examples.map((ex, idx) => renderExampleBlock(item, ex, idx)).join('<hr class="border-slate-800/60 my-4" />')
          : renderExampleBlock(item, item.examples[activeIndex], activeIndex)
        }
      </div>
    </div>
  `;
}

// Render an individual example block (SQL + Result Table)
function renderExampleBlock(item, ex, idx) {
  const escapedSql = ex.sql.replace(/'/g, "\\'").replace(/\n/g, "\\n");
  
  return `
    <div class="example-block space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-semibold text-sky-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-sky-400"></span>
          ${ex.type}
        </h4>
        <div class="flex items-center gap-2">
          <button 
            onclick="sendToSandbox('${escapedSql}')"
            class="px-2.5 py-1 text-xs font-mono font-medium rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition flex items-center gap-1"
            title="Run query live in Sandbox"
          >
            <i class="fas fa-play text-[10px]"></i> Run Live
          </button>
          <button 
            onclick="copyCode('${escapedSql}')"
            class="px-2.5 py-1 text-xs font-mono font-medium rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition flex items-center gap-1"
          >
            <i class="far fa-copy text-[10px]"></i> Copy
          </button>
        </div>
      </div>

      <!-- SQL Code Box -->
      <div class="relative group">
        <pre><code class="language-sql">${escapeHtml(ex.sql)}</code></pre>
      </div>

      <!-- Visual Output Table -->
      <div class="output-box space-y-1">
        <div class="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <i class="fas fa-table text-sky-400"></i> Expected Query Execution Result:
        </div>
        <div class="output-table-container">
          <table class="output-table">
            <thead>
              <tr>
                ${ex.columns.map(col => `<th>${escapeHtml(col)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${ex.rows.length > 0 ? ex.rows.map(row => `
                <tr>
                  ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="${ex.columns.length}" class="text-center italic text-slate-400 py-3">0 rows returned (Empty result set)</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      ${ex.notes ? `
        <div class="text-xs text-slate-400 bg-slate-800/40 border-l-2 border-sky-400 px-3 py-2 rounded-r">
          <span class="font-semibold text-slate-300">Explanation:</span> ${ex.notes}
        </div>
      ` : ''}
    </div>
  `;
}

// Switch example tab index
function switchExampleTab(topicId, index) {
  activeTabs[topicId] = index;
  renderTopics();
}

// Toggle Bookmark
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('sql_ref_favs', JSON.stringify(favorites));
  renderTopics();
}

// Copy Code Helper
function copyCode(sqlText) {
  const decoded = sqlText.replace(/\\n/g, '\n').replace(/\\'/g, "'");
  navigator.clipboard.writeText(decoded).then(() => {
    showToast("SQL code copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy code.", true);
  });
}

// Toast notification
function showToast(message, isError = false) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold text-white transition-all transform duration-300 translate-y-10 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.className = `fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold text-white transition-all transform duration-300 translate-y-0 opacity-100 ${isError ? 'bg-rose-600' : 'bg-sky-600'}`;
  toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i> ${message}`;

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 2500);
}

// Escape HTML utility
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Setup Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderTopics();
    });
  }

  const toggleViewBtn = document.getElementById('toggle-view-btn');
  if (toggleViewBtn) {
    toggleViewBtn.addEventListener('click', () => {
      isStackedView = !isStackedView;
      toggleViewBtn.innerHTML = isStackedView ? 
        `<i class="fas fa-folder text-sky-400"></i> Tabbed View` : 
        `<i class="fas fa-stream text-sky-400"></i> Expand All Examples`;
      renderTopics();
    });
  }
}

// Initialize SQLite Engine in Browser
async function initSQLite() {
  try {
    if (!window.initSqlJs) return;
    const SQL = await window.initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });
    
    db = new SQL.Database();
    
    // Seed Sample Database Tables
    db.run(`
      CREATE TABLE employees (
        employee_id INT PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        dept_id INT,
        salary REAL,
        hire_date DATE
      );
      INSERT INTO employees VALUES 
        (101, 'Alice', 'Vance', 10, 8500.00, '2022-03-15'),
        (102, 'Bob', 'Smith', 20, 6200.00, '2023-01-10'),
        (103, 'Charlie', 'Brown', 10, 9400.00, '2021-06-01'),
        (104, 'David', 'Miller', 10, 7900.00, '2024-02-20'),
        (105, 'Elena', 'Rostova', 30, 6900.00, '2025-05-12');

      CREATE TABLE departments (
        dept_id INT PRIMARY KEY,
        dept_name TEXT,
        location TEXT
      );
      INSERT INTO departments VALUES
        (10, 'Engineering', 'New York'),
        (20, 'Marketing', 'San Francisco'),
        (30, 'Human Resources', 'Austin');

      CREATE TABLE orders (
        order_id INT PRIMARY KEY,
        customer_id INT,
        order_date DATE,
        total_amount REAL,
        status TEXT
      );
      INSERT INTO orders VALUES
        (1001, 501, '2026-01-14', 1250.00, 'COMPLETED'),
        (1002, 502, '2026-01-15', 340.50, 'SHIPPED'),
        (1003, 501, '2026-02-10', 890.00, 'COMPLETED'),
        (1004, 503, '2026-02-14', 120.00, 'CANCELLED');
    `);

    console.log("SQLite sandbox database successfully initialized!");
  } catch (err) {
    console.warn("Could not load SQL.js engine:", err);
  }
}

// Send SQL text directly to Sandbox Editor & Execute
function sendToSandbox(sqlText) {
  const decoded = sqlText.replace(/\\n/g, '\n').replace(/\\'/g, "'");
  const editor = document.getElementById('sandbox-editor');
  const modal = document.getElementById('sandbox-modal');
  
  if (editor) editor.value = decoded;
  if (modal) modal.classList.remove('hidden');
  
  runSandboxQuery();
}

// Run Sandbox SQL Query
function runSandboxQuery() {
  const editor = document.getElementById('sandbox-editor');
  const resultDiv = document.getElementById('sandbox-result');
  
  if (!editor || !resultDiv) return;

  const query = editor.value.trim();
  if (!query) {
    resultDiv.innerHTML = `<div class="text-slate-400 text-xs italic">Please enter a SQL query.</div>`;
    return;
  }

  if (!db) {
    resultDiv.innerHTML = `<div class="text-rose-400 text-xs">SQLite engine is loading... Please try again in a moment.</div>`;
    return;
  }

  try {
    const res = db.exec(query);
    if (res.length === 0) {
      resultDiv.innerHTML = `
        <div class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono">
          Query executed successfully. (No output rows returned or DDL/DML action completed).
        </div>
      `;
      return;
    }

    const { columns, values } = res[0];
    
    resultDiv.innerHTML = `
      <div class="output-table-container">
        <table class="output-table">
          <thead>
            <tr>${columns.map(col => `<th>${escapeHtml(col)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${values.map(row => `
              <tr>${row.map(cell => `<td>${cell === null ? '<em>NULL</em>' : escapeHtml(String(cell))}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="text-[11px] text-slate-400 font-mono mt-1">
        ${values.length} row(s) returned.
      </div>
    `;
  } catch (err) {
    resultDiv.innerHTML = `
      <div class="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400 text-xs font-mono">
        <strong>SQL Error:</strong> ${escapeHtml(err.message)}
      </div>
    `;
  }
}

// Open/Close Sandbox Modal
function toggleSandboxModal() {
  const modal = document.getElementById('sandbox-modal');
  if (modal) modal.classList.toggle('hidden');
}
