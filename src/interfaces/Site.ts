
export interface Site {
    url: string,
    name: string,
}

export interface SelectedSite extends Site {
    copyright?: string,
}
