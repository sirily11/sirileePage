import { Color } from '../models/post';

export function getURL(path: string): string {

    var base = "http://0.0.0.0/blog"
    var production_api = "https://api.sirileepage.com/blog"
    return `${production_api}/${path}`
}


export function isBrightColor(color: Color): boolean {
    const { red, green, blue } = color
    let hsp = Math.sqrt(
        0.299 * (red * red) +
        0.587 * (green * green) +
        0.114 * (blue * blue)
    );
    return hsp > 190;
}

export const drawerWidth = 0;