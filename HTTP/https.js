export async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(
            `Something went wrong loading ${res.url}: ${res.statusText}`
        );
    }
    return await res.json();
}