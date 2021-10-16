import { ThunkAction } from "redux-thunk";
import { measuringUnits } from "../../../../services/utils/measuring-unit";
import { BuildingDefinition, BuildingUnitDefinition } from "../../states/product-mix.state";
import { RootState, store } from "../../store";
import { CREATE_AREA_DIVISION, CREATE_BUILDING, InitializeLandAreaAction, UPDATE_LAND_AREA, ProductMixAction, UPDATE_AREA_DIVISION, UPDATE_BUILDING, AddBuildingUnitAction, ADD_BUILDING_UNIT } from "./product-mix-actions.interface";
import { buildingNameExists, getAreaInMeterSquare, getLandDivisionIndexByName, getLandDivisionsTotalOccupiedArea } from "./utils";

export class ProductMixActions {
    public changeLandArea = (totalArea: number, measuringUnit: measuringUnits): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                let landArea = store.getState().productMix.landAreaDivision.totalArea;
                // get area in meter squaree
                const area = getAreaInMeterSquare(totalArea, landArea, measuringUnit);
                // init total area for project
                const action: InitializeLandAreaAction = {
                    type: UPDATE_LAND_AREA,
                    totalArea: area
                };
                dispatch(action);
            } catch (e) {
                console.log(e);
            }
        }
    }

    public createLandAreaDivision = (name: string, area: number, type: measuringUnits): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                const totalLandArea = store.getState().productMix.landAreaDivision.totalArea;
                const areaDivisions = store.getState().productMix.landAreaDivision.landAreaDivisions;

                // get remaining land area
                const remainingArea = totalLandArea - getLandDivisionsTotalOccupiedArea(areaDivisions);

                // get area in meter squaree
                area = getAreaInMeterSquare(area, totalLandArea, type);

                // if (area > remainingArea) {
                //     throw Error(`Area (${area}) should be smaller than remaining area (${remainingArea})`);
                // }

                // dispatch action
                dispatch({ type: CREATE_AREA_DIVISION, name, area });
            } catch (e) {
                console.log(e);
            }
        }
    }

    public updateLandAreaDivision = (name: string, area: number, type: measuringUnits): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                const totalLandArea = store.getState().productMix.landAreaDivision.totalArea;
                const areaDivisions = store.getState().productMix.landAreaDivision.landAreaDivisions;

                ///// get and remove area division to insert the same division with different area
                // const areaDivisionIndex = getLandDivisionIndexByName(areaDivisions, name);

                ///// get remaining land area without current area to be changed
                // const remainingArea = totalLandArea - getLandDivisionsTotalOccupiedArea(areaDivisions.splice(areaDivisionIndex, 1));

                // get area in meter square
                area = getAreaInMeterSquare(area, totalLandArea, type);

                // if (area > remainingArea) {
                //     throw Error(`Area (${area}) should be smaller than remaining area (${remainingArea})`);
                // }

                // dispatch action
                dispatch({ type: UPDATE_AREA_DIVISION, name, area });

            } catch (e) {
                console.log(e);
            }
        }
    }

    public createBuildingAction = (name: string, footprint: number): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                // check if building name exists
                if (buildingNameExists(store.getState().productMix.buildings, name)) {
                    // throw Error(`building name (${name}) already exists`);
                }

                dispatch({ type: CREATE_BUILDING, name, footprint });

            } catch (e) {
                console.log(e);
            }
        }
    }

    public updateBuildingName = (id: number, name: string): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                dispatch({ type: UPDATE_BUILDING, name, id });
            } catch (e) {
                console.log(e);
            }
        }
    }

    public addBuildingUnit = (
        buildingId: number, name: string, assetType: string, numberOfUnitsPerBuilding: number,
        builtUpAreaPerBuilding: number, sellableArea: number): ThunkAction<void, RootState, null, ProductMixAction> => {
        return async dispatch => {
            try {
                // safely getting the building index
                let buildingIndex: number = store.getState().productMix.buildings.findIndex(building => building.id == buildingId);
                if (buildingIndex != -1) {
                    const action: AddBuildingUnitAction = {
                        buildingIndex: buildingIndex,
                        type: ADD_BUILDING_UNIT,
                        name: name,
                        assetType: assetType,
                        numberOfUnitsPerBuilding: numberOfUnitsPerBuilding,
                        builtUpAreaPerBuilding: builtUpAreaPerBuilding,
                        sellableArea: sellableArea
                    }
                    dispatch(action);
                }
            } catch(e) {
                console.log(e);
            }
        }
    }
}
