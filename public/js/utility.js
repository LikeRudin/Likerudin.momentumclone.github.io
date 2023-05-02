const searchForm = document.getElementById("searchForm");
const searchEngine = document.getElementById("searchEngine");
const searchInput = searchForm.querySelector("input");

/**set Engine on search Form*/
const setSearchEngine = function () {
    const selectedEngine = searchEngine.value;
    searchForm.action = `https://www.${selectedEngine}.com/search`;
}

searchEngine.addEventListener("change", setSearchEngine);




