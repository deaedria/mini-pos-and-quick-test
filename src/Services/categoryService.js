// FUNCTION TO ADD CATEGORY IN LOCALSTORAGE
export function addCategoryToLocalStorage(data) {
    data.map((category, index) => (category.id = index + 1));
    return localStorage.setItem("CategoryPOS", JSON.stringify(data));
}

// FUNCTION TO GET CATEGORY IN LOCALSTORAGE
export function getCategoryLocalStorage() {
    return JSON.parse(localStorage.getItem("CategoryPOS"));
}
