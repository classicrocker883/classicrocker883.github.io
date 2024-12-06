---
title: Firmware Selector
description: >-
    Firmware Selection.
author: ClassicRocker883
permalink: /firmware
date: 2024-12-06 00:00:00 -0400
categories: [Firmware, Tutorial]
tags: [firmware]
pin: true
image:
  path: /assets/img/firmware-selector.gif
  alt: Firmware Selector
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
            padding-left: 2%;
            margin-right: 50%;
        }
        select {
            width: 10em;
            padding: 2px;
            border: 1px solid #ccc;
            border-radius: 2px;
            background-color: #333;
            font-size: 18px;
            color: #f9f9f9;
        }
        .candidates-row {
            padding-left: 1%;
            flex: 0 0 auto;
            display: list-item;
            border: 2px solid #333;
            width: 110%;
        }
        .candidates-container {
            display: flex;
            justify-content: center;
            align-items: center;
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
        .center {
            display: block;
            text-align: center;
            margin: 0 auto;
        }
    </style>
    <h1 class="center"><i class="fas fa-code-compare"></i> Firmware Selector</h1>
    <p class="center" style=""><a href="#versions">Version information below</a></p>
    <img alt="Firmware Selector Logo" src="https://classicrocker883.github.io/assets/img/firmware-selector.png"
        width="200" height="200" class="center">
    <hr>
</head>
<body>
    <label for="month-select">
        <h3><i class="icon fas fa-list-check"></i> Select a Release:</h3>
    </label>
    <select id="month-select">
        <option value="latest" title="The most recent release version">Latest Release</option>
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
        <div id="total-downloads"></div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="model"><i class="icon fas fa-cubes"></i> Model:</label>
        </div>
        <div class="select-container">
            <select id="model" onchange="updateModelSelections()">
                <option value="" title="May help to choose a model first">--Select Model--</option>
                <option value="Aquila" title="Aquila OG/X2">Aquila</option>
                <option value="Aquila X3" title="Aquila X3/S3 Induction Probe">Aquila X3/S3</option>
                <option value="HC32" title="H32 Chipset">HC32</option>
                <option value="Ender" title="Ender-3V2/S1">Ender-3V2/S1</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="proUIExtraFeatures"><i class="icon fas fa-shield-halved"></i> ProUI Extra Features:</label>
        </div>
        <div class="select-container">
            <select id="proUIExtraFeatures" onchange="updateCandidates()">
                <option value="-ProUI" title="ProUI-EX">Yes</option>
                <option value="" title="No ProUI Extra Features">No</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="screen"><i class="icon fas fa-mobile-screen-button"></i> LCD Display:</label>
        </div>
        <div class="select-container">
            <select id="screen" onchange="updateCandidates()">
                <option value="" title="No specific display selected">--Select--</option>
                <option value="DWIN">DWIN</option>
                <option value="TJC-" title="TJC-">TJC</option>
                <option value="C2-" title="C2- (Monochrome LCD Display)">12864</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="type"><i class="icon fas fa-microchip"></i> Board Type:</label>
        </div>
        <div class="select-container">
            <select id="type" onchange="updateCandidates()">
                <option value="" title="No specific board type">--Select--</option>
                <option value="_GD32" title="_GD32">GD32</option>
                <option value="_N32" title="_N32">N32</option>
                <option value="HC32" title="HC32">HC32</option>
                <option value="_427" title="_427">Creality 4.2.7</option>
                <option value="_422" title="_422">Creality 4.2.2</option>
                <option value="_E3-Free-runs" title="_E3-Free-runs">Creality E3 Free-runs</option>
                <option value="-S1-F1" title="-S1-F1">Ender-3 S1 F103</option>
                <option value="-S1-F4" title="-S1-F4">Ender-3 S1 F401</option>
                <option value="_SKR-Mini-E3-" title="_SKR-Mini-E3-">BTT SKR Mini E3</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="features"><i class="icon fas fa-bars"></i> Features:</label>
        </div>
        <div class="select-container">
            <select id="features" onchange="updateCandidates()">
                <option value="" title="No specific features">--Select--</option>
                <option value="">CR/3D/BL-Touch</option>
                <option value="_BMP" title="_BMP">BIQU MicroProbe V2</option>
                <option value="_IND" title="_IND">Induction Probe</option>
                <option value="_SPRT13" title="_SPRT13">Creality Sprite</option>
                <option value="_SPDY5" title="_SPDY5">Creality Spider Speedy</option>
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
                    <option value="" title="No specific secondary features">--Select--</option>
                    <option value="_BMP" title="_BMP">BIQU MicroProbe V2</option>
                    <option value="_IND" title="_IND">Induction Probe</option>
                    <option value="_SPRT13" title="_SPRT13">Creality Sprite</option>
                    <option value="_SPDY5" title="_SPDY5">Creality Spider Speedy</option>
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
                <option value="" title="Choose bed leveling">--Select--</option>
                <option value="_UBL" title="_UBL">Unified Bed Leveling</option>
                <option value="_BLT" title="_BLT">Bilinear Bed Leveling</option>
                <option value="_MM" title="_MM">Manual Mesh</option>
                <option value="_Default" title="_Default">Default</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="options"><i class="icon fas fa-gears"></i> Options:</label>
        </div>
        <div class="select-container">
            <select id="options" onchange="updateCandidates()">
                <option value="" title="No specific options">--Select--</option>
                <option value="-MPC" title="-MPC">MPC</option>
                <option value="-IS" title="-IS">Input Shaping</option>
                <option value="-PLR" title="-PLR">Power-loss Recovery</option>
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
                    <option value="" title="No specific secondary options">--Select--</option>
                    <option value="-MPC" title="-MPC">MPC</option>
                    <option value="-IS" title="-IS">Input Shaping</option>
                    <option value="-PLR" title="-PLR">Power-loss Recovery</option>
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
    <div class="candidates-container">
        <table id="versionsTable">
            <thead>
                <tr>
                    <th id="candidates"></th>
                </tr>
            </thead>
        </table>
    </div>
    <h3 id="versions">📚 Versions</h3>
    <hr>
    <p>Some versions <i>do</i> have options like Power-loss Recovery despite not having it in the file name.<br>
        Board types <b>422</b>/<b>427</b>, and leveling options <b>Default</b>/<b>Manual Mesh</b> should have this
        and other options enabled which may not be available in base <b>UBL</b>/<b>BLT</b> <b>ProUI-EX</b> versions.</p>
    <dl>
        <dt>These are the configurations offered:</dt>
    </dl>
    <h3>Bed Leveling Options</h3>
    <ul>
        <li><b>[ _Default-NP ]</b>: Use if you have a near stock machine</li><sup>Default No Probe</sup>
        <li><b>[ _MM ]</b>: Create a bed mesh without an auto bed probe</li><sup><a
                href="https://marlinfw.org/docs/gcode/G029-mbl.html" rel="nofollow">Manual Mesh Bed Leveling</a></sup>
        <li><b>[ _BLT ]</b>: Use if you have a CR/3D/BL-Touch level sensor installed.</li><sup><a
                href="https://marlinfw.org/docs/features/auto_bed_leveling.html" rel="nofollow">Bilinear Auto Bed
                Leveling</a></sup>
        <li><b>[ _UBL ]</b>: Similar to both MM and BLT - with more options. Recommended over BLT</li><sup><a
                href="https://marlinfw.org/docs/features/unified_bed_leveling.html" rel="nofollow">Unified Bed
                Leveling</a></sup>
    </ul>
    <h3>Special Versions</h3>
    <dl>
        <dt><sup>(List of file prefixes and suffixes)</sup></dt>
    </dl>
    <ul>
        <li>[ -ProUI-EX ]<br> | ProUI Extra Features | <dl><dt>Toolbar, change bed physical dimensions, and other special
                features and options</dt></dl>
        </li>
        <li>[ _E3-Free-runs ]<br> | Creality E3 Free-runs | (Creality board - TMC2209 drivers)
        </li>
        <li>[ -S1-&lt;F1/F4&gt ]<br> | Creality Ender-3 S1 | (Check to see whether you have <b>F1</b> or <b>F4</b>)
            <dt><i>-S1-F1</i>: <code>STM32F103RC</code> chip and <code>CREALITY_V24S1_301</code> board</dt>
            <dt><i>-S1-F4</i>: <code>STM32F401RC</code> chip and <code>CREALITY_V24S1_301F4</code> board</dt>
        </li>
        <p></p>
        <dd><ins><b>LCD Displays</b></ins></dd>
        <li>[ DWIN ]<br> | Stock DWIN LCD | (No actual prefix)</li>
        <li>[ TJC- ]<br> | Creality TJC LCD | (As aftermarket or sometimes used in stock Creality machines)</li>
        <li>[ C2- ]<br> | Monochrome 128x64 LCD | (Used in Aquila C2 and original Ender-3/CR-10)</li>
        <sup>This has <b>NO</b> ProUI capabilities</sup>
        <p></p>
        <dd><ins><b>Features</b></ins></dd>
        <li>[ _SPRT13 ]<br> | Sprite Extruder | (Uses thermistor # 13)</li>
        <li>[ _SPDY5 ]<br> | Spider Speedy Hotend | (Uses thermistor # 5)</li>
        <li>[ _IND ]<br> | Inductive Sensor | (Probe used on <b>X3</b>/<b>S3</b> models)<br>
            <b>CAUTION</b>: You may need to adjust the <ins>Probe Y Offset</ins> to <b>-20</b> or <b>-25</b> on an <b>S3</b></li>
        <li>[ _BMP ]<br> | BIQU MicroProbe V2.0 | (Alternative to <b>CR</b>/<b>3D</b>/<b>BL</b>/-<b>Touch</b>)</li>
        <sup>Use <b>ONLY</b> this firmware with <i>_BMP</i> if you <b>DO</b> have this probe</sup>
        <p></p>
        <dd><ins><b>Options</b></ins></dd>
        <li>[ -IS ]<br> | Input Shaping | (Similar to <b>Linear Advance</b>)</li>
        <sup>Use <b>ONLY</b> if you mean to do the initial calibration✶</sup>
        <li>[ -MPC ]<br> | MPC Autotune | (Replaces <b>PID</b> for hotend)</li>
        <li>[ -PLR ]<br> | Power-Loss Recovery | (Resumes where a print job left off when there is a <i>power
                outage</i>)</li>
    </ul>
    <sup>✶Reminder: Do not use `Input Shaping` (file suffix <i>-IS</i>) <b>unless</b> you do the necessary
        calibration.<br>
        Prints will be effected regardless. May require a special breakout board or test prints to calibrate.
    </sup>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const selectMonth = document.getElementById('month-select');
            const releaseContainer = document.getElementById('releases-container');
            const releaseList = document.getElementById('release-list');
            const selectedReleaseTagDiv = document.getElementById('selected-release-tag');
            const resetButton = document.getElementById('resetButton');
            const totalDownloads = document.getElementById('total-downloads');
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
                const regex = /^(\d+\.\d+\.\d+[a-z]*)(?:-(-?\d+))?(?:-(HC32|ender3))?(?:-(-?\d+[a-z]*))?$/;
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
                let releaseTagName = releaseTag.replace("tags/", "");
                selectedReleaseTagDiv.textContent = releaseTagName || 'latest';
                totalDownloads.innerHTML = `<label><img alt='GitHub Downloads (all assets)' src='https://img.shields.io/github/downloads/classicrocker883/MRiscoCProUI/${releaseTagName}/total'> - Total</label>`
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
                const extractedTag = extractTagName(releaseHTML);
                const split = splitTag(extractedTag);
                const type = document.getElementById("type").value;
                if (model === "HC32" || type === "HC32") {
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
                const leveling = document.getElementById("leveling").value;
                const options = document.getElementById("options").value;
                const secondaryOptions = document.getElementById("secondaryOptions").value;
                const secondaryOptionsDiv = document.getElementById("secondaryOptionsDiv");
                const secondaryOptionsSelect = document.getElementById("secondaryOptions");
                secondaryFeaturesDiv.style.display = (features === "_SPRT13" || features === "_SPDY5" || features === "_BMP" || features === "_IND") ? "block" : "none";
                secondaryOptionsDiv.style.display = (options === "-MPC" || options === "-IS" || options === "-PLR") ? "block" : "none";
                secondaryFeaturesSelect.innerHTML = '<option value="" title="No specific secondary feature">--Select--</option>';
                if (features === "_SPRT13") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_BMP" title="_BMP">BIQU MicroProbe V2</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_IND" title="_IND">Induction Probe</option>';
                } else if (features === "_SPDY5") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_BMP" title="_BMP">BIQU MicroProbe V2</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_IND" title="_IND">Induction Probe</option>';
                } else if (features === "_BMP") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPRT13" title="_SPRT13">Creality Sprite</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPDY5" title="_SPDY5">Creality Spider Speedy</option>';
                } else if (features === "_IND") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPRT13" title="_SPRT13">Creality Sprite</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPDY5" title="_SPDY5">Creality Spider Speedy</option>';
                }
                secondaryFeaturesSelect.value = secondaryFeatures;
                secondaryOptionsSelect.innerHTML = '<option value="" title="No specific secondary option">--Select--</option>';
                if (options === "-MPC") {
                    secondaryOptionsSelect.innerHTML += '<option value="-IS" title="-IS">Input Shaping</option>';
                    secondaryOptionsSelect.innerHTML += '<option value="-PLR" title="-PLR">Power-loss Recovery</option>';
                } else if (options === "-IS") {
                    secondaryOptionsSelect.innerHTML += '<option value="-MPC" title="-MPC">MPC</option>';
                    secondaryOptionsSelect.innerHTML += '<option value="-PLR" title="-PLR">Power-loss Recovery</option>';
                } else if (options === "-PLR") {
                    secondaryOptionsSelect.innerHTML += '<option value="-MPC" title="-MPC">MPC</option>';
                    secondaryOptionsSelect.innerHTML += '<option value="-IS" title="-IS">Input Shaping</option>';
                }
                secondaryOptionsSelect.value = secondaryOptions;
                if (screen === "C2-" || leveling === "_Default") {
                    proUIExtraFeatures = "";
                    document.getElementById("proUIExtraFeatures").value = proUIExtraFeatures;
                }
                let linkPrefix = "";
                const screenMap = {
                    "HC32": { "C2-": "C2-HC32", "TJC-": "TJC-HC32", "default": "HC32" },
                    "Ender": { "TJC-": "TJC-Ender", "default": "Ender" },
                    "default": { "C2-": "C2-Aquila", "TJC-": "TJC-Aquila", "default": "Aquila" }
                };
                if (model === "HC32" || type === "HC32") {
                    linkPrefix = screenMap["HC32"][screen] || screenMap["HC32"]["default"];
                } else if (model === "Ender") {
                    linkPrefix = screenMap["Ender"][screen] || screenMap["Ender"]["default"];
                } else {
                    linkPrefix = screenMap["default"][screen] || screenMap["default"]["default"];
                }
                const assets = await fetchReleaseData(model);
                const candidates = assets.filter(asset => {
                    const name = asset.name;
                    if (type !== "_GD32" && name.includes("_GD32")) return false;
                    if (type !== "_N32" && name.includes("_N32")) return false;
                    if (type !== "HC32" && name.includes("HC32")) return false;
                    if (type !== "_427" && name.includes("_427")) return false;
                    if (type !== "_422" && name.includes("_422")) return false;
                    if (type !== "-S1-F1" && name.includes("-S1-F1")) return false;
                    if (type !== "-S1-F4" && name.includes("-S1-F4")) return false;
                    if (type !== "_SKR-Mini-E3-" && name.includes("_SKR-Mini-E3-")) return false;
                    if (type !== "_E3-Free-runs" && name.includes("_E3-Free-runs")) return false;
                    if (features === "" && (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13") || name.includes("_SPDY5"))) return false;
                    if (features === "_SPRT13" && secondaryFeatures === "" && (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPDY5"))) return false;
                    if (features === "_SPDY5" && secondaryFeatures === "" && (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13"))) return false;
                    if (features === "_BMP" && secondaryFeatures === "" && (name.includes("_IND") || name.includes("_SPRT13") || name.includes("_SPDY5"))) return false;
                    if (features === "_IND" && secondaryFeatures === "" && (name.includes("_BMP") || name.includes("_SPRT13") || name.includes("_SPDY5"))) return false;
                    if (leveling !== "_UBL" && name.includes("_UBL")) return false;
                    if (leveling !== "_BLT" && name.includes("_BLT")) return false;
                    if (leveling !== "_MM" && name.includes("_MM")) return false;
                    if (leveling !== "_Default" && name.includes("_Default")) return false;
                    if (options === "" && (name.includes("-MPC") || name.includes("-IS") || name.includes("-PLR"))) return false;
                    if (options === "-MPC" && secondaryOptions === "" && (name.includes("-IS") || name.includes("-PLR"))) return false;
                    if (options === "-IS" && secondaryOptions === "" && (name.includes("-MPC") || name.includes("-PLR"))) return false;
                    if (options === "-PLR" && secondaryOptions === "" && (name.includes("-MPC") || name.includes("-IS"))) return false;
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
                candidatesList.innerHTML = '<div class="candidates-container"><a style="font-size: 26px;"class="icon fas fa-rectangle-list"></a><strong>&nbsp;Candidates:</strong><br></div><br>';
                if (candidates.length > 0) {
                    candidates.forEach(candidate => {
                        const url = candidate.browser_download_url;
                        const filename = url.substring(url.lastIndexOf('/') + 1);
                        candidatesList.innerHTML += `<div class='candidates-row'><span class='downloadcontainer'><span style='color: brown'>${filename}</span><a style='margin-left: auto; margin-right: 2%; font-size: 20px;' href='${url}' class='fas fa-download'></a></span></div>`;
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
                document.getElementById("secondaryOptionsDiv").style.display = "none";
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
