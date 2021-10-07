/**
 * Areas stored in the store are always in square meter
 */

/**
 * Create, Update, Delete area division. E.g: residential area (a portion of the total land area)
 */
export const UPDATE_LAND_AREA = 'INITIALIZE_LAND_AREA';
export const CREATE_AREA_DIVISION = 'CREATE_AREA_DIVISION';
export const UPDATE_AREA_DIVISION = 'UPDATE_AREA_DIVISION';
// not crucial
const DELETE_AREA_DIVISION = 'DELETE_AREA_DIVISION';

/**
 * create, update, delete buildings
 */
export const CREATE_BUILDING = 'CREATE_BUILDING';
export const UPDATE_BUILDING = 'UPDATE_BUILDING';
// not crucial
const DELETE_BUILDING = 'DELETE_BUILDING';

/**
 * Add a building unit to an existing building
 */
export const ADD_BUILDING_UNIT = 'ADD_BUILDING_UNIT';

export interface InitializeLandAreaAction {
    type: typeof UPDATE_LAND_AREA;

    // in square meter
    totalArea: number;
}

export interface CreateAreaDivisionAction {
    type: typeof CREATE_AREA_DIVISION;
    name: string;

    // area value
    area: number;
}

export interface UpdateAreaDivisionAction {
    type: typeof UPDATE_AREA_DIVISION;
    name: string;
    area: number;
}

export interface CreateBuildingAction {
    type: typeof CREATE_BUILDING;

    name: string;
    footprint: number;
}

export type ProductMixAction = InitializeLandAreaAction | CreateAreaDivisionAction | UpdateAreaDivisionAction | CreateBuildingAction;