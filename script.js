// --- 1. Page Configuration ---
// const pagesConfig = [
//     {
//         title: "🍃 Hedden 5th floor",
//         fields: [
//             { id: "h5-hallway", type: "toggle", label: "Hallway", },
//             // This field will be hidden on load because defaults to true
//             { id: "h5-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h5-hallway" },
//             { id: "h5-north", type: "number", label: "North Common Room" },
//             { id: "h5-south", type: "number", label: "South Common Room" },
//             { id: "h5-notes", type: "textarea", label: "General Notes" }
//         ]
//     },
//     {
//         title: "🍃 Hedden 4th floor",
//         fields: [
//             { id: "h4-hallway", type: "toggle", label: "Hallway", },
//             // This field will be hidden on load because defaults to true
//             { id: "h4-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h4-hallway" },
//             { id: "h4-north", type: "number", label: "North Common Room" },
//             { id: "h4-south", type: "number", label: "South Common Room" },
//             { id: "h4-notes", type: "textarea", label: "General Notes" }
//         ]
//     },
//     {
//         title: "🍃 Hedden 3rd floor",
//         fields: [
//             { id: "h3-hallway", type: "toggle", label: "Hallway", },
//             // This field will be hidden on load because defaults to true
//             { id: "h3-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h3-hallway" },
//             { id: "h3-north", type: "number", label: "North Common Room" },
//             { id: "h3-south", type: "number", label: "South Common Room" },
//             { id: "h3-notes", type: "textarea", label: "General Notes" }
//         ]
//     },
//     {
//         title: "🍃 Hedden 2nd floor",
//         fields: [
//             { id: "h2-hallway", type: "toggle", label: "Hallway", },
//             // This field will be hidden on load because defaults to true
//             { id: "h2-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h2-hallway" },
//             { id: "h2-north", type: "number", label: "North Common Room" },
//             { id: "h2-south", type: "number", label: "South Common Room" },
//             { id: "h2-notes", type: "textarea", label: "General Notes" }
//         ]
//     },
//     {
//         title: "🍃 Hedden 1st floor",
//         fields: [
//             { id: "h1-hallway", type: "toggle", label: "Hallway", },
//             // This field will be hidden on load because defaults to true
//             { id: "h1-hallway-count", type: "number", label: "Number of people in hallway", showIfFalse: "h4-hallway" },
//             { id: "h1-north", type: "number", label: "North Common Room" },
//             { id: "h1-south", type: "number", label: "South Common Room" },
//             { id: "h1-notes", type: "textarea", label: "General Notes" }
//         ]
//     },
//     {
//         title: "🌲 Additional Metrics",
//         fields: [
//             { id: "p2-signal", type: "number", label: "Signal Strength" },
//             { id: "p2-battery", type: "number", label: "Battery Level (%)" },
//             { id: "p2-notes", type: "textarea", label: "Metric Notes" }
//         ]
//     }
// ];

// --- 2. Global State ---
let appState = {};
let timeElapsed = 0;

// Initialize state with default values
pagesConfig.forEach(page => {
    page.fields.forEach(field => {
        if (field.type === 'toggle') {
            appState[field.id] = true;
        } else if (field.type === 'multiselect') {
            appState[field.id] = []; // Multi-selects start as an empty list
        } else if (field.type == 'number') {
            appState[field.id] = 0
        } else {
            appState[field.id] = '';
        }
    });
});

// --- 3. Timer Logic ---
const timerDisplay = document.getElementById('timer');
setInterval(() => {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
    const seconds = (timeElapsed % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}, 1000);

// --- 4. Dynamic Slide Generation ---
function renderPages() {
    const finalSlide = document.getElementById('final-slide');

    pagesConfig.forEach((page) => {
        let html = `
      <div class="swiper-slide">
        <div class="card">
          <h2>${page.title}</h2>
    `;

        page.fields.forEach((field) => {
            // Determine if this field should be hidden on initial load
            // Determine if this field should be hidden on initial load
            let isHidden = false;

            // Check for hallway toggles
            if (field.showIfFalse && appState[field.showIfFalse] === true) {
                isHidden = true;
            }

            // NEW: Check for zero counts
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
                //html += `<label class="field-label">${field.label}</label>`;
                html += `<div class="multiselect-container">`;

                field.options.forEach((option) => {
                    html += `
            <label class="multi-option">
              <!-- Using data-group to link it to the field ID -->
              <input type="checkbox" class="multi-updater" data-group="${field.id}" value="${option}">
              <span>${option}</span>
            </label>
          `;
                });

                html += `</div>`;

            } else if (field.type === 'toggle') {
                // CHANGED: Dynamically apply 'checked' and 'ON' based on the new default state
                const isChecked = appState[field.id];
                html += `
          <div class="switch-container">
          <label class="field-label">${field.label}</label>
            <label class="switch">
              <input type="checkbox" class="state-updater" id="${field.id}" ${isChecked ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span class="status-text" id="label-${field.id}">Status: ${isChecked ? 'CLEAR' : 'NOT CLEAR'}</span>
          </div>
        `;
            }


            html += `</div>`;
        });

        html += `</div></div>`;
        finalSlide.insertAdjacentHTML('beforebegin', html);
    });
}

// Build the DOM
renderPages();

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
            document.getElementById(`label-${id}`).textContent = isChecked ? 'Status: CLEAR' : 'Status: NOT CLEAR';

            // Visibility Logic
            pagesConfig.forEach(page => {
                page.fields.forEach(field => {
                    if (field.showIfFalse === id) {
                        const container = document.getElementById(`container-${field.id}`);
                        if (isChecked) {
                            container.style.display = 'none';
                            appState[field.id] = field.type === 'multiselect' ? [] : '';
                            // Note: Resetting UI inputs for hidden fields is complex, we just wipe the state here.
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

// Also need to catch text typing which doesn't trigger 'change' until you click away
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

                // NEW: Visibility logic for hideIfZero
                // NEW: Visibility logic for hideIfZero
                pagesConfig.forEach(page => {
                    page.fields.forEach(field => {
                        if (field.hideIfZero === id) {
                            const container = document.getElementById(`container-${field.id}`);
                            const val = e.target.value;

                            // Hide if the value is 0 or empty
                            if (val == 0 || val === '') {
                                container.style.display = 'none';
                                appState[field.id] = field.type === 'multiselect' ? [] : '';

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
    reportString += `Total Session Time: ${timerDisplay.textContent}\n`;
    reportString += `============================\n\n`;

    pagesConfig.forEach((page) => {
        reportString += `--- ${page.title} ---\n`;
        page.fields.forEach((field) => {

            if (field.showIfFalse && appState[field.showIfFalse] === true) {
                return;
            }

            // if (field.hideIfZero && appState[field.hideIfZero] === true) {
            //     return;
            // }

            let value = appState[field.id];
            if (field.type === 'toggle') {
                value = value ? 'CLEAR' : 'NOT CLEAR';
            } else if (field.type === 'multiselect') {
                // Join the array with commas, or print 'None' if empty
                if (value.length > 0) {
                    value = value.join(', ')
                } else {
                    return;
                }
                //value = value.length > 0 ? value.join(', ') : '';
                //value = value.length > 0 ? value.join(', ') : 'None selected';
            } else if (value === '') {
                value = 'N/A';
            }
            if (field.type == 'multiselect') {
                reportString += `${value}\n`;
            }
            else {
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