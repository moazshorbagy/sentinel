import { BuildingsDefinition, LandAreaDivision } from "../../states/product-mix.state";

export const getLandDivisionIndexByName = (areaDivisions: LandAreaDivision[], areaDivisionName: string) => {
    return areaDivisions.map(division => division.name).indexOf(areaDivisionName);
}

// area in the store is always in square meter
export const getLandDivisionsTotalOccupiedArea = (areaDivisions: LandAreaDivision[]): number => {
    return areaDivisions.map(division => division.area).reduce(sum, 0);
}

export const convertFeddanToMeterSquare = (area: number): number => {
    return area * 4200;
}

export const convertPercentageToMeterSquare = (totalArea: number, areaPercentage: number) => {
    return totalArea * areaPercentage / 100;
}

export const getAreaInMeterSquare = (value: number, totalArea: number, type: MeasuringUnit): number => {
    switch (type) {
        case MeasuringUnit.PRCNTG: {
            return convertPercentageToMeterSquare(totalArea, value);
        }
        case MeasuringUnit.FDN: {
            return convertFeddanToMeterSquare(value);
        }
        case MeasuringUnit.SQM: {
            return value;
        }
        default: throw Error(`Invalid measuring unit ${type}`);
    }
}

const sum = (a: number, b: number): number => {
    return a + b;
}

export const buildingNameExists = (buildings: BuildingsDefinition[], name: string) => {
    return buildings.map(building => building.name).indexOf(name) !== -1;
}

export enum MeasuringUnit {
    SQM,
    FDN,
    PRCNTG
}
