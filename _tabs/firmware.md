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
<head>
    <style>
        .form-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
        }
        .label-container {
            flex: 0 0 50%;
            text-align: right;
            font-weight: bold;
            color: #883;
            text-transform: uppercase;
        }
        label {
            display: block;
        }
        .select-container {
            flex: 1;
            padding-left: 2%;
        }
        select {
            position: absolute;
            width: 25%;
            padding: 2px;
            border: 1px solid #ccc;
            border-radius: 2px;
            background-color: #333;
            font-size: 18px;
            color: #f9f9f9;
        }
        .candidates-row {
            margin-left: 25%;
            padding-left: 1%;
            flex: 0 0 auto;
            display: list-item;
            border: 2px solid #333;
            width: 60%;
        }
        .candidates-container {
            display: flex; justify-content: center; align-items: center;
        }
        .button-container {
            display: flex;
            justify-content: center;
        }
        .button {
            position: relative;
            display: inline-block;
            align-items: center;
            justify-content: center;
            width: 150px;
            padding: 8px 16px;
            background-color: #0073e6;
            color: #fff;
            cursor: pointer;
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
            color: #fff;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .button:active {
            background-color: #1e7e34;
            border-color: #fff566;
            color: #c0c0c0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            animation: pulse-animation 0.1s both;
            animation-play-state: paused;
            transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
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
        .button .icon {
            position: absolute;
            left: 10%;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
        .button .icon2 {
            position: absolute;
            right: 10%;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
        .button .label {
            flex-grow: 1;
            text-align: center;
        }
        .downloadcontainer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    </style>
    <h1><i class="fas fa-code-compare"></i> Firmware Selector</h1>
    <p>Version information below</p>
    <hr>
</head>
<body>
    <label for="month-select"><h3><i class="icon fas fa-list-check"></i> Select a Release:</h3></label>
    <select id="month-select">
        <option value="latest">Latest Release</option>
        <option>Loading...</option>
    </select>
    <div id="releases-container" style="display: none;">
        <label>Select a Release:</label>
        <p>Older Releases may not be fully compatible with the Selector</p>
        <div id="release-list">Select a month to load releases</div>
    </div>
    <br>
    <div>
    <br>
        <strong>Selected Release Tag:</strong>
        <div id="selected-release-tag">latest</div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="model"><i class="icon fas fa-cubes"></i> Model:</label>
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
            <label for="proUIExtraFeatures"><i class="icon fas fa-shield-halved"></i> ProUI Extra Features:</label>
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
            <label for="screen"><i class="icon fas fa-mobile-screen-button"></i> LCD Display:</label>
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
            <label for="type"><i class="icon fas fa-microchip"></i> Board Type:</label>
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
            <label for="features"><i class="icon fas fa-bars"></i> Features:</label>
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
                <label for="secondaryFeatures"><i class="icon fas fa-bars-staggered"></i> Secondary Features:</label>
            </div>
            <div class="select-container">
                <select id="secondaryFeatures" onchange="updateCandidates()">
                    <option value="">--Select--</option>
                    <option value="_BMP">BIQU MicroProbe V2</option>
                    <option value="_SPRT13">Creality Sprite</option>
                </select>
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="leveling"><i class="icon fas fa-layer-group"></i> Leveling:</label>
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
            <label for="options"><i class="icon fas fa-gears"></i> Options:</label>
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
    <div id="secondaryOptionsDiv" style="display: none;">
        <div class="form-row">
            <div class="label-container">
                <label for="secondaryOptions"><i class="icon fas fa-gear"></i> Secondary Options:</label>
            </div>
            <div class="select-container">
                <select id="secondaryOptions" onchange="updateCandidates()">
                    <option value="">--Select--</option>
                    <option value="-MPC">MPC</option>
                    <option value="-IS">Input Shaping</option>
                </select>
            </div>
        </div>
    </div>
    <br>
    <div class="button-container">
        <button class="button" id="resetButton">
            <span class="icon">🔄</span>
            <span class="label">Reset</span>
            <span class="icon2">🔄</span>
        </button>
    </div>
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
        document.addEventListener('DOMContentLoaded', () => {
            const selectMonth = document.getElementById('month-select');
            const releaseContainer = document.getElementById('releases-container');
            const releaseList = document.getElementById('release-list');
            const selectedReleaseTagDiv = document.getElementById('selected-release-tag');
            const resetButton = document.getElementById('resetButton');
            let releaseTag = 'latest';
            const repoUrl = 'https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases';
            async function fetchAllReleases(url, page = 1, releases = []) {
                try {
                    const response = await fetch(`${url}?page=${page}&per_page=100`);
                    const data = await response.json();
                    if (data.length === 0) {
                        return releases;
                    }
                    return fetchAllReleases(url, page + 1, releases.concat(data));
                } catch (error) {
                    console.error('Error fetching releases:', error);
                    return [];
                }
            }
            function formatMonthYear(date) {
                return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            }
            function getReleaseMonths(releases) {
                const months = new Set();
                releases.forEach(release => months.add(formatMonthYear(release.published_at)));
                return Array.from(months).sort((a, b) => new Date(b) - new Date(a));
            }
            function extractTagName(url) {
                return url.split('/').pop();
            }
            function splitTag(tag) {
                const regex = /^(\d+\.\d+\.\d+[a-z]*)(?:-(-?\d+))?(?:-(HC32|ender3))?(?:-(-?\d+))?$/;
                const match = tag.match(regex);
                return {
                    version: match ? match[1] : '',
                    month: match ? match[2] : '',
                    model: match ? match[3] : '',
                    revision: match ? match[4] : ''
                };
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
                            if (otherCheckbox !== event.target) otherCheckbox.checked = false;
                        });
                    } else {
                        releaseTag = 'latest';
                    }
                    updateSelectedReleaseTag();
                    updateCandidates();
                });
                label.append(checkbox, release.name);
                releaseList.appendChild(label);
            }
            function updateSelectedReleaseTag() {
                selectedReleaseTagDiv.textContent = releaseTag || 'latest';
            }
            function fetchReleasesByMonth(month, releases) {
                const filteredReleases = releases.filter(release => formatMonthYear(release.published_at) === month);
                releaseList.innerHTML = '';
                if (filteredReleases.length > 0) {
                    filteredReleases.forEach(createCheckbox);
                    releaseContainer.style.display = 'block';
                } else {
                    releaseList.textContent = 'No releases found';
                    releaseContainer.style.display = 'none';
                }
            }
            function populateMonthOptions(releaseMonths) {
                selectMonth.innerHTML = '<option value="latest">Latest Release</option>';
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
                    selectMonth.addEventListener('change', (event) => {
                        const selectedMonth = event.target.value;
                        if (selectedMonth === 'latest') {
                            releaseTag = 'latest';
                            updateSelectedReleaseTag();
                            updateCandidates();
                            releaseContainer.style.display = 'none';
                        } else {
                            fetchReleasesByMonth(selectedMonth, releases);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching releases:', error);
                }
            }
            async function fetchReleaseData(model) {
                const releaseHTML = await fetchReleaseHTML(`https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/${releaseTag}`);
                const areleaseTag = extractTagName(releaseHTML);
                const split = splitTag(areleaseTag);
                if (model === "HC32") {
                    split.model = "HC32";
                } else if (model === "Ender") {
                    split.model = "ender3";
                }
                const tag = `${split.version}${split.month ? '-' + split.month : ''}${split.model ? '-' + split.model : ''}${split.revision ? '-' + split.revision : ''}`;
                const apiUrl = `https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/${tag}`;
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    return data.assets || [];
                } catch (error) {
                    console.error('Error fetching release assets:', error);
                    return [];
                }
            }
            async function fetchReleaseHTML(url) {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.html_url || '';
                } catch (error) {
                    console.error('Error fetching release HTML URL:', error);
                    return '';
                }
            }
            async function updateCandidates() {
                const model = document.getElementById("model").value;
                let proUIExtraFeatures = document.getElementById("proUIExtraFeatures").value;
                const screen = document.getElementById("screen").value;
                const type = document.getElementById("type").value;
                const features = document.getElementById("features").value;
                const secondaryFeatures = document.getElementById("secondaryFeatures").value;
                const secondaryFeaturesDiv = document.getElementById("secondaryFeaturesDiv");
                const secondaryFeaturesSelect = document.getElementById("secondaryFeatures");
                const selectedSecondaryFeature = secondaryFeaturesSelect.value;
                const leveling = document.getElementById("leveling").value;
                const options = document.getElementById("options").value;
                const secondaryOptions = document.getElementById("secondaryOptions").value;
                const secondaryOptionsDiv = document.getElementById("secondaryOptionsDiv");
                const secondaryOptionsSelect = document.getElementById("secondaryOptions");
                const selectedSecondaryOption = secondaryOptionsSelect.value;
                secondaryFeaturesDiv.style.display = (features === "_SPRT13" || features === "_BMP") ? "block" : "none";
                secondaryOptionsDiv.style.display = (options === "-MPC" || options === "-IS") ? "block" : "none";
                secondaryFeaturesSelect.innerHTML = '<option value="">--Select--</option>';
                if (features === "_SPRT13") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_BMP">BIQU MicroProbe V2</option>';
                } else if (features === "_BMP") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPRT13">Creality Sprite</option>';
                }
                secondaryFeaturesSelect.value = selectedSecondaryFeature;
                secondaryOptionsSelect.innerHTML = '<option value="">--Select--</option>';
                if (options === "-IS") {
                    secondaryOptionsSelect.innerHTML += '<option value="-MPC">MPC</option>';
                } else if (options === "-MPC") {
                    secondaryOptionsSelect.innerHTML += '<option value="-IS">Input Shaping</option>';
                } else {
                    secondaryOptionsSelect.innerHTML += '<option value="-MPC">MPC</option><option value="-IS">Input Shaping</option>';
                }
                secondaryOptionsSelect.value = selectedSecondaryOption;
                if (screen === "C2-") {
                    proUIExtraFeatures = "";
                    document.getElementById("proUIExtraFeatures").value = proUIExtraFeatures;
                }
                let linkPrefix = "";
                if (model === "HC32" || type === "HC32") {
                    linkPrefix = (screen === "C2-") ? "C2-HC32" : "HC32";
                } else if (model === "Ender") {
                    linkPrefix = (screen === "TJC-") ? "TJC-Ender" : "Ender";
                } else {
                    if (screen === "C2-") {
                        linkPrefix = "C2-Aquila";
                    } else if (screen === "TJC-") {
                        linkPrefix = "TJC-Aquila";
                    } else {
                        linkPrefix = "Aquila";
                    }
                }
                const assets = await fetchReleaseData(model);
                const candidates = assets.filter(asset => {
                    const name = asset.name;
                    if (features === "" && (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13"))) return false;
                    if (features === "_SPRT13" && secondaryFeatures === "" && name.includes("_BMP")) return false;
                    if (features === "_BMP" && secondaryFeatures === "" && name.includes("_SPRT13")) return false;
                    if (options === "-MPC" && secondaryOptions === "" && name.includes("-IS")) return false;
                    if (options === "-IS" && secondaryOptions === "" && name.includes("-MPC")) return false;
                    if (proUIExtraFeatures === "" && name.includes("-ProUI")) return false;
                    return (
                        name.startsWith(linkPrefix) &&
                        (!type || name.includes(type)) &&
                        (!features || name.includes(features)) &&
                        (!secondaryFeatures || name.includes(secondaryFeatures)) &&
                        (!leveling || name.includes(leveling)) &&
                        (!options || name.includes(options)) &&
                        (!secondaryOptions || name.includes(secondaryOptions)) &&
                        (!proUIExtraFeatures || name.includes(proUIExtraFeatures))
                    );
                });
                const candidatesList = document.getElementById("candidates");
                candidatesList.innerHTML = '<div class="candidates-container"><a style="font-size: 26px;"class="icon fas fa-rectangle-list"></a><strong>Candidates:</strong><br></div><br>';
                if (candidates.length > 0) {
                    candidates.forEach(candidate => {
                        const url = candidate.browser_download_url;
                        const filename = url.substring(url.lastIndexOf('/') + 1);
                        candidatesList.innerHTML += `<div class='candidates-row'><span class='downloadcontainer'><span style="color: brown">${filename}</span><a style="margin-left: auto; margin-right: 2%; font-size: 20px;" href='${url}' class="fas fa-download"></a></span></div>`;
                    });
                } else {
                    candidatesList.textContent = "No candidates found.";
                }
            }
            function updateModelSelections() {
                const model = document.getElementById("model").value;
                clearSelections();
                switch (model) {
                    case "Aquila X3":
                        document.getElementById("features").value = "_IND";
                        document.getElementById("type").value = "_N32";
                        document.getElementById("leveling").value = "_UBL";
                        break;
                    case "Aquila":
                        document.getElementById("type").value = "_GD32";
                        break;
                    case "HC32":
                        document.getElementById("type").value = "HC32";
                        break;
                }
                document.getElementById("screen").selectedIndex = model ? 1 : 0;
                updateCandidates();
            }
            function clearSelections() {
                document.querySelectorAll('#proUIExtraFeatures, #screen, #type, #features, #secondaryFeatures, #leveling, #options, #secondaryOptions').forEach(selection => selection.selectedIndex = 0);
                document.getElementById("secondaryFeaturesDiv").style.display = "none";
            }
            function resetSelections() {
                document.getElementById("model").selectedIndex = 0;
                clearSelections();
                updateCandidates();
            }
            document.getElementById("features").addEventListener("change", () => {
                document.getElementById("secondaryFeatures").value = "";
            });
            document.getElementById("options").addEventListener("change", () => {
                document.getElementById("secondaryOptions").value = "";
            });
            resetButton.addEventListener('mousedown', () => resetButton.style.animationPlayState = 'running');
            resetButton.addEventListener('mouseup', () => resetButton.style.animationPlayState = 'paused');
            resetButton.addEventListener('click', resetSelections);
            document.getElementById("model").addEventListener('change', updateModelSelections);
            document.querySelectorAll('#proUIExtraFeatures, #screen, #type, #features, #secondaryFeatures, #leveling, #options, #secondaryOptions').forEach(input => input.addEventListener('change', updateCandidates));
            initializeDropdowns();
            updateCandidates();
            updateSelectedReleaseTag();
        });
    </script>
</body>
</html>