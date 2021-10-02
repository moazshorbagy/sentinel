import { ThunkAction } from "redux-thunk";
import { RootState, store } from "../../store";
import { CREATE_AREA_DIVISION, InitializeLandAreaAction, INITIALIZE_LAND_AREA, ProductMixAction, UPDATE_AREA_DIVISION } from "./product-mix-actions.interface";
import { getAreaInMeterSquare, getLandDivisionIndexByName, getLandDivisionsTotalOccupiedArea, MeasuringUnit } from "./utils";

export class ProductMixActions {
    public initializeLandArea = (totalArea: number): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                let state = store.getState().productMix.landAreaDivision.totalArea;
                // init total area for project
                const action: InitializeLandAreaAction = {
                    type: INITIALIZE_LAND_AREA,
                    totalArea: totalArea
                };

                dispatch(action);

                state = store.getState().productMix.landAreaDivision.totalArea;
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
