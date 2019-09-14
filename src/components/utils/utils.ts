export function getURL(path: string): string {
    var base = "http://0.0.0.0/blog"
    var production = "https://api.sirileepage.com/blog"
    return `${production}/${path}`
}

export const drawerWidth = 0;