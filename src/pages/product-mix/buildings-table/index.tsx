import { useDispatch } from "react-redux";
import { store } from "../../../services/redux/store";
import "./buildings-table.css";
import { measuringUnits } from "../../../services/utils/measuring-unit";
import { MouseEvent, useState } from "react";
import { BuildingRow } from "./building-row";
import { ProductMixActions } from "../../../services/redux/actions/product-mix/product-mix.actions";

const productMxActions = new ProductMixActions();

export const BuildingsTable: React.FC = () => {
  const dispatch = useDispatch();

  const [buildings, setBuildings] = useState(
    store.getState().productMix.buildings
  );

  const availableUnits = [measuringUnits.SQM, measuringUnits.FED];
  const [measuringUnit, setMeasuringUnit] = useState(measuringUnits.FED);

  const createBuildingClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(productMxActions.createBuildingAction("", 100));
    setBuildings([...store.getState().productMix.buildings]);
  };


  return (
    <div className="buildings-table-container">
      <div style={{ display: "grid", justifyContent: "center" }}>
        <h1>Buildings</h1>
      </div>
      <table>
        <tbody>
          <tr>
            <th>{"Building Type"}</th>
            <th>{"Foot-print / Building"}</th>
            <th>{"Number of floors"}</th>
          </tr>
          {buildings.map((building, index) => {
            return (
              <BuildingRow
                key={index}
                id={building.id}
                initialFootPrint={building.footprint}
                initialName={building.name}
              />
            );
          })}
        </tbody>
      </table>
      <div style={{ cursor: "pointer" }} onClick={createBuildingClickHandler}>
        <p style={{ margin: "10px" }}>+ Add Building</p>
      </div>
    </div>
  );
};
