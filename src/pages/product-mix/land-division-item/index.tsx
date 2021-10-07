import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../services/redux/store";
import { LandAreaDivision } from "../../../services/redux/states/product-mix.state";
import {
  numberWithCommas,
  sqmToFed,
  toPercentage,
} from "../../../services/utils/measuring-units-converter";
import { DropdownList } from "../../../components/dropdown-list";
import { measuringUnits } from "../../../services/utils/measuring-unit";
import { ChangeEvent, useState } from "react";
import { ProductMixActions } from "../../../services/redux/actions/product-mix/product-mix.actions";

interface LandAreaItemProps {
  landArea: LandAreaDivision;
}

const unitTypes = [measuringUnits.FED, measuringUnits.SQM, measuringUnits.PER];
const producMixActions = new ProductMixActions();

export const LandDivisionItemComponent: React.FC<LandAreaItemProps> = (
  props: LandAreaItemProps
) => {
  const dispatch = useDispatch();

  const { totalArea } = useSelector(
    (rootState: RootState) => rootState.productMix.landAreaDivision
  );

  const [unit, setUnit] = useState(measuringUnits.PER);

  const [otherUnits, setOtherUnits] = useState([
    measuringUnits.FED,
    measuringUnits.SQM,
  ]);

  const setUnitHandler = (unit: measuringUnits) => {
    setUnit(unit);
    let remainingTypes = [...unitTypes];
    remainingTypes.splice(remainingTypes.indexOf(unit), 1);
    setOtherUnits(remainingTypes);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      producMixActions.updateLandAreaDivision(
        props.landArea.name,
        +event.target.value,
        unit
      )
    );
  };

  return (
    <div className="pl4" key={props.landArea.name}>
      <table>
        <tbody>
          <tr>
            <th colSpan={2}>{props.landArea.name}</th>
          </tr>
          <tr>
            <td className="p-0">
              <DropdownList
                list={unitTypes}
                value={unit}
                setValue={setUnitHandler}
              />
            </td>
            <td className="p-0">
              <input
                className="number-input"
                type="number"
                onChange={onChangeHandler}
                value={
                  unit == measuringUnits.FED
                    ? sqmToFed(props.landArea.area)
                    : unit == measuringUnits.PER
                    ? toPercentage(totalArea, props.landArea.area)
                    : props.landArea.area
                }
              />
            </td>
          </tr>
          {otherUnits.map((otherUnit) => {
            return (
              <tr>
                <td>{otherUnit}</td>
                <td>
                  {numberWithCommas(
                    otherUnit == measuringUnits.FED
                      ? sqmToFed(props.landArea.area)
                      : otherUnit == measuringUnits.PER
                      ? toPercentage(totalArea, props.landArea.area)
                      : props.landArea.area
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
