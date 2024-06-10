---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---
<label for="model-dropdown">Select a model:</label>
<select id="model-dropdown">
  <option value="">--Please choose a model--</option>
  <option value="Aquila">Aquila</option>
  <option value="C2-Aquila">C2</option>
  <option value="TJC-Aquila">TJC</option>
</select>

<label for="chip-dropdown">Select a chip type:</label>
<select id="chip-dropdown" disabled>
  <option value="">--Please choose a chip type--</option>
</select>

<label for="leveling-dropdown">Select bed leveling:</label>
<select id="leveling-dropdown" disabled>
  <option value="">--Please choose bed leveling--</option>
</select>

<label for="options-dropdown">Select an option:</label>
<select id="options-dropdown" disabled>
  <option value="">--Please choose an option--</option>
</select>

<div id="download-link"></div>

<script>
  const repoOwner = 'classicrocker883';
  const repoName = 'MRiscoCProUI';

  async function fetchAssets() {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);
    const data = await response.json();
    const assets = data.assets;
    const modelDropdown = document.getElementById('model-dropdown');
    const chipDropdown = document.getElementById('chip-dropdown');
    const levelingDropdown = document.getElementById('leveling-dropdown');
    const optionsDropdown = document.getElementById('options-dropdown');

    const models = new Set(['Aquila', 'C2-Aquila', 'TJC-Aquila']);
    const chipTypes = new Set();
    const levelingTypes = new Set();
    const options = new Set();
    const assetMap = {};

    assets.forEach(asset => {
      const name = asset.name;
      const nameParts = name.split('_');
      const model = nameParts[0];
      const chipType = nameParts[1];
      const levelingType = nameParts[2];
      const option = nameParts[3] ? nameParts[3].replace('.bin', '') : '';

      if (models.has(model)) {
        chipTypes.add(chipType);

        if (!assetMap[model]) {
          assetMap[model] = {};
        }
        if (!assetMap[model][chipType]) {
          assetMap[model][chipType] = {};
        }
        if (!assetMap[model][chipType][levelingType]) {
          assetMap[model][chipType][levelingType] = {};
        }
        assetMap[model][chipType][levelingType][option || ''] = {
          url: asset.browser_download_url,
          name: asset.name
        };
      }
    });

    modelDropdown.addEventListener('change', (event) => {
      const selectedModel = event.target.value;
      chipDropdown.innerHTML = '<option value="">--Please choose a chip type--</option>';
      chipDropdown.disabled = !selectedModel;
      levelingDropdown.innerHTML = '<option value="">--Please choose bed leveling--</option>';
      levelingDropdown.disabled = true;
      optionsDropdown.innerHTML = '<option value="">--Please choose an option--</option>';
      optionsDropdown.disabled = true;

      if (selectedModel && assetMap[selectedModel]) {
        Object.keys(assetMap[selectedModel]).forEach(chipType => {
          const option = document.createElement('option');
          option.value = chipType;
          option.textContent = chipType;
          chipDropdown.appendChild(option);
        });
      }

      updateDownloadLink();
    });

    chipDropdown.addEventListener('change', (event) => {
      const selectedModel = modelDropdown.value;
      const selectedChipType = event.target.value;
      levelingDropdown.innerHTML = '<option value="">--Please choose bed leveling--</option>';
      levelingDropdown.disabled = false;
      optionsDropdown.innerHTML = '<option value="">--Please choose an option--</option>';
      optionsDropdown.disabled = true;

      if (selectedModel && selectedChipType && assetMap[selectedModel][selectedChipType]) {
        Object.keys(assetMap[selectedModel][selectedChipType]).forEach(levelingType => {
          const option = document.createElement('option');
          option.value = levelingType;
          option.textContent = levelingType;
          levelingDropdown.appendChild(option);
        });
      }

      updateDownloadLink();
    });

    levelingDropdown.addEventListener('change', (event) => {
      const selectedModel = modelDropdown.value;
      const selectedChipType = chipDropdown.value;
      const selectedLevelingType = event.target.value;
      optionsDropdown.innerHTML = '<option value="">--Please choose an option--</option>';
      optionsDropdown.disabled = false;

      if (selectedModel && selectedChipType && selectedLevelingType && assetMap[selectedModel][selectedChipType][selectedLevelingType]) {
        Object.keys(assetMap[selectedModel][selectedChipType][selectedLevelingType]).forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option || 'None';
          optionsDropdown.appendChild(optionElement);
        });
      }

      updateDownloadLink();
    });

    optionsDropdown.addEventListener('change', updateDownloadLink);

    function updateDownloadLink() {
      const selectedModel = modelDropdown.value;
      const selectedChipType = chipDropdown.value;
      const selectedLevelingType = levelingDropdown.value;
      const selectedOption = optionsDropdown.value;
      const downloadLink = document.getElementById('download-link');
      downloadLink.innerHTML = '';

      if (selectedModel && selectedChipType && selectedLevelingType && assetMap[selectedModel][selectedChipType][selectedLevelingType]) {
        const links = [];
        if (selectedOption) {
          const asset = assetMap[selectedModel][selectedChipType][selectedLevelingType][selectedOption || ''];
          if (asset) {
            links.push(`<a href="${asset.url}" download>${asset.name}</a>`);
          }
        } else {
          Object.keys(assetMap[selectedModel][selectedChipType][selectedLevelingType]).forEach(option => {
            const asset = assetMap[selectedModel][selectedChipType][selectedLevelingType][option || ''];
            if (asset) {
              links.push(`<a href="${asset.url}" download>${asset.name}</a>`);
            }
          });
        }
        if (links.length) {
          downloadLink.innerHTML = links.join('<br>');
        } else {
          downloadLink.innerHTML = 'No download available for the selected options.';
        }
      }
    }
  }

  fetchAssets();
</script>
