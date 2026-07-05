const HISTORY_KEY = 'yatra_guide_history';
const FAV_KEY = 'yatra_guide_favorites';

export function getHistory() {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveToHistory(route) {
    const history = getHistory();
    // Prepend and limit to 10 items
    history.unshift(route);
    if (history.length > 10) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getFavorites() {
    const data = localStorage.getItem(FAV_KEY);
    return data ? JSON.parse(data) : [];
}

export function toggleFavorite(route) {
    let favs = getFavorites();
    const index = favs.findIndex(r => r.fromId === route.fromId && r.toId === route.toId);
    
    if (index > -1) {
        favs.splice(index, 1); // remove
    } else {
        favs.push(route); // add
    }
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return index === -1; // returns true if added
}

export function removeFavorite(fromId, toId) {
    let favs = getFavorites();
    const filtered = favs.filter(r => !(r.fromId === fromId && r.toId === toId));
    localStorage.setItem(FAV_KEY, JSON.stringify(filtered));
}
