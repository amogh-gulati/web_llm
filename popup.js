// Get the list element where we will display the buttons
const tabList = document.getElementById("tabList");

// Query for all tabs and create buttons
chrome.tabs.query({}, function (tabs) {
  tabs.forEach(function (tab) {
    const tabButton = document.createElement("button");

    // Truncate the button text at 40 characters
    const buttonText = tab.title.length > 40 ? tab.title.slice(0, 40) + "..." : tab.title;

    // Append the URL to the button text
    const fullButtonText = buttonText + " : " + tab.url;
    const truncButtonText = fullButtonText.length > 40 ? fullButtonText.slice(0, 40) + "..." : fullButtonText;
    tabButton.textContent = truncButtonText.trim();
    tabButton.title = tab.title; // Add a title attribute to show the full title on hover

    tabButton.addEventListener("click", function () {
      // Switch to the tab when the button is clicked
      chrome.tabs.update(tab.id, { active: true });
    });
    tabList.appendChild(tabButton);
  });
});


function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store the distances
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  // Initialize the first row and column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Calculate the Levenshtein distance
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return dp[m][n];
}