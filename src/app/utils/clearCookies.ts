export const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const [key, _] = c.split("=");
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}