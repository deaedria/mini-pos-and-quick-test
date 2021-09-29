// FUNCTION TO ADD BILLING IN LOCALSTORAGE
export function addBillingToLocalStorage(data) {
    return localStorage.setItem("BillingPOS", JSON.stringify(data));
}

// FUNCTION TO GET BILLING IN LOCALSTORAGE
export function getBillingLocalStorage() {
    return JSON.parse(localStorage.getItem("BillingPOS"));
}
