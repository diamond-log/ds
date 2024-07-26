type NormalizeStringOptions = {
    lowerCase?: boolean;
}

export function normalizeString(str: string, { lowerCase }: NormalizeStringOptions) {
    if(typeof str !== "string") return str;
    
    let returnString = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/gi,'');
    if(lowerCase) returnString = returnString.toLowerCase();

    return returnString;
}