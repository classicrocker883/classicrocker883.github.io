---
# the default layout is 'page'
layout: default
title: Firmware Selector
show_title: false
icon: fas fa-code-compare
order: 1
permalink: /firmware-selector
---

<html>
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
            background-color: #f9f9f9;
            font-size: 18px;
            color: #333;
        }
        .candidate-row{
            flex: 0 0 auto;
            display: list-item;
            border: 2px solid #ccc;
            width: 60%;
        }
    </style>
    <h1><i class="fas fa-code-compare"></i> Firmware Selector</h1>
    <p>Version information below</p>
    <hr>
</head>
<div class="form-row">
    <div class="label-container">
        <label for="model">Model:</label>
    </div>
    <div class="select-container">
        <select id="model" onchange="updateModelSelections()">
            <option value="">None</option>
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
            <option value="-ProUI-EX">Yes</option>
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
            <option value="None">None</option>
            <option value="">DWIN</option>
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
            <option value="">None</option>
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
            <option value="">None</option>
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
            <option value="">None</option>
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
            <option value="">None</option>
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
            <option value="">None</option>
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
            <option value="">None</option>
            <option value="-MPC">MPC</option>
        </select>
    </div>
</div>
<br>
<button id="resetButton">Reset</button>
<hr>
<p><div id="candidates"></div></p>
<body>
<h3>📚 Versions</h3>
<hr>
<p>Some versions <i>do</i> have options like Power-loss Recovery despite not having it in the file name.<br>
Board types <b>422</b>, <b>427</b>, and leveling options <b>Default</b>, and <b>Manual Mesh</b> should have this and other options enabled.</p>
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
        async function fetchReleaseData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.assets;
            } catch (error) {
                console.error('Error fetching release data:', error);
                return [];
            }
        }
        async function updateCandidates() {
            const model = document.getElementById("model").value;
            let screen = document.getElementById("screen").value;
            const type = document.getElementById("type").value;
            const features = document.getElementById("features").value;
            const secondaryFeatures = document.getElementById("secondaryFeatures").value;
            const leveling = document.getElementById("leveling").value;
            const options = document.getElementById("options").value;
            const secondaryOptions = document.getElementById("secondaryOptions").value;
            const proUIExtraFeatures = document.getElementById("proUIExtraFeatures").value;
            const secondaryFeaturesDiv = document.getElementById("secondaryFeaturesDiv");
            secondaryFeaturesDiv.style.display = (features === "_SPRT13") ? "block" : "none";
            let linkPrefix = "";
            let assets = [];
            if (model === "HC32" || type === "HC32") {
                if (screen === "C2-") {
                    screen = "C2-";
                } else if (screen === "") {
                    screen = "HC32";
                } else if (screen === "None") {
                    screen = "";
                }
                assets = await fetchReleaseData('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/2.1.3f-5-HC32-2');
            } else if (model === "Ender") {
                if (screen === "") {
                    screen = "Ender";
                }
                assets = await fetchReleaseData('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/2.1.3f-5-ender3-2');
            } else {
                if (screen === "") {
                    screen = "Aquila";
                }
                assets = await fetchReleaseData('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/latest');
            }
            linkPrefix = screen;
            const candidates = [];
            assets.forEach(asset => {
                const name = asset.name;
                if (features === "") {
                    if (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13")) {
                        return;
                    }
                }
                if (proUIExtraFeatures === "") {
                    if (name.includes("-ProUI-EX")) {
                        return;
                    }
                }
                if (
                    name.startsWith(linkPrefix) &&
                    (type === "" || name.includes(type)) &&
                    (features === "" || name.includes(features)) &&
                    (secondaryFeatures === "" || name.includes(secondaryFeatures)) &&
                    (leveling === "" || name.includes(leveling)) &&
                    (options === "" || name.includes(options)) &&
                    (secondaryOptions === "" || name.includes(secondaryOptions)) &&
                    (proUIExtraFeatures === "" || name.includes(proUIExtraFeatures))
                ) {
                    const url = asset.browser_download_url;
                    const filename = url.substring(url.lastIndexOf('/') + 1);
                    candidates.push({ url: url, filename: filename });
                }
            });
            const candidatesList = document.getElementById("candidates");
            candidatesList.innerHTML = '<a class="fas fa-download"></a><strong> Candidates:</strong><br>';
            if (candidates.length > 0) {
                candidates.forEach(candidate => {
                    candidatesList.innerHTML += "<a href='" + candidate.url + "'><div class='candidate-row'>" + candidate.filename + "</div></a>";
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
            document.getElementById("screen").selectedIndex = 0;
            document.getElementById("type").selectedIndex = 0;
            document.getElementById("features").selectedIndex = 0;
            document.getElementById("secondaryFeatures").selectedIndex = 0;
            document.getElementById("leveling").selectedIndex = 0;
            document.getElementById("options").selectedIndex = 0;
            document.getElementById("secondaryOptions").selectedIndex = 0;
            document.getElementById("proUIExtraFeatures").selectedIndex = 0;
            document.getElementById("secondaryFeaturesDiv").style.display = "none";
        }
        function resetSelections() {
            document.getElementById("model").selectedIndex = 0;
            clearSelections();
            updateCandidates();
        }
        document.getElementById("model").addEventListener('change', updateModelSelections);
        document.getElementById("screen").addEventListener('change', updateCandidates);
        document.getElementById("type").addEventListener('change', updateCandidates);
        document.getElementById("features").addEventListener('change', updateCandidates);
        document.getElementById("secondaryFeatures").addEventListener('change', updateCandidates);
        document.getElementById("leveling").addEventListener('change', updateCandidates);
        document.getElementById("options").addEventListener('change', updateCandidates);
        document.getElementById("secondaryOptions").addEventListener('change', updateCandidates);
        document.getElementById("proUIExtraFeatures").addEventListener('change', updateCandidates);
        document.getElementById("resetButton").addEventListener('click', resetSelections);
        updateCandidates();
    });
</script>
</body>
</html>