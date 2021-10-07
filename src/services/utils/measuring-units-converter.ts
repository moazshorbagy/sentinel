export const round = (value: number, precision: number): number => {
    return +value.toFixed(precision);
}

export const sqmToFed = (sqm: number): number => {
    return round(sqm / 4200, 2);
}

export const fedToSqm = (fed: number): number => {
    return fed * 4200;
}

/**
 * The percentage of `b` in `a`
 */
export const toPercentage = (a: number, b: number): number => {
    return round(b / a * 100, 2);
}

export const fromPercentage = (total: number, percentage: number): number => {
    return total * percentage / 100;
}