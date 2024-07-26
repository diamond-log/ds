export function idToIndex(id: string | undefined) {
    return id?.replaceAll("-", "_") || '';
}