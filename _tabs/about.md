---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

<label for="model">Model:</label>
<select id="model" onchange="updateModelSelections()">
    <option value="">None</option>
    <option value="Aquila">Aquila</option>
    <option value="Aquila X3">Aquila X3</option>
    <option value="HC32">HC32</option>
    <option value="Ender">Ender-3V2/S1</option>
    <!-- Add more model options here -->
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
    <!-- Add more screen options here -->
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
    <option value="_SKR-Mini-E3-">SKR Mini E3</option>
    <!-- Add more type options here -->
</select>
<br>
<label for="features">Features:</label>
<select id="features" onchange="updateCandidates()">
    <option value="">None</option>
    <option value="_BMP">BIQU MicroProbe V2</option>
    <option value="_IND">Induction Probe</option>
    <option value="_SPRT13">Creality Sprite</option>
    <!-- Add feature options here -->
</select>
<br>
<div id="secondaryFeaturesDiv" style="display: none;">
    <label for="secondaryFeatures">Secondary Features:</label>
    <select id="secondaryFeatures" onchange="updateCandidates()">
        <option value="">None</option>
        <option value="_BMP">BIQU MicroProbe V2</option>
        <!-- Add more SKR version options here -->
    </select>
</div>
<br>
<label for="leveling">Leveling:</label>
<select id="leveling" onchange="updateCandidates()">
    <option value="">None</option>
    <option value="_Default">Default</option>
    <option value="_BLT">Bilinear Bed Leveling</option>
    <option value="_UBL">Unified Bed Leveling</option>
    <option value="_MM">Manual Mesh</option>
    <!-- Add more leveling options here -->
</select>
<br>
<label for="options">Options:</label>
<select id="options" onchange="updateCandidates()">
    <option value="">None</option>
    <option value="-MPC">MPC</option>
    <option value="-IS">Input Shaping</option>
    <!-- Add more option options here -->
</select>
<br>
<label for="secondaryOptions">Secondary Options:</label>
<select id="secondaryOptions" onchange="updateCandidates()">
    <option value="">None</option>
    <option value="-MPC">MPC</option>
    <!-- Add more secondary option options here -->
</select>
<br>
<button onclick="resetSelections()">Reset</button>
<br>
<div id="download-link"></div>
<div id="candidates"></div>

<script>
    const repoOwner = 'classicrocker883';
    const repoName = 'MRiscoCProUI';

    async function fetchAssets() {
        const modelDropdown = document.getElementById('model');
        const screenDropdown = document.getElementById('screen');
        const typeDropdown = document.getElementById('type');
        const featuresDropdown = document.getElementById('features');
        const secondaryFeaturesDropdown = document.getElementById('secondaryFeatures');
        const levelingDropdown = document.getElementById('leveling');
        const optionsDropdown = document.getElementById('options');
        const secondaryOptionsDropdown = document.getElementById('secondaryOptions');
        const proUIExtraFeaturesDropdown = document.getElementById('proUIExtraFeatures');

        let apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

        // if (modelDropdown.value === "HC32" || typeDropdown.value === "HC32") {
        //     apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/tags/2.1.3f-5-HC32-2`;
        // } else if (modelDropdown.value === "Ender") {
        //     apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/tags/2.1.3f-5-ender3-2`;
        // } else {
        //     apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;
        // }

        const response = await fetch(apiUrl);
        const data = await response.json();
        const assets = data.assets;

        function updateDownloadLink() {
            const selectedModel = modelDropdown.value;
            const selectedScreen = screenDropdown.value;
            const selectedType = typeDropdown.value;
            const selectedFeatures = featuresDropdown.value;
            const selectedSecondaryFeatures = secondaryFeaturesDropdown.value;
            const selectedLeveling = levelingDropdown.value;
            const selectedOptions = optionsDropdown.value;
            const selectedSecondaryOptions = secondaryOptionsDropdown.value;
            const selectedProUIExtraFeatures = proUIExtraFeaturesDropdown.value;

            const selectedAsset = assets.find(asset => {
                const nameParts = asset.name.split('_');
                return (
                    (nameParts[0] === selectedModel || selectedModel === "") &&
                    (nameParts.includes(selectedScreen) || selectedScreen === "") &&
                    (nameParts.includes(selectedType) || selectedType === "") &&
                    (nameParts.includes(selectedFeatures) || selectedFeatures === "") &&
                    (nameParts.includes(selectedSecondaryFeatures) || selectedSecondaryFeatures === "") &&
                    (nameParts.includes(selectedLeveling) || selectedLeveling === "") &&
                    (nameParts.includes(selectedOptions) || selectedOptions === "") &&
                    (nameParts.includes(selectedSecondaryOptions) || selectedSecondaryOptions === "") &&
                    (nameParts.includes(selectedProUIExtraFeatures) || selectedProUIExtraFeatures === "")
                );
            });

            const downloadLink = document.getElementById('download-link');
            if (selectedAsset) {
                downloadLink.innerHTML = `<a href="${selectedAsset.browser_download_url}" download>${selectedAsset.name}</a>`;
            } else {
                downloadLink.innerHTML = 'No download available for the selected options.';
            }
        }

        document.querySelectorAll('select').forEach(dropdown => {
            dropdown.addEventListener('change', updateDownloadLink);
        });

        updateDownloadLink();
    }

    function updateCandidates() {
        const modelDropdown = document.getElementById('model');
        const screenDropdown = document.getElementById('screen');
        const typeDropdown = document.getElementById('type');
        const featuresDropdown = document.getElementById('features');
        const secondaryFeaturesDropdown = document.getElementById('secondaryFeatures');
        const levelingDropdown = document.getElementById('leveling');
        const optionsDropdown = document.getElementById('options');
        const secondaryOptionsDropdown = document.getElementById('secondaryOptions');
        const proUIExtraFeaturesDropdown = document.getElementById('proUIExtraFeatures');

        const selectedModel = modelDropdown.value;
        const selectedScreen = screenDropdown.value;
        const selectedType = typeDropdown.value;
        const selectedFeatures = featuresDropdown.value;
        const selectedSecondaryFeatures = secondaryFeaturesDropdown.value;
        const selectedLeveling = levelingDropdown.value;
        const selectedOptions = optionsDropdown.value;
        const selectedSecondaryOptions = secondaryOptionsDropdown.value;
        const selectedProUIExtraFeatures = proUIExtraFeaturesDropdown.value;

        let candidates = [];

        fetchAssets().then(() => {
            assets.forEach(asset => {
                const name = asset.name;

                if (featuresDropdown.value === "") {
                    if (name.includes("_BMP") || name.includes("_IND") || name.includes("_SPRT13")) {
                        return;
                    }
                }

                if (
                    name.startsWith(selectedModel) &&
                    (selectedScreen === "" || name.includes(selectedScreen)) &&
                    (selectedType === "" || name.includes(selectedType)) &&
                    (selectedFeatures === "" || name.includes(selectedFeatures)) &&
                    (selectedSecondaryFeatures === "" || name.includes(selectedSecondaryFeatures)) &&
                    (selectedLeveling === "" || name.includes(selectedLeveling)) &&
                    (selectedOptions === "" || name.includes(selectedOptions)) &&
                    (selectedSecondaryOptions === "" || name.includes(selectedSecondaryOptions)) &&
                    (selectedProUIExtraFeatures === "" || name.includes(selectedProUIExtraFeatures))
                ) {
                    candidates.push({ url: asset.browser_download_url, filename: asset.name });
                }
            });

            const candidatesList = document.getElementById("candidates");
            candidatesList.innerHTML = "<strong>Candidates:</strong><br>";
            if (candidates.length > 0) {
                candidates.forEach(candidate => {
                    candidatesList.innerHTML += `<a href="${candidate.url}">${candidate.filename}</a><br>`;
                });
            } else {
                candidatesList.textContent = "No candidates found.";
            }
        });
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

    window.onload = fetchAssets;
</script>

