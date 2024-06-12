---
# the default layout is 'page'
icon: fas fa-info-circle
order: 5
---
<html>
<body>
<select id="typeSelector">
  <option value="">Select Type</option>
  <option value="GD32">GD32</option>
  <option value="N32">N32</option>
  <option value="427">427</option>
</select>
<br>
<select id="levelingSelector">
  <option value="">Select Leveling</option>
  <option value="BLT">BLT</option>
  <option value="UBL">UBL</option>
  <option value="MM">MM</option>
</select>
<br>
<select id="proUiSelector">
  <option value="">ProUI-EX?</option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>
<br>
<div id="firmwareList">
</div>
<script>
const repoOwner = 'classicrocker883';
const repoName = 'MRiscoCProUI';
const githubToken = "{{ site.github.token }}";
async function fetchFirmwareData() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`, {
      headers: {
        Authorization: `token ${githubToken}`
      }
    });
    const data = await response.json();
    return data.assets.map(asset => asset.name);
  } catch (error) {
    console.error('Error fetching firmware data:', error);
    return [];
  }
}
function filterFirmware() {
  const type = document.getElementById("typeSelector").value;
  const leveling = document.getElementById("levelingSelector").value;
  const proUi = document.getElementById("proUiSelector").value;
  const filteredFirmware = firmwareData.filter(firmware => {
    if (type && !firmware.includes(type)) return false;
    if (leveling && !firmware.includes(leveling)) return false;
    if (proUi === "yes" && !firmware.includes("ProUI-EX")) return false;
    if (proUi === "no" && firmware.includes("ProUI-EX")) return false;
    return true;
  });
  const firmwareList = document.getElementById("firmwareList");
  firmwareList.innerHTML = "";
  filteredFirmware.forEach(firmware => {
    const listItem = document.createElement("a");
    listItem.href = `https://github.com/{owner}/{repo}/releases/latest/download/${firmware}`;
    listItem.textContent = firmware;
    listItem.setAttribute("download", firmware);
    firmwareList.appendChild(listItem);
    firmwareList.appendChild(document.createElement("br"));
  });
}
document.getElementById("typeSelector").addEventListener("change", filterFirmware);
document.getElementById("levelingSelector").addEventListener("change", filterFirmware);
document.getElementById("proUiSelector").addEventListener("change", filterFirmware);
let firmwareData = [];
fetchFirmwareData().then(data => {
  firmwareData = data;
  filterFirmware();
});
</script>
</body>
</html>