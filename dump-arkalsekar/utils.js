
// Get Cookie
export function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${JSON.stringify(value)}; expires=${expires}; path=/`;
}

// Set Cookie
export function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Delete Cookie
export function deleteCookie(name) {
  // Setting the expiry date in the past removes the cookie
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// Check Session 
export async function checkSession(user_id, session_id) {
    try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://grid-lock-session-tracke-api.vercel.app/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, session_id }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Expected: API returns something like { exists: true } or { message: "session found" }
        return data;
    } catch (error) {
        console.error("❌ Error while checking session:", error);
        return { error: error.message };
    }
}
