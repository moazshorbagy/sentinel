/**
 * Default measuring unit is square meter
 */

export interface ProductMixState {
    landAreaDivision: LandAreaDivisionPlanning;
    buildings: BuildingDefinition[];
}

/**
 * The high level land planning
 * ex: in input sheet: land area has total area and is divided to residential, non-residential
 * and roads
 */
export interface LandAreaDivisionPlanning {
    totalArea: number;

    /**
     * The sum of land area divisions must be equal to the total land area
     */
    landAreaDivisions: LandAreaDivision[];
}

/**
 * E.g: residential area 
 */
export interface LandAreaDivision {
    name: string;
    area: number;
}

/**
 * A building can have more than buidling unit
 * E.g: a tower can have: offices, retail, mixed-use
 */
export interface BuildingDefinition {
    // to identify buildings
    id: number;
    name: string;

    /**
     * The area allocated for this building
     */
    footprint: number;
    buildingBuiltUpArea?: number;
    buildingUnits: BuildingUnitDefinition[];
    numberOfFloors?: number;

    /**
     * sellable area efficiency (%) = totalBuiltUpArea / totalSellableArea * 100 %
     */
    totalBuildingBuiltUpArea?: number;
    totalSellableArea?: number;
    sellableAreaEfficiency?: number;

    parkingAreaDefinition?: ParkingAreaDefinition;
}

/**
 * Building units definition per building
 */
export interface BuildingUnitDefinition {
    /**
     * Corresponds to unit type in the product mix excel sheet
     */
    name: string;
    assetType: string;
    numberOfUnits: number;
    sellableArea: number;
    sellableAreaEfficiency?: number;
    builtUpArea: number;
    numberOfParkingSlots?: number;
}

export interface ParkingAreaDefinition {
    /**
     * Area allocated for parking (total underground parking area)
     */
    totalArea: number;
    parkingSlotArea: number;
}