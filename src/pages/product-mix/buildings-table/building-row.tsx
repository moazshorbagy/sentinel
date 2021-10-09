import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductMixActions } from "../../../services/redux/actions/product-mix/product-mix.actions";
import { RootState, store } from "../../../services/redux/store";

interface BuildingRowProps {
  id: number;
  initialName: string;
  initialFootPrint: number;
}

const productMixActions = new ProductMixActions();

export const BuildingRow: React.FC<BuildingRowProps> = (
  props: BuildingRowProps
) => {
  const dispatch = useDispatch();

  const [buildingName, setBuildingName] = useState(props.initialName);
  const [footPrint, setFootPrint] = useState(props.initialFootPrint);

  const changeBuildingNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBuildingName(event.target.value);
    dispatch(
      productMixActions.updateBuildingName(props.id, event.target.value)
    );
  };

  const changeBuildingFootPrintHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFootPrint(+event.target.value);
  };

  const numberOfFloors = useSelector(
    (rootState: RootState) =>
      rootState.productMix.buildings.find(
        (buidling) => buidling.name == buildingName
      )?.numberOfFloors
  );

  // const numberOfFloors = 0;

  return (
    <tr>
      <td className="p-0">
        <input
          type="text"
          className="number-input"
          value={buildingName}
          onChange={changeBuildingNameHandler}
        />
      </td>
      <td className="p-0">
        <input
          className="number-input"
          value={footPrint}
          type="number"
          onChange={changeBuildingFootPrintHandler}
        />
      </td>
      <td>{numberOfFloors}</td>
    </tr>
  );
};
