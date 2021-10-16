import { CreateAreaDivisionAction, CREATE_AREA_DIVISION, UPDATE_LAND_AREA, ProductMixAction, UpdateAreaDivisionAction, UPDATE_AREA_DIVISION, CREATE_BUILDING, UPDATE_BUILDING, DELETE_BUILDING, ADD_BUILDING_UNIT, UPDATE_BUILDING_UNIT } from "../actions/product-mix/product-mix-actions.interface";
import { sum } from "../actions/product-mix/utils";
import { BuildingDefinition, BuildingUnitDefinition, LandAreaDivision, LandAreaDivisionPlanning, ProductMixState } from "../states/product-mix.state";


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
        case CREATE_BUILDING: {
            let buildings = prevState.buildings;
            let id = buildings.length;
            const building = createBuilding(action.name, action.footprint, id);
            buildings.push(building);
            return {
                ...prevState,
                buildings
            }
        }
        case UPDATE_BUILDING: {
            let buildings = prevState.buildings;
            buildings = updateBuilding(buildings, action.id, action.name, action.footprint);
            return {
                ...prevState,
                buildings
            }
        }
        case ADD_BUILDING_UNIT: {
            let buildings = prevState.buildings;
            buildings = addBuildingUnit(buildings, action.buildingIndex, action.name, action.assetType, action.numberOfUnitsPerBuilding, action.builtUpAreaPerBuilding, action.sellableArea);
            return {
                ...prevState,
                buildings
            }
        }
        case UPDATE_BUILDING_UNIT: {
            let buildings = prevState.buildings;
            buildings = updateBuildingUnit(buildings, action.buildingIndex, action.buildingUnitIndex, action.name, action.assetType, action.numberOfUnitsPerBuilding, action.builtUpAreaPerBuilding, action.sellableArea,
                action.numberOfParkingSlots);
            return {
                ...prevState,
                buildings
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

const createBuilding = (name: string, footprint: number, id: number) => {
    const building: BuildingDefinition = {
        id: id,
        name: name,
        footprint: footprint,
        buildingUnits: [],
    }
    return building;
}

const updateBuilding = (buildings: BuildingDefinition[], id: number, name?: string, footprint?: number): BuildingDefinition[] => {
    let buildingIndex = buildings.findIndex(building => building.id == id);
    if (buildingIndex !== -1) {
        let building = buildings[buildingIndex];

        if (name) {
            building.name = name;
        }

        if (footprint) {
            building.footprint = footprint;
        }

        buildings[buildingIndex] = building;
    }
    return buildings;
}

const addBuildingUnit = (buildings: BuildingDefinition[], buildingIndex: number, name: string, assetType: string, numberOfUnits: number, builtUpArea: number, sellableArea: number) => {
    let building = buildings[buildingIndex];
    building.buildingUnits.push({
        id: building.buildingUnits.length,
        name: name,
        assetType: assetType,
        builtUpArea: builtUpArea,
        numberOfUnits: numberOfUnits,
        sellableArea: sellableArea
    });
    buildings[buildingIndex] = building;
    return buildings;
}

const updateBuildingUnit = (buildings: BuildingDefinition[], buildingIndex: number, buildingUnitIndex: number, name?: string, assetType?: string, numberOfUnits?: number, builtUpArea?: number, sellableArea?: number, numberOfParkingSlots?: number) => {

    // Get the building unit
    let building = buildings[buildingIndex];
    let buildingUnits = building.buildingUnits;
    let unit = buildingUnits[buildingUnitIndex];

    if (name) {
        unit.name = name;
    }

    if (assetType) {
        unit.assetType = assetType;
    }

    if (numberOfUnits) {
        unit.numberOfUnits = numberOfUnits;
    }

    if (builtUpArea) {
        unit.builtUpArea = builtUpArea;
    }

    if (numberOfParkingSlots) {
        unit.numberOfParkingSlots = numberOfParkingSlots;
    }

    if (sellableArea) {
        unit = updateUnitSellableArea(unit, sellableArea);

        /** update building sellable area  
         * and sellable area efficieny
         * */ 
        building = updateBuildingSellableArea(building);
    }

    // Save and return buildings list
    buildingUnits[buildingIndex] = unit;
    building.buildingUnits = buildingUnits;
    buildings[buildingIndex] = building;

    return buildings;
}

const updateUnitSellableArea = (unit: BuildingUnitDefinition, unitSellableArea: number) => {
    unit.sellableArea = unitSellableArea;
    unit.sellableAreaEfficiency = unit.sellableArea / unit.builtUpArea * 100;
    return unit;
}

// updates sellable area and sellable area efficiency
const updateBuildingSellableArea = (building: BuildingDefinition) => {
    const totalBuiltUpArea = building.buildingUnits.map(unit => unit.builtUpArea).reduce(sum, 0);
    const totalSellableArea = building.buildingUnits.map(unit => unit.sellableArea).reduce(sum, 0);
    building.totalSellableArea = totalSellableArea;
    building.sellableAreaEfficiency = totalSellableArea / totalBuiltUpArea * 100;
    return building;
}
