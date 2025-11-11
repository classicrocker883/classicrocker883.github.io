const RELEASES_JSON_URL = '/assets/data/releases.json';
const DISPLAY_LIMIT = 10;
const TARGET_MODELS = ['Base', 'ender3', 'HC32', 'C2'];
let BASE_TAG_PREFIX = '';

/**
 * Parses a GitHub tag string (e.g., '2.1.3g-10', '2.1.3g-10-ender3-1') into comparable components.
 * Assumes format: [BASE_TAG_PREFIX]-[MONTH][-MODEL][-REVISION]
 * @param {string} tag - The release tag string.
 * @returns {object|null} An object with parsed components, or null if the tag is not relevant.
 */
function parseTag(tag) {
    // Only proceed if the prefix has been set (it's set in fetchAndDisplayTopDownloads)
    if (!BASE_TAG_PREFIX) return null;

    if (!tag.startsWith(BASE_TAG_PREFIX)) return null;

    const parts = tag.split('-');

    // 1. Determine the Month (always the first number after the prefix)
    const month = Number(parts.find(p => !isNaN(Number(p)) && p.length > 0));

    // If no month is found, or it's not a valid tag, skip.
    if (isNaN(month) || month === 0) return null;

    // 2. Determine the Model
    let model = 'Base'; // Default for tags like '2.1.3g-10'
    let revision = 0;

    if (parts.length > 2) {
        // Look for model names (ender3, HC32, C2)
        const modelPart = parts.find(p => ['ender3', 'HC32', 'C2'].includes(p));

        if (modelPart) {
            model = modelPart;
            // The revision is the last component, if it's a number
            const lastPart = parts[parts.length - 1];
            if (!isNaN(Number(lastPart)) && lastPart.length > 0) {
                revision = Number(lastPart);
            }
        }
    }

    return {
        tag,
        model,
        month,
        revision,
        // Helper string for the base tag
        baseVersion: `${BASE_TAG_PREFIX}-${month}`
    };
}

/**
 * Processes releases for a specific month, finds the latest for each model,
 * aggregates assets, and returns the top N downloaded assets.
 * @param {Array<object>} releases - The full list of release objects.
 * @param {number} targetMonth - The month number (e.g., 10 for October) to process.
 * @returns {object} An object containing the top downloads and the tags used.
 */
function getTopDownloadsForMonth(releases, targetMonth) {
    const latestReleaseMap = {}; // Key: Model, Value: { release, parsed }

    releases.forEach(release => {
        const parsed = parseTag(release.tag_name);

        // Only process tags that belong to the target month
        if (parsed && parsed.month === targetMonth) {
            const model = parsed.model;
            const currentLatest = latestReleaseMap[model];

            // Comparison logic: Only revision comparison is needed
            if (!currentLatest || parsed.revision > currentLatest.parsed.revision) {
                latestReleaseMap[model] = { release, parsed };
            }
        }
    });

    // Extract the assets from the latest releases found
    let allAssets = [];
    let releaseTagsUsed = [];

    Object.values(latestReleaseMap).forEach(({ release, parsed }) => {
        releaseTagsUsed.push(release.tag_name);

        // Map assets and include the source tag for tracking
        const assetsWithTag = release.assets.map(asset => ({
            name: asset.name,
            downloads: asset.download_count,
            url: asset.browser_download_url,
            tag: release.tag_name
        }));
        allAssets = allAssets.concat(assetsWithTag);
    });

    // Sort the combined assets by download count (descending)
    allAssets.sort((a, b) => b.downloads - a.downloads);

    // Take the top N assets collectively (Top 10)
    const topDownloads = allAssets.slice(0, DISPLAY_LIMIT);

    return { topDownloads, releaseTagsUsed };
}

/**
 * Fetches the local releases JSON, identifies the latest release for each model,
 * and displays the top 10 most downloaded assets collectively, with a month-by-month fallback.
 */
async function fetchAndDisplayTopDownloads(currentMonth = null) {
    const listElement = document.getElementById('top-downloads-list');
    if (!listElement) return;

    try {
        if (currentMonth === null) {
            listElement.innerHTML = '<li style="color: #ccc;">Identifying latest releases...</li>';
        } else {
            listElement.innerHTML = `<li style="color: #ccc;">No assets found for month ${currentMonth}. Checking month ${currentMonth - 1}...</li>`;
        }

        const response = await fetch(RELEASES_JSON_URL);
        if (!response.ok) throw new Error(`Failed to load releases.json. Status: ${response.status}`);
        const releases = await response.json();

        if (!Array.isArray(releases) || releases.length === 0) {
            listElement.innerHTML = '<li style="color: #ccc;">No release data found in JSON.</li>';
            return;
        }

        // 1. Dynamically determine BASE_TAG_PREFIX
        if (BASE_TAG_PREFIX === '') {
            // Assume the first tag in the array (the latest) represents the current prefix structure.
            const latestTag = releases[0].tag_name;
            // The prefix is everything before the first hyphen followed by a number (the month).
            const prefixMatch = latestTag.match(/^([a-zA-Z0-9\.]*)-/);

            if (prefixMatch && prefixMatch[1]) {
                BASE_TAG_PREFIX = prefixMatch[1];
            } else {
                 listElement.innerHTML = '<li style="color: #ccc;">Could not determine the base tag prefix.</li>';
                 return;
            }
        }

        let targetMonth = currentMonth;

        // 2. Determine the starting month to check (only on the initial call)
        if (currentMonth === null) {
            // Find the highest MONTH number across all valid tags
            let latestMonth = 0;
            releases.forEach(release => {
                const parsed = parseTag(release.tag_name);
                if (parsed) {
                    latestMonth = Math.max(latestMonth, parsed.month);
                }
            });

            if (latestMonth === 0) {
                listElement.innerHTML = '<li style="color: #ccc;">Could not determine the latest month in tags.</li>';
                return;
            }
            targetMonth = latestMonth;
        }

        // 3. Process releases for the target month
        const { topDownloads, releaseTagsUsed } = getTopDownloadsForMonth(releases, targetMonth);

        // 4. Check for assets and handle fallback
        if (topDownloads.length === 0) {
            // FALLBACK LOGIC: If no assets were found and the month is not 1, try the previous month
            if (targetMonth > 1) {
                // Recursively call the function for the previous month
                await fetchAndDisplayTopDownloads(targetMonth - 1);
                return; // Stop execution of the current call
            } else {
                // We've fallen back to month 1 and still found no assets
                listElement.innerHTML = `<li style="color: #ccc;">No downloaded assets found across latest releases (checked months ${currentMonth ?? targetMonth} down to 1).</li>`;
                return;
            }
        }

        // 5. Display the results
        listElement.innerHTML = ''; // Clear placeholder or loading message

        topDownloads.forEach(asset => {
            const listItem = document.createElement('li');
            listItem.style.fontSize = '0.9em';
            listItem.innerHTML = `
                <a href="${asset.url}" target="_blank">
                    <strong>${asset.name}</strong>
                </a>
                <span style="display:block; font-size: 0.8em; color: #888;">
                    (${asset.downloads.toLocaleString()} downloads from ${asset.tag})
                </span>`;
            listElement.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error fetching or processing top downloads:", error);
        listElement.innerHTML = `<li style="color: red;">Failed to load downloads. (Check console for details)</li>`;
    }
}

// Call the function to run when the page loads
window.onload = function() {
    // Initial call with no month specified, letting the function determine the latest
    fetchAndDisplayTopDownloads();
};
