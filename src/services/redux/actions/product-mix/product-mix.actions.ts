import { ThunkAction } from "redux-thunk";
import { LandAreaDivision } from "../../states/product-mix.state";
import { RootState, store } from "../../store";
import { CREATE_AREA_DIVISION, InitializeLandAreaAction, INITIALIZE_LAND_AREA, ProductMixAction, UPDATE_AREA_DIVISION } from "./product-mix-actions.interface";

export class ProductMixActions {
    public initializeLandArea = (totalArea: number): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                let state = store.getState().productMix.landAreaDivision.totalArea;
                console.log(state);
                // init total area for project
                const action: InitializeLandAreaAction = {
                    type: INITIALIZE_LAND_AREA,
                    totalArea: totalArea
                };

                dispatch(action);

                state = store.getState().productMix.landAreaDivision.totalArea;
                console.log(state);
            } catch (e) {
                console.log(e);
            }
        }
    }

    public createLandAreaDivision = (name: string, area: number, type: MeasuringUnit): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                const totalLandArea = store.getState().productMix.landAreaDivision.totalArea;
                const areaDivisions = store.getState().productMix.landAreaDivision.landAreaDivisions;

                // get remaining land area
                const remainingArea = totalLandArea - getLandDivisionsTotalOccupiedArea(areaDivisions);

                // get area in meter squaree
                area = getAreaInMeterSquare(area, totalLandArea, type);

                if (area > remainingArea) {
                    throw Error(`Area (${area}) should be smaller than remaining area (${remainingArea})`);
                }

                // dispatch action
                dispatch({ type: CREATE_AREA_DIVISION, name, area });
            } catch (e) {
                console.log(e);
            }
        }
    }

    public updateLandAreaDivision = (name: string, area: number, type: MeasuringUnit): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                const totalLandArea = store.getState().productMix.landAreaDivision.totalArea;
                const areaDivisions = store.getState().productMix.landAreaDivision.landAreaDivisions;

                // get and remove area division to insert the same division with different area
                const areaDivisionIndex = getLandDivisionIndexByName(areaDivisions, name);

                // get remaining land area without current area to be changed
                const remainingArea = totalLandArea - getLandDivisionsTotalOccupiedArea(areaDivisions.splice(areaDivisionIndex, 1));

                // get area in meter square
                area = getAreaInMeterSquare(area, totalLandArea, type);

                if (area > remainingArea) {
                    throw Error(`Area (${area}) should be smaller than remaining area (${remainingArea})`);
                }

                // dispatch action
                dispatch({ type: UPDATE_AREA_DIVISION, name, area });

            } catch (e) {
                console.log(e);
            }
        }
    }
}

const getLandDivisionIndexByName = (areaDivisions: LandAreaDivision[], areaDivisionName: string) => {
    return areaDivisions.map(division => division.name).indexOf(areaDivisionName);
}

// area in the store is always in square meter
const getLandDivisionsTotalOccupiedArea = (areaDivisions: LandAreaDivision[]): number => {
    return areaDivisions.map(division => division.area).reduce(sum, 0);
}

const convertFeddanToMeterSquare = (area: number): number => {
    return area * 4200;
}

const convertPercentageToMeterSquare = (totalArea: number, areaPercentage: number) => {
    return totalArea * areaPercentage / 100;
}

const getAreaInMeterSquare = (value: number, totalArea: number, type: MeasuringUnit): number => {
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

enum MeasuringUnit {
    SQM,
    FDN,
    PRCNTG
}

