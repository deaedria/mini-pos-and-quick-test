// FUNCTION TO ADD PRODUCT IN LOCALSTORAGE
export function addProductToLocalStorage(data) {
    data.map((product, index) => (product.id = index + 1));
    return localStorage.setItem("ProductPOS", JSON.stringify(data));
}

// FUNCTION TO GET PRODUCT IN LOCALSTORAGE
export function getProductLocalStorage() {
    return JSON.parse(localStorage.getItem("ProductPOS"));
}
