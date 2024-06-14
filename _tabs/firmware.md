---
# the default layout is 'page'
layout: default
title: Firmware Selector
show_title: false
icon: fas fa-code-compare
order: 1
permalink: /firmware-selector
---

<html lang="en">
<body>
    <head>
        <style>
            .form-row {
                display: flex;
                justify-content: space-between;
                align-items: right;
                margin-bottom: 5px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 10px;
            }
            .label-container {
                flex: 0 0 auto;
                margin-right: 20px;
                font-weight: bold;
                color: #883;
                text-transform: uppercase;
            }
            label {
                display: block;
            }
            .select-container {
                flex: 1;
            }
            select {
                width: 45%;
                padding: 2px;
                border: 1px solid #ccc;
                border-radius: 2px;
                background-color: #333;
                font-size: 18px;
                color: #f9f9f9;
            }
            .candidates-row {
                flex: 0 0 auto;
                display: list-item;
                border: 2px solid #ccc;
                width: 60%;
            }
            .button {
                display: inline-block;
                padding: 8px 16px;
                background-color: #0073e6;
                color: #fff;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
                border-radius: 5px;
                border-color: #fff;
                border: 2px solid;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
                transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            }
            .button:hover {
                background-color: #218838;
                border-color: #0073e6;
                color: #c0c0c0;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
            }
            .button:active {
                background-color: #1e7e34;
                border-color: #fff566;
                color: #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                animation: pulse-animation 0.15s both;
                animation-play-state: paused;
            }
            @keyframes pulse-animation {
                0% {
                    transform: scale(1);
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
                }
                100% {
                    transform: scale(0.93);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            }
        </style>
        <h1><i class="fas fa-code-compare"></i> Firmware Selector</h1>
        <p>Version information below</p>
        <hr>
    </head>
    <label for="month-select">Select Release:</label>
    <select id="month-select">
        <option value="latest">Latest Release</option>
        <option>Loading...</option>
    </select>
    <div id="releases-container" style="display: none;">
        <label>Select a release:</label>
        <div id="release-list">Select a month to load releases</div>
    </div>
    <br>
    <div>
        <strong>Selected Release Tag:</strong>
        <div id="selected-release-tag">latest</div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="model">Model:</label>
        </div>
        <div class="select-container">
            <select id="model" onchange="updateModelSelections()">
                <option value="">--Optional--</option>
                <option value="Aquila">Aquila</option>
                <option value="Aquila X3">Aquila X3</option>
                <option value="HC32">HC32</option>
                <option value="Ender">Ender-3V2/S1</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="proUIExtraFeatures">ProUI Extra Features:</label>
        </div>
        <div class="select-container">
            <select id="proUIExtraFeatures" onchange="updateCandidates()">
                <option value="-ProUI">Yes</option>
                <option value="">No</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="screen">Screen:</label>
        </div>
        <div class="select-container">
            <select id="screen" onchange="updateCandidates()">
                <option value="">--Select--</option>
                <option value="DWIN">DWIN</option>
                <option value="TJC-">TJC</option>
                <option value="C2-">12864</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="type">Board Type:</label>
        </div>
        <div class="select-container">
            <select id="type" onchange="updateCandidates()">
                <option value="">--Select--</option>
                <option value="_GD32">GD32</option>
                <option value="_N32">N32</option>
                <option value="HC32">HC32</option>
                <option value="_427">427</option>
                <option value="_422">422</option>
                <option value="_SKR-Mini-E3-">SKR</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="features">Features:</label>
        </div>
        <div class="select-container">
            <select id="features" onchange="updateCandidates()">
                <option value="">--Select--</option>
                <option value="_BMP">BIQU MicroProbe V2</option>
                <option value="_IND">Induction Probe</option>
                <option value="_SPRT13">Creality Sprite</option>
            </select>
        </div>
    </div>
    <div id="secondaryFeaturesDiv" style="display: none;">
        <div class="form-row">
            <div class="label-container">
                <label for="secondaryFeatures">Secondary Features:</label>
            </div>
            <div class="select-container">
                <select id="secondaryFeatures" onchange="updateCandidates()">
                    <option value="">--Select--</option>
                    <option value="_BMP">BIQU MicroProbe V2</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="leveling">Leveling:</label>
        </div>
        <div class="select-container">
            <select id="leveling" onchange="updateCandidates()">
                <option value="">--Select--</option>
                <option value="_Default">Default</option>
                <option value="_MM">Manual Mesh</option>
                <option value="_BLT">Bilinear Bed Leveling</option>
                <option value="_UBL">Unified Bed Leveling</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="options">Options:</label>
        </div>
        <div class="select-container">
            <select id="options" onchange="updateCandidates()">
                <option value="">--Select--</option>
                <option value="-MPC">MPC</option>
                <option value="-IS">Input Shaping</option>
                <option value="-PLR">Power-loss Recovery</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="secondaryOptions">Secondary Options:</label>
        </div>
        <div class="select-container">
            <select id="secondaryOptions" onchange="updateCandidates()">
                <option value="">--Select--</option>
                <option value="-MPC">MPC</option>
            </select>
        </div>
    </div>
    <br>
    <button class="button" id="resetButton">Reset</button>
    <hr>
    <p>
    <div id="candidates"></div>
    </p>
    <h3>📚 Versions</h3>
    <hr>
    <p>Some versions <i>do</i> have options like Power-loss Recovery despite not having it in the file name.<br>
        Board types <b>422</b>, <b>427</b>, and leveling options <b>Default</b>, and <b>Manual Mesh</b> should have this
        and other options enabled.</p>
    <p>These are the special configurations offered:</p>
    <ul>
        <li>[ -ProUI-EX ]<br>
            | ProUI Extra Features |
            <br><b>Toolbar, change bed physical dimensions, and other special features and options</b>
        </li>
        <li>[ -IS ]<br>
            | Input Shaping | (similar to Linear Advance)
        </li>
        <li>[ -MPC ]<br>
            | MPC Autotune | (replaces <b>PID</b> for hotend)
        </li>
        <li>[ -PLR ]<br>
            | Power-Loss Recovery | (resumes where a print job left off when there is a <i>power outage</i>)
        </li>
        <li>[ _SPRT13 ]<br>
            | Sprite Extruder | (uses thermistor # 13)
        </li>
        <li>[ _IND ]<br>
            | Inductive Sensor | (probe used on X3/S2 models)
        </li>
        <li>[ _BMP ]<br>
            | BIQU MicroProbe V2.0 | (alternative to <b>CR</b>/<b>3D</b>/<b>BL</b>/-<b>TOUCH</b>)
            <br><sup>Use <b>ONLY</b> this firmware with "<i>_BMP</i>" if you <b>DO</b> have this probe</sup>
        </li>
    </ul>
    <script>
        const selectMonth = document.getElementById('month-select');
        const releaseContainer = document.getElementById('releases-container');
        const releaseList = document.getElementById('release-list');
        const selectedReleaseTagDiv = document.getElementById('selected-release-tag');
        let releaseTag = 'latest';
        const repoUrl = 'https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases';
        async function fetchAllReleases(url, page = 1, releases = []) {
            const response = await fetch(`${url}?page=${page}&per_page=100`);
            const data = await response.json();
            if (data.length === 0) {
                return releases;
            }
            return fetchAllReleases(url, page + 1, releases.concat(data));
        }
        function formatMonthYear(date) {
            const options = { year: 'numeric', month: 'short' };
            return date.toLocaleDateString('en-US', options);
        }
        function getReleaseMonths(releases) {
            const months = new Set();
            releases.forEach(release => {
                const releaseDate = new Date(release.published_at);
                const releaseMonth = formatMonthYear(releaseDate);
                months.add(releaseMonth);
            });
            return Array.from(months).sort((a, b) => new Date(b) - new Date(a));
        }
        function extractTagName(url) {
            const parts = url.split('/');
            return parts[parts.length - 1];
        }
        function createCheckbox(release) {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = release.html_url;
            checkbox.name = 'release';
            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    releaseTag = `tags/${extractTagName(event.target.value)}`;
                    document.querySelectorAll('input[name="release"]').forEach(otherCheckbox => {
                        if (otherCheckbox !== event.target) {
                            otherCheckbox.checked = false;
                        }
                    });
                } else {
                    releaseTag = '';
                }
                updateSelectedReleaseTag();
            });
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(release.name));
            releaseList.appendChild(label);
        }
        function updateSelectedReleaseTag() {
            selectedReleaseTagDiv.textContent = releaseTag || 'latest';
        }
        function fetchReleasesByMonth(month, releases) {
            const filteredReleases = releases.filter(release => {
                const releaseDate = new Date(release.published_at);
                const releaseMonth = formatMonthYear(releaseDate);
                return releaseMonth === month;
            });
            releaseList.innerHTML = '';
            if (filteredReleases.length > 0) {
                filteredReleases.forEach(release => {
                  createCheckbox(release);
                });
                releaseContainer.style.display = 'block';
            } else {
                releaseList.textContent = 'No releases found';
                releaseContainer.style.display = 'none';
            }
        }
        function populateMonthOptions(releaseMonths) {
            selectMonth.innerHTML = '';
            const optionalOption = document.createElement('option');
            optionalOption.value = 'latest';
            optionalOption.textContent = 'Latest Release';
            selectMonth.appendChild(optionalOption);
            releaseMonths.forEach(month => {
                const option = document.createElement('option');
                option.value = month;
                option.textContent = month;
                selectMonth.appendChild(option);
            });
        }
        async function initializeDropdowns() {
            try {
                const releases = await fetchAllReleases(repoUrl);
                const releaseMonths = getReleaseMonths(releases);
                populateMonthOptions(releaseMonths);
                if (releaseMonths.length > 0) {
                    const latestMonth = releaseMonths[0];
                }
                selectMonth.addEventListener('change', (event) => {
                    const selectedMonth = event.target.value;
                    if (selectedMonth === 'latest') {
                        releaseTag = 'latest';
                        updateSelectedReleaseTag();
                        releaseContainer.style.display = 'none';
                    } else {
                        fetchReleasesByMonth(selectedMonth, releases);
                    }
                });
            } catch (error) {
                console.error('Error fetching releases:', error);
            }
        }
        initializeDropdowns();
        const button = document.getElementById('resetButton');
        button.addEventListener('mousedown', () => {
            button.style.animationPlayState = 'running';
        });
        button.addEventListener('mouseup', () => {
            button.style.animationPlayState = 'paused';
        });
        document.addEventListener('DOMContentLoaded', () => {
            async function fetchReleaseData(url) {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.assets) {
                        return data.assets;
                    } else {
                        console.error('No assets found for the release.');
                        return [];
                    }
                } catch (error) {
                    console.error('Error fetching release data:', error);
                    return [];
                }
            }
            async function updateCandidates() {
                const model = document.getElementById("model").value;
                const proUIExtraFeatures = document.getElementById("proUIExtraFeatures").value;
                const screen = document.getElementById("screen").value;
                const type = document.getElementById("type").value;
                const features = document.getElementById("features").value;
                const secondaryFeatures = document.getElementById("secondaryFeatures").value;
                const secondaryFeaturesDiv = document.getElementById("secondaryFeaturesDiv");
                const leveling = document.getElementById("leveling").value;
                const options = document.getElementById("options").value;
                const secondaryOptions = document.getElementById("secondaryOptions").value;
                secondaryFeaturesDiv.style.display = (features === "_SPRT13") ? "block" : "none";
                let linkPrefix = "";
                let modelType = "";
                let assets = [];
                if (screen === "C2-") {
                    document.getElementById("proUIExtraFeatures").selectedIndex = 1;
                }
                if (model === "HC32" || type === "HC32") {
                    if (screen === "C2-") {
                        linkPrefix = "C2-HC32";
                    } else if (screen === "DWIN") {
                        linkPrefix = "HC32";
                    }
                } else if (model === "Ender") {
                    linkPrefix = "Ender";
                } else {
                    if (screen === "C2-") {
                        linkPrefix = "C2-Aquila";
                    } else if (screen === "DWIN") {
                        linkPrefix = "Aquila";
                    }
                }
                if (releaseTag === "latest") {
                    if (model === "HC32" || type === "HC32") {
                        modelType = "-HC32";
                    } else if (model === "Ender") {
                        modelType = "-ender";
                    } else {
                        modelType = "";
                    }
                    assets = await fetchReleaseData(`https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/2.1.3f-5${modelType}-2`);
                } else {
                    assets = await fetchReleaseData(`https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/${releaseTag}`);
                }
                const candidates = assets.filter(asset => {
                    const name = asset.name;
                    if (features === "") {
                        if (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13")) {
                            return;
                        }
                    }
                    if (features === "_SPRT13") {
                        if (secondaryFeatures === "") {
                            if (name.includes("_BMP")) {
                                return;
                            }
                        }
                    }
                    if (proUIExtraFeatures === "") {
                        if (name.includes("-ProUI")) {
                            return;
                        }
                    }
                    return (
                        name.startsWith(linkPrefix) &&
                        (type === "" || name.includes(type)) &&
                        (features === "" || name.includes(features)) &&
                        (secondaryFeatures === "" || name.includes(secondaryFeatures)) &&
                        (leveling === "" || name.includes(leveling)) &&
                        (options === "" || name.includes(options)) &&
                        (secondaryOptions === "" || name.includes(secondaryOptions)) &&
                        (proUIExtraFeatures === "" || name.includes(proUIExtraFeatures))
                    );
                });
                const candidatesList = document.getElementById("candidates");
                candidatesList.innerHTML = '<a class="fas fa-download"></a><strong> Candidates:</strong><br>';
                if (candidates.length > 0) {
                    candidates.forEach(candidate => {
                        const url = candidate.browser_download_url;
                        const filename = url.substring(url.lastIndexOf('/') + 1);
                        candidatesList.innerHTML += `<div class='candidates-row'><a href='${url}'>${filename}</a></div>`;
                    });
                } else {
                    candidatesList.textContent = "No candidates found.";
                }
            }
            function updateModelSelections() {
                const model = document.getElementById("model").value;
                clearSelections();
                if (model === "Aquila X3") {
                    document.getElementById("features").value = "_IND";
                    document.getElementById("screen").selectedIndex = 1;
                } else if (model === "Aquila") {
                    document.getElementById("type").value = "_GD32";
                    document.getElementById("screen").selectedIndex = 1;
                } else if (model === "HC32") {
                    document.getElementById("type").value = "HC32";
                    document.getElementById("screen").selectedIndex = 1;
                } else if (model === "Ender") {
                    document.getElementById("screen").selectedIndex = 1;
                }
                updateCandidates();
            }
            function clearSelections() {
                document.getElementById("proUIExtraFeatures").selectedIndex = 0;
                document.getElementById("screen").selectedIndex = 0;
                document.getElementById("type").selectedIndex = 0;
                document.getElementById("features").selectedIndex = 0;
                document.getElementById("secondaryFeatures").selectedIndex = 0;
                document.getElementById("leveling").selectedIndex = 0;
                document.getElementById("options").selectedIndex = 0;
                document.getElementById("secondaryOptions").selectedIndex = 0;
                document.getElementById("secondaryFeaturesDiv").style.display = "none";
            }
            function resetSelections() {
                document.getElementById("model").selectedIndex = 0;
                clearSelections();
                updateCandidates();
            }
            document.getElementById("model").addEventListener('change', updateModelSelections);
            document.getElementById("proUIExtraFeatures").addEventListener('change', updateCandidates);
            document.getElementById("screen").addEventListener('change', updateCandidates);
            document.getElementById("type").addEventListener('change', updateCandidates);
            document.getElementById("features").addEventListener('change', updateCandidates);
            document.getElementById("secondaryFeatures").addEventListener('change', updateCandidates);
            document.getElementById("leveling").addEventListener('change', updateCandidates);
            document.getElementById("options").addEventListener('change', updateCandidates);
            document.getElementById("secondaryOptions").addEventListener('change', updateCandidates);
            document.getElementById("resetButton").addEventListener('click', resetSelections);
            updateCandidates();
        });
    </script>
</body>
</html>

