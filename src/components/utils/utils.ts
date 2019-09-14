export function getURL(path: string): string {
    var base = "http://0.0.0.0/blog"
    var production = "http://54.152.207.25/blog"
    return `${production}/${path}`
}

export const drawerWidth = 0;