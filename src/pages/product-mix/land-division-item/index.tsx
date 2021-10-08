import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../services/redux/store";
import { LandAreaDivision } from "../../../services/redux/states/product-mix.state";
import {
  numberWithCommas,
  sqmToFed,
  toPercentage,
} from "../../../services/utils/measuring-units-converter";
import { DropdownList } from "../../../components/dropdown-list";
import { measuringUnits } from "../../../services/utils/measuring-unit";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductMixActions } from "../../../services/redux/actions/product-mix/product-mix.actions";
import watch from "redux-watch";

interface LandAreaItemProps {
  landArea: LandAreaDivision;
}

const unitTypes = [measuringUnits.FED, measuringUnits.SQM, measuringUnits.PER];
const producMixActions = new ProductMixActions();

const updateAreaInputValue = (
  unit: measuringUnits,
  areaInSQM: number,
  totalArea: number
) => {
  switch (unit) {
    case measuringUnits.FED:
      return sqmToFed(areaInSQM);
    case measuringUnits.PER:
      return toPercentage(totalArea, areaInSQM);
    default:
      return areaInSQM;
  }
};

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

  const totalAreaWatcher = watch(
    store.getState,
    "productMix.landAreaDivision.totalArea",
    (a, b) => a == b
  );

  useEffect(() => {
    store.subscribe(
      totalAreaWatcher((newVal: number, oldVal, objPath) => {
        setValue(updateAreaInputValue(unit, areaInSQM, newVal));
      })
    );
  }, [unit]);

  const setUnitHandler = (unit: measuringUnits) => {
    setUnit(unit);
    let remainingTypes = [...unitTypes];
    remainingTypes.splice(remainingTypes.indexOf(unit), 1);
    setOtherUnits(remainingTypes);
    setValue(updateAreaInputValue(unit, areaInSQM, totalArea));
  };

  let initialValue =
    unit == measuringUnits.PER
      ? toPercentage(totalArea, props.landArea.area)
      : unit == measuringUnits.FED
      ? sqmToFed(props.landArea.area)
      : props.landArea.area;

  const areaInSQM = useSelector(
    (rootState: RootState) =>
      rootState.productMix.landAreaDivision.landAreaDivisions.find(
        (div) => div.name === props.landArea.name
      ).area
  );

  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue(+event.target.value);
    dispatch(
      producMixActions.updateLandAreaDivision(
        props.landArea.name,
        +event.target.value,
        unit
      )
    );
  };

  return (
    // <div key={props.landArea.name}>
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
                value={value}
              />
            </td>
          </tr>
          {otherUnits.map((otherUnit, index) => {
            return (
              <tr key={`${otherUnit}_${index}`}>
                <td>{otherUnit}</td>
                <td>
                  {numberWithCommas(
                    otherUnit == measuringUnits.FED
                      ? sqmToFed(areaInSQM)
                      : otherUnit == measuringUnits.PER
                      ? toPercentage(totalArea, areaInSQM)
                      : areaInSQM
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    // </div>
  );
};
