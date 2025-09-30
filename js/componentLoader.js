export const loadComponent = async (url, elementId) => {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = data;
        }
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
    }
};