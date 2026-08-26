// --- 1. Global State & Route Data ---
let appState = {};
let timeElapsed = 0;
let currentConfig = [];
let currentRouteTitle = "";

// --- 2. Timer Logic ---
const timerDisplay = document.getElementById('timer');
setInterval(() => {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
    const seconds = (timeElapsed % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}, 1000);

// --- 3. Route Selection Logic ---
// This waits for you to pick a route on the first slide before building the app
document.querySelectorAll('.route-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const routeKey = e.target.getAttribute('data-route');

        // Grab the specific title and pages array for the chosen route from config.js
        currentRouteTitle = allConfigs[routeKey].routeTitle;
        currentConfig = allConfigs[routeKey].pages;

        // Initialize state for ONLY this specific route
        currentConfig.forEach(page => {
            page.fields.forEach(field => {
                if (field.type === 'toggle') {
                    appState[field.id] = true;
                } else if (field.type === 'multiselect') {
                    appState[field.id] = []; // Multi-selects start as an empty list
                } else if (field.type == 'number') {
                    appState[field.id] = 0;
                } else {
                    appState[field.id] = '';
                }
            });
        });

        // Build the HTML and move to the first page
        renderPages();
        swiper.update();
        swiper.slideNext();

        // Lock the menu so it can't be clicked twice
        e.target.parentElement.innerHTML = '<h2>✅ Route Loaded</h2><p>Swipe right to begin your tour.</p>';
    });
});

// --- 4. Dynamic Slide Generation ---
function renderPages() {
    const finalSlide = document.getElementById('final-slide');

    // Changed from pagesConfig to currentConfig
    currentConfig.forEach((page) => {
        let html = `
      <div class="swiper-slide">
        <div class="card">
          <h2>${page.title}</h2>
    `;

        page.fields.forEach((field) => {
            // Determine if this field should be hidden on initial load
            let isHidden = false;

            // Check for hallway toggles
            if (field.showIfFalse && appState[field.showIfFalse] === true) {
                isHidden = true;
            }

            // Check for zero counts
            if (field.hideIfZero && (appState[field.hideIfZero] == 0 || appState[field.hideIfZero] === '')) {
                isHidden = true;
            }

            let displayStyle = isHidden ? 'style="display: none;"' : '';

            html += `<div class="input-group" id="container-${field.id}" ${displayStyle}>`;

            if (field.type === 'number') {
                // If the starting value is 0, keep the value empty so the placeholder shows
                const startValue = appState[field.id] === 0 ? '' : appState[field.id];

                html += `
        <label class="field-label">${field.label}</label>
        <input type="number" 
               inputmode="numeric" 
               id="${field.id}" 
               placeholder="0" 
               value="${startValue}" 
               min="0" 
               onkeydown="return ['e', 'E', '+', '-', '.'].includes(event.key) ? false : true">
    `;

            } else if (field.type === 'textarea') {
                html += `
            <label class="field-label">${field.label}</label>
            <textarea id="${field.id}" rows="3" placeholder="Type here..."></textarea>
        `;
            } else if (field.type === 'multiselect') {
                html += `<div class="multiselect-container">`;

                if (field.options) {
                    field.options.forEach((option) => {
                        html += `
                <label class="multi-option">
                  <!-- Using data-group to link it to the field ID -->
                  <input type="checkbox" class="multi-updater" data-group="${field.id}" value="${option}">
                  <span>${option}</span>
                </label>
              `;
                    });
                }

                html += `</div>`;

            } else if (field.type === 'toggle') {
                const isChecked = appState[field.id];

                // Retained your specific logic for Hallway vs Locked/Unlocked
                if (field.label === "Hallway") {
                    html += `
          <label class="field-label">${field.label}</label>
          <div class="switch-container">
            <label class="switch">
              <input type="checkbox" class="state-updater" id="${field.id}" ${isChecked ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span class="status-text" id="label-${field.id}">${isChecked ? 'CLEAR' : 'NOT CLEAR'}</span>
          </div>
        `;
                } else {
                    html += `
          <label class="field-label">${field.label}</label>
          <div class="switch-container">
            <label class="switch">
              <input type="checkbox" class="state-updater" id="${field.id}" ${isChecked ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span class="status-text" id="label-${field.id}">${isChecked ? 'LOCKED' : 'UNLOCKED'}</span>
          </div>
        `;
                }
            }

            html += `</div>`;
        });

        html += `</div></div>`;
        finalSlide.insertAdjacentHTML('beforebegin', html);
    });
}

// --- 5. Initialize Swiper.js ---
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    grabCursor: true,
    keyboard: { enabled: true },
    mousewheel: { forceToAxis: true },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    observer: true,
    observeParents: true,
});

// --- 6. Data Binding & Visibility Toggling ---
document.addEventListener('change', (e) => {
    const target = e.target;

    // Handle Multi-Select clicks
    if (target.classList.contains('multi-updater')) {
        const groupId = target.getAttribute('data-group');
        const value = target.value;

        if (target.checked) {
            appState[groupId].push(value); // Add to list
        } else {
            appState[groupId] = appState[groupId].filter(item => item !== value); // Remove from list
        }
        return; // Exit early
    }

    // Handle everything else (Toggles, Text, Numbers)
    const id = target.id;
    if (appState.hasOwnProperty(id)) {
        if (target.type === 'checkbox' && !target.classList.contains('multi-updater')) {
            const isChecked = target.checked;
            appState[id] = isChecked;

            // 1. Find the specific field in your config using the ID
            let currentField = null;
            currentConfig.forEach(page => {
                let found = page.fields.find(f => f.id === id);
                if (found) currentField = found;
            });

            // 2. Change the text based on what the label is
            if (currentField && currentField.label === "Hallway") {
                document.getElementById(`label-${id}`).textContent = isChecked ? 'CLEAR' : 'NOT CLEAR';
            } else {
                document.getElementById(`label-${id}`).textContent = isChecked ? 'LOCKED' : 'UNLOCKED';
            }

            // Visibility Logic
            currentConfig.forEach(page => {
                page.fields.forEach(field => {
                    if (field.showIfFalse === id) {
                        const container = document.getElementById(`container-${field.id}`);
                        if (isChecked) {
                            container.style.display = 'none';
                            appState[field.id] = field.type === 'multiselect' ? [] : (field.type === 'number' ? 0 : '');
                        } else {
                            container.style.display = 'block';
                        }
                    }
                });
            });
        } else {
            appState[id] = target.value;
        }
    }
});

// Catch text typing which doesn't trigger 'change' until you click away
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (!e.target.classList.contains('multi-updater') && e.target.type !== 'checkbox') {
            const id = e.target.id;
            if (appState.hasOwnProperty(id)) {

                // Treat a completely cleared-out number box as a 0 in the background
                if (e.target.type === 'number' && e.target.value === '') {
                    appState[id] = 0;
                } else {
                    appState[id] = e.target.value;
                }

                // Visibility logic for hideIfZero
                currentConfig.forEach(page => {
                    page.fields.forEach(field => {
                        if (field.hideIfZero === id) {
                            const container = document.getElementById(`container-${field.id}`);
                            const val = e.target.value;

                            // Hide if the value is 0 or empty
                            if (val == 0 || val === '') {
                                container.style.display = 'none';
                                appState[field.id] = field.type === 'multiselect' ? [] : (field.type === 'number' ? 0 : '');

                                // Uncheck the boxes visually if it's a multiselect
                                if (field.type === 'multiselect') {
                                    container.querySelectorAll('.multi-updater').forEach(cb => cb.checked = false);
                                }
                            } else {
                                // Show it if the value is greater than 0
                                container.style.display = 'block';
                            }
                        }
                    });
                });
            }
        }
    }
});

// --- 7. Generate & Copy Report ---
document.getElementById('end-btn').addEventListener('click', () => {
    const reportOutput = document.getElementById('report-output');

    let reportString = `🦔 COVERAGE NOTES REPORT 🌲\n`;
    reportString += `Route: ${currentRouteTitle}\n`;
    reportString += `Total Session Time: ${timerDisplay.textContent}\n`;
    reportString += `============================\n\n`;

    currentConfig.forEach((page) => {
        reportString += `--- ${page.title} ---\n`;
        page.fields.forEach((field) => {

            // Skip hidden elements from showing up in the report
            if (field.showIfFalse && appState[field.showIfFalse] === true) {
                return;
            }
            if (field.hideIfZero && (appState[field.hideIfZero] == 0 || appState[field.hideIfZero] === '')) {
                return;
            }

            let value = appState[field.id];

            if (field.type === 'toggle') {
                if (field.label === 'Hallway') {
                    value = value ? 'CLEAR' : 'NOT CLEAR';
                } else {
                    value = value ? 'LOCKED' : 'UNLOCKED';
                }
            } else if (field.type === 'multiselect') {
                if (value.length > 0) {
                    value = value.join(', ');
                } else {
                    return; // Retained your custom skip if empty
                }
            } else if (value === '') {
                value = 'N/A';
            }

            // Retained your custom formatting for multiselects vs normal fields
            if (field.type == 'multiselect') {
                reportString += `${value}\n`;
            } else {
                reportString += `${field.label}: ${value}\n`;
            }
        });
        reportString += `\n`;
    });

    reportOutput.style.display = 'block';
    reportOutput.textContent = reportString;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(reportString).then(() => {
            alert("✅ Report successfully copied to clipboard!");
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert("Report generated, but clipboard copy failed.");
        });
    } else {
        alert("Report generated! Please select the text box and copy it manually.");
    }
});

// --- 8. Auto-Scroll to Top on Enter ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // If the user is typing in a number input, remove focus to close the mobile keyboard
        if (e.target.tagName === 'INPUT') {
            e.target.blur();
        }

        // Find the currently active slide and smoothly scroll it to the top
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            activeSlide.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});
