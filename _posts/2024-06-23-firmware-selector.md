---
title: Firmware Selector
description: >-
    Firmware Selection.
author: ClassicRocker883
permalink: /firmware
date: 2025-01-01 00:00:00 -0400
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
            text-align: center;
            width: 11em;
            padding: 2px;
            border: 1px solid #ccc;
            border-radius: 2px;
            background-color: #333;
            font-size: 18px;
            color: #f9f9f9;
        }
        select:disabled {
            background-color: #555;
            color: #aaa;
        }
        .candidates-row {
            padding-left: 1%;
            flex: 0 0 auto;
            display: list-item;
            border: 2px solid #333;
            width: 110%;
        }
        .candidates-list-container {
            display: flex 0 0;
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
        }
        .candidates-header-text {
            justify-content: center;
            align-items: center;
            text-align: center;
            display: flex;
            font-size: 20px;
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
    <h3 class="center" style=""><a href="#versions">Version information below</a></h3>
    <div style="display: flex; justify-content: center;"><img alt="Firmware Selector Logo"
            src="https://classicrocker883.github.io/assets/img/firmware-selector.png" width="200" height="200">
    </div>
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
            <label for="broadenSearch"><i class="icon fas fa-magnifying-glass-plus"></i> Broaden Search Results?</label>
        </div>
        <div class="select-container">
            <select id="broadenSearch" onchange="updateCandidates()">
                <option value="Yes" title="Use broader filtering">Yes</option>
                <option value="No" title="Use strict filtering">No</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="label-container">
            <label for="model"><i class="icon fas fa-cubes"></i> Model:</label>
        </div>
        <div class="select-container">
            <select id="model" onchange="updateModelSelections()">
                <option value="none" title="May help to choose a model first">--Select Model--</option>
                <option value="Aquila" title="Aquila OG/X2">Aquila</option>
                <option value="Aquila X3" title="Aquila X3/S3 Induction Probe">Aquila X3/S3</option>
                <option value="C2" title="Monochrome LCD Display">Aquila C2</option>
                <option value="HC32" title="H32 Chipset">HC32</option>
                <option value="Ender" title="Ender-3 V2/S1">Ender-3 V2/S1</option>
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
                <option value="C2" title="C2 (Monochrome LCD Display)">12864 Monochrome</option>
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
                <option value="_HC32" title="HC32">HC32</option>
                <option value="_427" title="_427">Creality 4.2.7</option>
                <option value="_422" title="_422">Creality 4.2.2</option>
                <option value="-S1-F1" title="-S1-F1">Ender-3 S1 F103</option>
                <option value="-S1-F4" title="-S1-F4">Ender-3 S1 F401</option>
                <option value="_E3-Free-runs" title="_E3-Free-runs">Creality E3 Free-runs</option>
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
                <option value="none" title="No specific features">--Select--</option>
                <option value="" title="Bed Probe Only">CR/3D/BL-Touch Only</option>
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
    <div class="candidates-header-text">
        <a href="#" style="font-size: 26px;" class="icon fas fa-rectangle-list"></a><strong>&nbsp;Candidates:</strong><br>
    </div>
    <br>
    <div class="candidates-list-container">
        <table id="versionsTable">
            <thead>
                <tr>
                    <th id="candidates"></th>
                </tr>
            </thead>
        </table>
    </div>
    <hr>
    <br>
    <h2>🖥️ Display Assets</h2>
    <hr>
    <div>
        <ul>
            <li>
                <b>TJC Screen Assets</b> <img src="https://cdn-icons-png.flaticon.com/128/4298/4298296.png" alt="touchscreen" style="width: 20px; height: auto; vertical-align: top;"><br>
                <a href="https://github.com/classicrocker883/MRiscoCProUI/blob/HEAD/display%20assets/tjc_update.zip?raw=true" rel="nofollow">📲Click to Download <code>tjc_update.zip</code><br>
                </a>
                (for TJC screen update if you haven't already)
                <p></p>
            </li>
            <br>
            <li>
                <a href="https://downgit.github.io/#/home?url=https://github.com/classicrocker883/MRiscoCProUI/tree/HEAD/display%20assets/Aquila%20Display%20Firmware/Firmware%20Sets" rel="nofollow">
                    <b>Aquila LCD Display Assets</b> 🗂️<br>
                    <img src="https://github.com/classicrocker883/MRiscoCProUI/assets/18502096/30ed1822-e5d5-4be5-9283-636390933178" style="width: 150px; height: auto;" alt="Aquila LCD Display Assets" />
                </a>
                <p></p>
            </li>
            <br>
            <li>
                <b>Creality LCD Display Assets</b><br>
                <img src="https://raw.githubusercontent.com/mriscoc/Ender3V2S1/Ender3V2S1-Released/screenshots/main.jpg" style="width: 150px; height: auto;" alt="Creality LCD Display Assets" />
                <p>
                    <a href="https://downgit.github.io/#/home?url=https://github.com/classicrocker883/MRiscoCProUI/tree/HEAD/display%20assets/Creality%20Display%20Firmware/DWIN_SET" rel="nofollow">🗂️Click to Download DWIN_SET (for DWIN screen units)</a><br>
                    <a href="https://downgit.github.io/#/home?url=https://github.com/classicrocker883/MRiscoCProUI/tree/HEAD/display%20assets/Creality%20Display%20Firmware/private" rel="nofollow">📲Click to Download private (for DACAI screen units)</a>
                <p></p>
                </p>
            </li>
            <br>
            <li>
                <b>Giadej LCD Display Assets</b><br>
                <img src="https://github.com/classicrocker883/MRiscoCProUI/raw/2025-January/display%20assets/Giadej%20compilation/preview1.jpg" style="width: 150px; height: auto;" alt="Giadej LCD Display Assets" />
                <p>
                    <a href="https://downgit.github.io/#/home?url=https://github.com/classicrocker883/MRiscoCProUI/tree/HEAD/display%20assets/Giadej%20compilation/DWIN_SET" rel="nofollow">🗂️Click to Download DWIN_SET (for DWIN screen units)</a><br>
                    <a href="https://downgit.github.io/#/home?url=https://github.com/classicrocker883/MRiscoCProUI/tree/HEAD/display%20assets/Giadej%20compilation/private" rel="nofollow">📲Click to Download private (for DACAI screen units)</a>
                    <p></p>
                </p>
            </li>
        </ul>
    </div>
    <br>
    <h2 id="versions">📚 Versions</h2>
    <hr>
    <p>Most versions <i>now</i> include options like <code>POWER_LOSS_RECOVERY</code>, even if it's not listed in the filename.<br>
        This remains selectable for older firmware only.<br>
        Board types <b>422</b>/<b>427</b> and leveling options <b>Default</b>/<b>Manual Mesh</b> should have additional features enabled,
        which may not be available in base <b>UBL</b>/<b>BLT</b> <b>ProUI-EX</b> versions due to memory space limitations.
    </p>
    <p>There are no significant differences in firmware compatibility between models. For example, a Creality 4.2.7
        board for an Aquila will work on an Ender-3 V2/S1.<br>
        The differences are mainly in color schemes and naming — whether it's a <b>Creality Ender</b> or <b>Voxelab Aquila</b>.
    </p>
    <p>Boards like <i>Creality E3 Free-runs</i> and <i>Ender-3 S1 F103</i> / <i>Ender-3 S1 F401</i> are currently only selectable under the
        <b>Ender-3 V2/S1</b> model.<br>
        The <i>BTT SKR Mini E3</i> is available under both models and will work in either case.
    </p>
    <p>If you are using a 12864 Monochrome Display, it is only listed under Model <b>C2</b>.<br>
        This is because the <b>Voxelab Aquila C2</b> exclusively uses <i>only</i> this type of LCD.<br>
        While the firmware can be used on an <b>Ender-3</b>/<b>Pro</b>, it is recommended to use official or alternative firmware.
    </p>
    <dl>
        <dt>
            <h2>Here are the current configurations offered:</h2>
        </dt>
    </dl>
    <h3>Bed Leveling Options</h3>
    <ul>
        <li><b>[ _Default-NP ]</b>: Use if you have a near stock machine
            <br><sup>Default No Probe</sup>
        </li>
        <li><b>[ _MM ]</b>: Create a bed mesh without an auto bed probe
            <br><sup><a href="https://marlinfw.org/docs/gcode/G029-mbl.html" rel="nofollow">Manual Mesh Bed
                    Leveling</a></sup>
        </li>
        <li><b>[ _BLT ]</b>: Use if you have a CR/3D/BL-Touch level sensor installed.
            <br><sup><a href="https://marlinfw.org/docs/features/auto_bed_leveling.html" rel="nofollow">Bilinear Auto
                    Bed Leveling</a></sup>
        </li>
        <li><b>[ _UBL ]</b>: Similar to both MM and BLT - with more options. Recommended over BLT
            <br><sup><a href="https://marlinfw.org/docs/features/unified_bed_leveling.html" rel="nofollow">Unified Bed
                    Leveling</a></sup>
        </li>
    </ul>
    <h3>Special Versions</h3>
    <dl>
        <dt><sup>(List of file prefixes and suffixes)</sup></dt>
    </dl>
    <ul>
        <dd><ins><b>ProUI Extra Features</b></ins></dd>
        <li><b>[ -ProUI-EX ]</b><br> | Toolbar, change bed physical dimensions | (Change other special
            features and options without having to reflash)
        </li>
        <p></p>
        <dd><ins><b>Creality Ender-3 V2/S1 Only Options</b></ins></dd>
        <li><b>[ _E3-Free-runs ]</b><br> | Creality E3 Free-runs | (Creality board - TMC2209 drivers)
        </li>
        <li><b>[ -S1-&lt;F1/F4&gt; ]</b><br> | Creality Ender-3 S1 | (Check to see whether you have <b>F1</b> or
            <b>F4</b>)
            <dd>
                <i>-S1-F1</i>: &ensp;<code>STM32F103RC</code> chip and <code>CREALITY_V24S1_301</code> board
                <br><i>-S1-F4</i>: &ensp;<code>STM32F401RC</code> chip and <code>CREALITY_V24S1_301F4</code> board
            </dd>
        </li>
        <p></p>
        <dd><ins><b>BTT SKR Mini E3 Options</b></ins></dd>
        <li><b>[ _SKR-Mini-E3- ]</b><br> | BTT SKR Mini E3 | (V2.0, V3.0, V3.0.1)</li>
        <dd>
            <i>V2</i>: &ensp;<code>STM32F103RC</code> chip<br>
            <i>V3</i>: &ensp;<code>STM32G0B1RE</code> chip<br>
            <i>V3_0_1</i>: &ensp;<code>STM32F401RC</code> chip
        </dd>
        <p></p>
        <dd><ins><b>LCD Displays</b></ins></dd>
        <li><b>[ DWIN ]</b><br> | Stock DWIN LCD | (No actual prefix)</li>
        <li><b>[ TJC- ]</b><br> | Creality TJC LCD | (As aftermarket or sometimes used in stock Creality machines)</li>
        <li><b>[ C2_ ]</b><br> | Monochrome 128x64 LCD | (Model: <b>C2</b> only! Used in Aquila C2 and original Ender-3/CR-10)
            <p><sup>This has <b>NO</b> ProUI capabilities</sup></p>
        </li>
        <p></p>
        <dd><ins><b>Features</b></ins></dd>
        <li><b>[ _SPRT13 ]</b><br> | Sprite Extruder | (Uses thermistor # 13)</li>
        <li><b>[ _SPDY5 ]</b><br> | Spider Speedy Hotend | (Uses thermistor # 5)</li>
        <li><b>[ _IND ]</b><br> | Inductive Sensor | (Probe used on <b>X3</b>/<b>S3</b> models)<br>
            <b>CAUTION</b>: You may need to adjust the <ins>Probe Y Offset</ins> to <b>-20</b> or <b>-25</b> on an
            <b>S3</b>
        </li>
        <li><b>[ _BMP ]</b><br> | BIQU MicroProbe V2.0 | (Alternative to <b>CR</b>/<b>3D</b>/<b>BL</b>/-<b>Touch</b>)
        </li>
        <sup>Use <b>ONLY</b> this firmware with <i>_BMP</i> if you <b>DO</b> have this probe</sup>
        <p></p>
        <dd><ins><b>Options</b></ins></dd>
        <li><b>[ -IS ]</b><br> | Input Shaping | (Similar to <b>Linear Advance</b>)</li>
        <sup>Use <b>ONLY</b> if you mean to do the initial calibration✶</sup>
        <li><b>[ -MPC ]</b><br> | MPC Autotune | (Replaces <b>PID</b> for hotend)</li>
        <li><b>[ -PLR ]</b><br> | Power-Loss Recovery | (Resumes where a print job left off when there is a <i>power
                outage</i>)</li>
    </ul>
    <sup>✶Reminder: Do not use `Input Shaping` (file suffix <i>-IS</i>) <b>unless</b> you do the necessary
        calibration.<br>
        Prints will be effected regardless. May require a special breakout board or test prints to calibrate.
    </sup>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const selectMonth = document.getElementById("month-select");
            const releaseContainer = document.getElementById("releases-container");
            const releaseList = document.getElementById("release-list");
            const selectedReleaseTagDiv = document.getElementById("selected-release-tag");
            const resetButton = document.getElementById("resetButton");
            const totalDownloads = document.getElementById("total-downloads");
            let releaseTag = "latest";
            const repoUrl = '/assets/data/releases.json';
            let allReleasesData = [];
            let proUIExtraFeaturesWasForcedToNo = false;
            async function fetchAllReleases(url) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching local releases data:", error);
                    return [];
                }
            }
            async function fetchLatestReleaseDetails() {
                try {
                    const response = await fetch('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/latest');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching latest release from GitHub API:", error);
                    return null;
                }
            }
            function formatMonthYear(date) {
                return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" });
            }
            function getReleaseMonths(releases) {
                const months = new Set();
                releases.forEach(release => months.add(formatMonthYear(release.published_at)));
                return Array.from(months).sort((a, b) => new Date(b) - new Date(a));
            }
            function splitTag(tag) {
                const regex = /^(\d+\.\d+\.\d+[a-z]*)(?:-(-?\d+))?(?:-(C2|HC32|ender3))?(?:-(-?\d+[a-z]*))?$/;
                const match = tag.match(regex);
                return {
                    version: match ? match[1] : "",
                    month: match ? match[2] : "",
                    model: match ? match[3] : "",
                    revision: match ? match[4] : ""
                };
            }
            function createCheckbox(release) {
                const label = document.createElement("label");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = release.tag_name;
                checkbox.name = "release";
                checkbox.addEventListener("change", (event) => {
                    if (event.target.checked) {
                        releaseTag = `tags/${event.target.value}`;
                        document.querySelectorAll('input[name="release"]').forEach(otherCheckbox => {
                            if (otherCheckbox !== event.target) otherCheckbox.checked = false;
                        });
                    } else {
                        if (document.querySelectorAll('input[name="release"]:checked').length === 0) {
                            releaseTag = "latest";
                            selectMonth.value = "latest";
                        }
                    }
                    updateSelectedReleaseTag();
                    updateCandidates();
                });
                label.append(checkbox, release.name);
                releaseList.appendChild(label);
            }
            async function updateSelectedReleaseTag() {
                let currentBaseTag = releaseTag.replace("tags/", "");
                const selectedModelDropdownValue = document.getElementById("model").value;
                const selectedScreenDropdownValue = document.getElementById("screen").value;
                let actualBaseTagName = currentBaseTag;
                if (currentBaseTag === "latest") {
                    const latestRelease = await fetchLatestReleaseDetails();
                    if (latestRelease) {
                        actualBaseTagName = latestRelease.tag_name;
                    } else {
                        console.error("Could not determine actual latest release tag.");
                        selectedReleaseTagDiv.textContent = "Error loading tag";
                        totalDownloads.innerHTML = `<label><img alt='GitHub Downloads (all assets)' src='https://img.shields.io/github/downloads/classicrocker883/MRiscoCProUI/latest/total'> - Total</label>`;
                        return;
                    }
                }
                let splitParts = splitTag(actualBaseTagName);
                let modelSuffixToApply = "";
                if (selectedModelDropdownValue === "C2" || selectedScreenDropdownValue === "C2") {
                    modelSuffixToApply = "C2";
                } else if (selectedModelDropdownValue === "Ender") {
                    modelSuffixToApply = "ender3";
                } else if (selectedModelDropdownValue === "Aquila X3" || selectedModelDropdownValue === "Aquila") {
                    modelSuffixToApply = "";
                } else if (selectedModelDropdownValue) {
                    modelSuffixToApply = selectedModelDropdownValue;
                }
                if (modelSuffixToApply) {
                    splitParts.model = modelSuffixToApply;
                } else {
                    splitParts.model = "";
                }
                let displayTag = splitParts.version;
                if (splitParts.month) {
                    displayTag += `-${splitParts.month}`;
                }
                if (splitParts.model) {
                    displayTag += `-${splitParts.model}`;
                }
                if (splitParts.revision) {
                    displayTag += `-${splitParts.revision}`;
                }
                selectedReleaseTagDiv.textContent = displayTag;
                const badgeTag = currentBaseTag === "latest" ? "latest" : actualBaseTagName;
                totalDownloads.innerHTML = `<label><img alt='GitHub Downloads (all assets)' src='https://img.shields.io/github/downloads/classicrocker883/MRiscoCProUI/${badgeTag}/total'> - Total</label>`;
            }
            function fetchReleasesByMonth(month, releases) {
                const filteredReleases = releases.filter(release => formatMonthYear(release.published_at) === month);
                releaseList.innerHTML = "";
                if (filteredReleases.length > 0) {
                    filteredReleases.forEach(createCheckbox);
                    releaseContainer.style.display = "block";
                } else {
                    releaseList.textContent = "No releases found for this month.";
                    releaseContainer.style.display = "none";
                }
            }
            function populateMonthOptions(releaseMonths) {
                selectMonth.innerHTML = '<option value="latest" title="The most recent release version">Latest Release</option>';
                releaseMonths.forEach(month => {
                    const option = document.createElement("option");
                    option.value = month;
                    option.textContent = month;
                    selectMonth.appendChild(option);
                });
            }
            async function initializeDropdowns() {
                try {
                    allReleasesData = await fetchAllReleases(repoUrl);
                    if (allReleasesData.length > 0) {
                        const releaseMonths = getReleaseMonths(allReleasesData);
                        populateMonthOptions(releaseMonths);
                    } else {
                        console.warn("No local release data loaded. Month dropdown may not populate fully.");
                        selectMonth.innerHTML = '<option value="latest">Error Loading Releases</option>';
                    }
                    selectMonth.value = "latest";
                    releaseTag = "latest";
                    await updateCandidates();
                    updateSelectedReleaseTag();
                } catch (error) {
                    console.error("Error initializing dropdowns:", error);
                }
            }
            async function fetchReleaseData(model) {
                const currentReleaseTag = releaseTag.replace("tags/", "");
                const selectedRelease = allReleasesData.find(release =>
                    release.tag_name === currentReleaseTag ||
                    (currentReleaseTag === "latest" && release.tag_name === (allReleasesData.length > 0 ? allReleasesData[0].tag_name : null))
                );
                if (!selectedRelease) {
                    console.error("Selected release not found in local data:", currentReleaseTag);
                    return [];
                }
                const extractedTag = selectedRelease.tag_name;
                const split = splitTag(extractedTag);
                const type = document.getElementById("type").value;
                if (model === "HC32") {
                    split.model = "HC32";
                } else if (model === "Ender") {
                    split.model = "ender3";
                } else if (model === "C2") {
                    split.model = "C2";
                } else if (model === "Aquila X3" || model === "Aquila") {
                    split.model = "";
                }
                const tag = `${split.version}${split.month ? '-' + split.month : ''}${split.model ? '-' + split.model : ''}${split.revision ? '-' + split.revision : ''}`;
                const apiUrl = `https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/${tag}`;
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    return data.assets || [];
                } catch (error) {
                    console.error("Error fetching release assets:", error);
                    return [];
                }
                return selectedRelease.assets || [];
            }
            async function updateCandidates() {
                const model = document.getElementById("model").value;
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
                const broadenSearch = document.getElementById("broadenSearch").value;
                const modelSelect = document.getElementById("model");
                const screenSelect = document.getElementById("screen");
                const proUIEXSelect = document.getElementById("proUIExtraFeatures");
                let effectiveModel = model;
                if (model === "Aquila X3") {
                    effectiveModel = "Aquila";
                }
                let effectiveFeaturesForDisplay = features;
                if (features === "none" && broadenSearch === "Yes") {
                    effectiveFeaturesForDisplay = "";
                }
                secondaryFeaturesDiv.style.display = (effectiveFeaturesForDisplay === "_SPRT13" || effectiveFeaturesForDisplay === "_SPDY5" || effectiveFeaturesForDisplay === "_BMP" || effectiveFeaturesForDisplay === "_IND") ? "block" : "none";
                secondaryOptionsDiv.style.display = (options === "-MPC" || options === "-IS" || options === "-PLR") ? "block" : "none";
                secondaryFeaturesSelect.innerHTML = '<option value="" title="No specific secondary feature">--Select--</option>';
                if (effectiveFeaturesForDisplay === "_SPRT13") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_BMP" title="_BMP">BIQU MicroProbe V2</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_IND" title="_IND">Induction Probe</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPDY5" title="_SPDY5">Creality Spider Speedy</option>';
                } else if (effectiveFeaturesForDisplay === "_SPDY5") {
                    secondaryFeaturesSelect.innerHTML += '<option value="_BMP" title="_BMP">BIQU MicroProbe V2</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_IND" title="_IND">Induction Probe</option>';
                    secondaryFeaturesSelect.innerHTML += '<option value="_SPRT13" title="_SPRT13">Creality Sprite</option>';
                } else if (effectiveFeaturesForDisplay === "_BMP" || effectiveFeaturesForDisplay === "_IND") {
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
                if (model === "C2" || screen === "C2" || leveling === "_Default") {
                    proUIEXSelect.value = "";
                    proUIEXSelect.disabled = true;
                    proUIExtraFeaturesWasForcedToNo = true;
                } else {
                    proUIEXSelect.disabled = false;
                    if (proUIExtraFeaturesWasForcedToNo) {
                        proUIEXSelect.value = "-ProUI";
                        proUIExtraFeaturesWasForcedToNo = false;
                    }
                }
                if (screen === "C2") {
                    modelSelect.value = "C2";
                    screenSelect.disabled = true;
                } else if (model === "C2") {
                    screenSelect.value = "C2";
                    screenSelect.disabled = true;
                } else {
                    screenSelect.disabled = false;
                }
                let linkPrefix = "";
                const screenMap = {
                    "C2": { "default": "C2" },
                    "HC32": { "TJC-": "TJC-HC32", "default": "HC32" },
                    "Ender": { "TJC-": "TJC-Ender", "default": "Ender" },
                    "default": { "TJC-": "TJC-Aquila", "default": "Aquila" }
                };
                if (effectiveModel === "C2" || screen === "C2") {
                    linkPrefix = screenMap["C2"][screen] || screenMap["C2"]["default"];
                } else if (effectiveModel === "HC32") {
                    linkPrefix = screenMap["HC32"][screen] || screenMap["HC32"]["default"];
                } else if (effectiveModel === "Ender") {
                    linkPrefix = screenMap["Ender"][screen] || screenMap["Ender"]["default"];
                } else if (effectiveModel === "Aquila") {
                    linkPrefix = screenMap["default"][screen] || screenMap["default"]["default"];
                } else {
                    linkPrefix = null;
                }
                const assets = await fetchReleaseData(model);
                let filteredCandidates = [];
                const currentProUIExtraFeatures = document.getElementById("proUIExtraFeatures").value;
                const broadenFilterLogic = (assetName) => {
                    if (!assetName.startsWith(linkPrefix)) return false;
                    if (type && !assetName.includes(type)) return false;
                    if (broadenSearch === "Yes") {
                        if (features === "none") {
                        } else if (features === "") {
                            const forbiddenSuffixes = ["_BMP", "_IND", "_SPRT13", "_SPDY5"];
                            for (const suffix of forbiddenSuffixes) {
                                if (assetName.includes(suffix)) {
                                    return false;
                                }
                            }
                        } else {
                            if (!assetName.includes(features)) {
                                return false;
                            }
                        }
                    } else {
                        const allFeaturesSuffixes = ["_BMP", "_IND", "_SPRT13", "_SPDY5"];
                        if (features === "none" || features === "") {
                            for (const suffix of allFeaturesSuffixes) {
                                if (assetName.includes(suffix)) {
                                    return false;
                                }
                            }
                        } else if (!assetName.includes(features)) {
                            return false;
                        }
                    }
                    if (secondaryFeatures && !assetName.includes(secondaryFeatures)) return false;
                    if (leveling && !assetName.includes(leveling)) return false;
                    if (options && !assetName.includes(options)) return false;
                    if (secondaryOptions && !assetName.includes(secondaryOptions)) return false;
                    if (currentProUIExtraFeatures === "" && assetName.includes("-ProUI")) {
                        return false;
                    }
                    if (currentProUIExtraFeatures === "-ProUI" && !assetName.includes("-ProUI")) {
                        return false;
                    }
                    return true;
                };
                const specificFilterLogic = (assetName) => {
                    if (!assetName.startsWith(linkPrefix)) return false;
                    if (type && !assetName.includes(type)) return false;
                    if (secondaryFeatures && !assetName.includes(secondaryFeatures)) return false;
                    if (leveling && !assetName.includes(leveling)) return false;
                    if (options && !assetName.includes(options)) return false;
                    if (secondaryOptions && !assetName.includes(secondaryOptions)) return false;
                    const allFeatures = ["_BMP", "_IND", "_SPRT13", "_SPDY5"];
                    if (features === "none" || features === "") {
                        for (const f of allFeatures) {
                            if (assetName.includes(f)) return false;
                        }
                    } else if (!assetName.includes(features)) {
                        return false;
                    }
                    const allTypes = ["_GD32", "_N32", "HC32", "_427", "_422", "-S1-F1", "-S1-F4", "_SKR-Mini-E3-", "_E3-Free-runs"];
                    for (const t of allTypes) {
                        if (type !== t && assetName.includes(t)) return false;
                    }
                    if (features === "_SPRT13" && secondaryFeatures === "") {
                        if (assetName.includes("_BMP") || assetName.includes("_IND") || assetName.includes("_SPDY5")) return false;
                    }
                    if (features === "_SPDY5" && secondaryFeatures === "") {
                        if (assetName.includes("_BMP") || assetName.includes("_IND") || assetName.includes("_SPRT13")) return false;
                    }
                    if ((features === "_BMP" || features === "_IND") && secondaryFeatures === "") {
                        if (assetName.includes("_SPRT13") || assetName.includes("_SPDY5")) return false;
                    }
                    const allLeveling = ["_UBL", "_BLT", "_MM", "_Default"];
                    for (const l of allLeveling) {
                        if (leveling !== l && assetName.includes(l)) return false;
                    }
                    const allOptions = ["-MPC", "-IS", "-PLR"];
                    if (options === "") {
                        for (const o of allOptions) {
                            if (assetName.includes(o)) return false;
                        }
                    } else {
                        if (options === "-MPC" && secondaryOptions === "") {
                            if (assetName.includes("-IS") || assetName.includes("-PLR")) return false;
                        }
                        if (options === "-IS" && secondaryOptions === "") {
                            if (assetName.includes("-MPC") || assetName.includes("-PLR")) return false;
                        }
                        if (options === "-PLR" && secondaryOptions === "") {
                            if (assetName.includes("-MPC") || assetName.includes("-IS")) return false;
                        }
                    }
                    if (currentProUIExtraFeatures === "" && assetName.includes("-ProUI")) {
                        return false;
                    }
                    if (currentProUIExtraFeatures === "-ProUI" && !assetName.includes("-ProUI")) {
                        return false;
                    }
                    return true;
                };
                if (broadenSearch === "Yes") {
                    filteredCandidates = assets.filter(asset => broadenFilterLogic(asset.name));
                } else {
                    filteredCandidates = assets.filter(asset => specificFilterLogic(asset.name));
                }
                const candidatesList = document.getElementById("candidates");
                candidatesList.innerHTML = "";
                if (filteredCandidates.length > 0) {
                    filteredCandidates.forEach(candidate => {
                        const url = candidate.browser_download_url;
                        const filename = url.substring(url.lastIndexOf('/') + 1);
                        candidatesList.innerHTML += `<div class='candidates-row'><span class='downloadcontainer'><span style='color: brown'>${filename}</span><a style='margin-left: auto; margin-right: 2%; font-size: 20px;' href='${url}' class='fas fa-download'></a></span></div>`;
                    });
                } else {
                    candidatesList.innerHTML = "No candidates found.";
                }
            }
            function updateModelSelections() {
                const model = document.getElementById("model").value;
                const screenSelect = document.getElementById("screen");
                const c2ScreenOption = screenSelect.querySelector('option[value="C2"]');
                const typeSelect = document.getElementById("type");
                const hc32TypeOption = typeSelect.querySelector('option[value="_HC32"]');
                const currentBroadenSearchValue = document.getElementById("broadenSearch").value;
                clearSelections();
                document.getElementById("broadenSearch").value = currentBroadenSearchValue;
                const modelPresets = {
                    "Aquila": { type: "_GD32", screen: "DWIN" },
                    "Aquila X3": { type: "_N32", features: "_IND", leveling: "_UBL", screen: "DWIN" },
                    "HC32": { type: "HC32", screen: "DWIN" },
                    "Ender": { type: "_422", screen: "DWIN" },
                    "C2": { type: "_HC32", screen: "C2" }
                };
                const preset = modelPresets[model];
                if (preset) {
                    if (preset.screen) screenSelect.value = preset.screen;
                    if (preset.type) document.getElementById("type").value = preset.type;
                    if (preset.features) document.getElementById("features").value = preset.features;
                    if (preset.leveling) document.getElementById("leveling").value = preset.leveling;
                }
                if (model === "C2") {
                    screenSelect.value = "C2";
                    screenSelect.disabled = true;
                } else {
                    screenSelect.disabled = false;
                }
                if (model === "HC32") {
                    typeSelect.value = "HC32";
                    typeSelect.disabled = true;
                    c2ScreenOption.disabled = true;
                } else {
                    c2ScreenOption.disabled = false;
                    typeSelect.disabled = false;
                }
                if (model === "Aquila" || model === "Aquila X3") {
                    hc32TypeOption.disabled = true;
                } else {
                    hc32TypeOption.disabled = false;
                }
                updateCandidates();
                updateSelectedReleaseTag();
            }
            function clearSelections() {
                document.querySelectorAll('#proUIExtraFeatures, #screen, #type, #features, #secondaryFeatures, #leveling, #options, #secondaryOptions').forEach(selection => selection.selectedIndex = 0);
                document.getElementById("secondaryFeaturesDiv").style.display = "none";
                document.getElementById("secondaryOptionsDiv").style.display = "none";
            }
            function resetSelections() {
                document.getElementById("model").selectedIndex = 0;
                clearSelections();
                document.getElementById("broadenSearch").value = "No";
                document.getElementById("screen").disabled = false;
                selectMonth.value = "latest";
                releaseTag = "latest";
                releaseContainer.style.display = "none";
                proUIExtraFeaturesWasForcedToNo = false;
                updateSelectedReleaseTag();
                updateCandidates();
            }
            document.getElementById("features").addEventListener("change", () => {
                document.getElementById("secondaryFeatures").value = "";
                updateCandidates();
            });
            document.getElementById("options").addEventListener("change", () => {
                document.getElementById("secondaryOptions").value = "";
                updateCandidates();
            });
            selectMonth.addEventListener("change", async (event) => {
                const selectedMonth = event.target.value;
                if (selectedMonth === "latest") {
                    releaseTag = "latest";
                    releaseContainer.style.display = "none";
                } else {
                    releaseTag = "";
                    fetchReleasesByMonth(selectedMonth, allReleasesData);
                }
                updateSelectedReleaseTag();
                await updateCandidates();
            });
            resetButton.addEventListener("mousedown", () => resetButton.style.animationPlayState = "running");
            resetButton.addEventListener("mouseup", () => resetButton.style.animationPlayState = "paused");
            resetButton.addEventListener("click", resetSelections);
            document.getElementById("model").addEventListener("change", updateModelSelections);
            document.querySelectorAll('#broadenSearch, #proUIExtraFeatures, #screen, #type, #features, #secondaryFeatures, #leveling, #options, #secondaryOptions').forEach(input => input.addEventListener("change", updateCandidates));
            initializeDropdowns();
        });
    </script>
</body>
</html>
