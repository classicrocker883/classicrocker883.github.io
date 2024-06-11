---
# the default layout is 'page'
icon: fas fa-info-circle
order: 7
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Downloader</title>
</head>
<body>
    <label for="model">Model:</label>
    <select id="model" onchange="updateModelSelections()">
        <option value="">None</option>
        <option value="Aquila">Aquila</option>
        <option value="Aquila X3">Aquila X3</option>
        <option value="HC32">HC32</option>
        <option value="Ender">Ender-3V2/S1</option>
    </select>
    <br>
    <label for="proUIExtraFeatures">ProUI Extra Features:</label>
    <select id="proUIExtraFeatures" onchange="updateCandidates()">
        <option value="">No</option>
        <option value="-ProUI-EX">Yes</option>
    </select>
    <br>
    <label for="screen">Screen:</label>
    <select id="screen" onchange="updateCandidates()">
        <option value="None">None</option>
        <option value="">DWIN</option>
        <option value="TJC-">TJC</option>
        <option value="C2-">12864</option>
    </select>
    <br>
    <label for="type">Type:</label>
    <select id="type" onchange="updateCandidates()">
        <option value="">None</option>
        <option value="_422">422</option>
        <option value="_427">427</option>
        <option value="_GD32">GD32</option>
        <option value="_N32">N32</option>
        <option value="HC32">HC32</option>
        <option value="_SKR-Mini-E3-">SKR</option>
    </select>
    <br>
    <label for="features">Features:</label>
    <select id="features" onchange="updateCandidates()">
        <option value="">None</option>
        <option value="_BMP">BIQU MicroProbe V2</option>
        <option value="_IND">Induction Probe</option>
        <option value="_SPRT13">Creality Sprite</option>
    </select>
    <br>
    <div id="secondaryFeaturesDiv" style="display: none;">
        <label for="secondaryFeatures">Secondary Features:</label>
        <select id="secondaryFeatures" onchange="updateCandidates()">
            <option value="">None</option>
            <option value="_BMP">BIQU MicroProbe V2</option>
        </select>
        <br>
    </div>
    <label for="leveling">Leveling:</label>
    <select id="leveling" onchange="updateCandidates()">
        <option value="">None</option>
        <option value="_Default">Default</option>
        <option value="_BLT">Bilinear Bed Leveling</option>
        <option value="_UBL">Unified Bed Leveling</option>
        <option value="_MM">Manual Mesh</option>
    </select>
    <br>
    <label for="options">Options:</label>
    <select id="options" onchange="updateCandidates()">
        <option value="">None</option>
        <option value="-MPC">MPC</option>
        <option value="-IS">Input Shaping</option>
    </select>
    <br>
    <label for="secondaryOptions">Secondary Options:</label>
    <select id="secondaryOptions" onchange="updateCandidates()">
        <option value="">None</option>
        <option value="-MPC">MPC</option>
    </select>
    <br>
    <button onclick="resetSelections()">Reset</button>
    <div id="candidates"></div>
    <script>
        async function fetchReleaseData(url) {
            const response = await fetch(url);
            const data = await response.json();
            return data.assets;
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
            let assets;
            if (model === "HC32" || type === "HC32") {
                screen = (screen === "C2-") ? "C2-" : (screen === "") ? "HC32" : "";
                assets = await fetchReleaseData('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/2.1.3f-5-HC32-2');
            } else if (model === "Ender") {
                screen = (screen === "") ? "Ender" : screen;
                assets = await fetchReleaseData('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/tags/2.1.3f-5-ender3-2');
            } else {
                screen = (screen === "") ? "Aquila" : screen;
                assets = await fetchReleaseData('https://api.github.com/repos/classicrocker883/MRiscoCProUI/releases/latest');
            }
            linkPrefix = screen;
            const candidates = [];
            assets.forEach(asset => {
                const name = asset.name;
                if (features === "") {
                    if (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13")) {
                        return; // Skip this asset
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
                    const filename = url.substring(url.lastIndexOf('/') + 1); // Extract filename from URL
                    candidates.push({ url: url, filename: filename }); // Store both URL and filename
                }
            });
            const candidatesList = document.getElementById("candidates");
            candidatesList.innerHTML = "<strong>Candidates:</strong><br>";
            if (candidates.length > 0) {
                candidates.forEach(candidate => {
                    candidatesList.innerHTML += "<a href='" + candidate.url + "'>" + candidate.filename + "</a><br>"; // Display filename instead of full URL
                });
            } else {
                candidatesList.textContent = "No candidates found.";
            }
        }
        function updateModelSelections() {
            const model = document.getElementById("model").value;
            clearSelections(); // Clear previous selections except for model
            if (model === "Aquila X3") {
                features.value = "_IND"; // Induction Probe
                document.getElementById("screen").selectedIndex = 1;
            } else if (model === "Aquila") {
                type.value = "_GD32"; // GD32
                document.getElementById("screen").selectedIndex = 1;
            } else if (model === "HC32") {
                type.value = "HC32"; // Set appropriate value for HC32
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
        window.onload = updateCandidates;
    </script>
</body>
</html>
