import React, { useEffect } from 'react';
import { DropdownList } from '../../../components/dropdown-list';
import "./land-area-tables.css";
import { ProductMixActions } from '../../../services/redux/actions/product-mix/product-mix.actions';
import { useDispatch, useSelector } from 'react-redux';
import { measuringUnits } from '../../../services/utils/measuring-unit';
import { fedToSqm, numberWithCommas, sqmToFed } from '../../../services/utils/measuring-units-converter';
import { RootState } from '../../../services/redux/store';
import { LandDivisionItemComponent } from '../land-division-item';

const productMixActions = new ProductMixActions();

export const LandAreaTables: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productMixActions.changeLandArea(1680000, measuringUnits.SQM));
        dispatch(productMixActions.createLandAreaDivision('Residential Land', 34, measuringUnits.PER));
        dispatch(productMixActions.createLandAreaDivision('Non-Residential Land', 33, measuringUnits.PER));
        dispatch(productMixActions.createLandAreaDivision('Roads & Lanscape', 33, measuringUnits.PER));
    }, []);

    const [totalType, setTotalType] = React.useState(measuringUnits.SQM);

    const {landAreaDivisions, totalArea} = useSelector((rootState: RootState) => rootState.productMix.landAreaDivision);

    const [totalLandArea, setTotalArea] = React.useState(1680000);

    const totalTypes = [measuringUnits.FED, measuringUnits.SQM];

    const totalAreaListener = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalArea(+event.target.value);
        dispatch(productMixActions.changeLandArea(+event.target.value, totalType));
    }

    const totalTypeChangeHandler = (unit: measuringUnits) => {
        setTotalType(unit);
        switch(unit) {
            case measuringUnits.FED: 
                setTotalArea(sqmToFed(totalArea));
                break;
            default:
                setTotalArea(totalArea);
        }
    }

    return (
        <div className="land-area-container">
            <table>
                <tbody>
                    <tr><th colSpan={2}>{'Land Area'}</th></tr>
                    <tr>
                        <td className="p-0">
                            <DropdownList list={totalTypes} value={totalType} setValue={totalTypeChangeHandler} /></td>
                        <td className="p-0"><input className="number-input" type="number" onChange={totalAreaListener} value={totalLandArea}/></td>
                    </tr>
                    <tr>
                        <td>{totalType == measuringUnits.FED ? measuringUnits.SQM : measuringUnits.FED}</td>
                        <td>{numberWithCommas(totalType == measuringUnits.FED ? fedToSqm(totalLandArea) : sqmToFed(totalLandArea))}</td>
                    </tr>
                </tbody>
            </table>
            {landAreaDivisions.map(landArea => {
                return (
                    <LandDivisionItemComponent key={landArea.name} landArea={landArea} />
                );
            })}

        </div>
    );
};
