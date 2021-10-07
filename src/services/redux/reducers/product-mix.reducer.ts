import { CreateAreaDivisionAction, CREATE_AREA_DIVISION, UPDATE_LAND_AREA, ProductMixAction, UpdateAreaDivisionAction, UPDATE_AREA_DIVISION } from "../actions/product-mix/product-mix-actions.interface";
import { LandAreaDivision, LandAreaDivisionPlanning, ProductMixState } from "../states/product-mix.state";

const intitalState: ProductMixState = {
    landAreaDivision: {
        totalArea: 0,
        landAreaDivisions: []
    },
    buildings: []
}

export const productMixReducer = (prevState = intitalState, action: ProductMixAction): ProductMixState => {
    switch (action.type) {
        case UPDATE_LAND_AREA: {
            let landAreaDivision = prevState.landAreaDivision;
            landAreaDivision.totalArea = action.totalArea;
            return {
                ...prevState,
                landAreaDivision
            }
        }
        case CREATE_AREA_DIVISION: {
            let landAreaPlanning = createAreaDivison(prevState, action);
            return {
                ...prevState,
                landAreaDivision: landAreaPlanning
            }
        }
        case UPDATE_AREA_DIVISION: {
            let landAreaPlanning = updateAreaDivisionsList(prevState, action);
            return {
                ...prevState,
                landAreaDivision: landAreaPlanning
            }
        }
        default: {
            return prevState;
        }
    }
}

const createAreaDivison = (prevState: ProductMixState, action: CreateAreaDivisionAction): LandAreaDivisionPlanning => {
    if (action.type != CREATE_AREA_DIVISION) {
        throw Error("Action of type CreateAreaDivisionAction should have action type: CREATE_AREA_DIVISON");
    }
    let landAreaPlanning = prevState.landAreaDivision;
    let landAreaDivisions = prevState.landAreaDivision.landAreaDivisions;
    const areaDivision: LandAreaDivision = {
        name: action.name,
        area: action.area
    }
    landAreaDivisions.push(areaDivision);
    landAreaPlanning.landAreaDivisions = landAreaDivisions;
    return landAreaPlanning;
}

const updateAreaDivisionsList = (prevState: ProductMixState, action: UpdateAreaDivisionAction): LandAreaDivisionPlanning => {
    if (action.type != UPDATE_AREA_DIVISION) {
        throw Error("Action of type UpdateAreaDivision should have action type: UPDATE_AREA_DIVISON");
    }
    let landAreaPlanning = prevState.landAreaDivision;
    let landAreaDivisions = prevState.landAreaDivision.landAreaDivisions;
    for (let land of landAreaDivisions) {
        if (land.name == action.name) {
            land.area = action.area;
        }
    }
    landAreaPlanning.landAreaDivisions = landAreaDivisions;
    return landAreaPlanning;
}