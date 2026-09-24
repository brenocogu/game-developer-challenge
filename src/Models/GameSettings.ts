export interface GameSettings{
    matchDuration: number,
    enemySpawnRate: number,
}

const DEFAULTS: GameSettings = {
    matchDuration: 180,
    enemySpawnRate: 3,
};

const KEY = 'pirate-battle:settings';

export function loadSettings(): GameSettings {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return { ...DEFAULTS };
        return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
        return { ...DEFAULTS };
    }
}

export function saveSettings(s: GameSettings): void {
    localStorage.setItem(KEY, JSON.stringify(s));
}
