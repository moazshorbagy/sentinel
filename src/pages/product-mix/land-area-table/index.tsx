import React, { useEffect } from 'react';
import { DropdownList } from '../../../components/dropdown-list';
import "./land-area-tables.css";
import { ProductMixActions } from '../../../services/redux/actions/product-mix/product-mix.actions';
import { useDispatch } from 'react-redux';
import { measuringUnits } from '../../../services/utils/measuring-unit';
import { fedToSqm, sqmToFed, toPercentage } from '../../../services/utils/measuring-units-converter';

const productMixActions = new ProductMixActions();

function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const LandAreaTables: React.FC = () => {

    const dispatch = useDispatch();

    const [totalType, setTotalType] = React.useState(measuringUnits.FED);
    const [resedentialType, setResedentialType] = React.useState(measuringUnits.PER);
    const [nonResedentialType, setNonResedentialType] = React.useState(measuringUnits.PER);

    const [totalArea, setTotalArea] = React.useState(0);

    const totalTypes = [measuringUnits.FED, measuringUnits.SQM];
    const otherTypes = [measuringUnits.FED, measuringUnits.SQM, measuringUnits.PER];

    const totalAreaListener = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalArea(+event.target.value);
        console.log(totalType);
        dispatch(productMixActions.changeLandArea(+event.target.value, totalType));
    }

    const landAreaDivision = {
        totalArea: 1680000,
        landAreaDivisions: [
            {
                name: 'Residential Land',
                area: 840000
            },
            {
                name: 'Non-Residential Land',
                area: 201600
            },
            {
                name: 'Roads & Lanscape',
                area: 638400
            }
        ]
    }

    return (
        <div className="land-area-container">
            <table>
                <tbody>
                    <tr><th colSpan={2}>{'Land Area'}</th></tr>
                    <tr>
                        <td className="p-0">
                            <DropdownList list={totalTypes} value={totalType} setValue={setTotalType} /></td>
                        <td className="p-0"><input className="number-input" type="number" onChange={totalAreaListener} value={totalArea} /></td>
                    </tr>
                    <tr>
                        <td>{totalType == measuringUnits.FED ? measuringUnits.SQM : measuringUnits.FED}</td>
                        <td>{numberWithCommas(totalType == measuringUnits.FED ? fedToSqm(totalArea) : sqmToFed(totalArea))}</td>
                    </tr>
                </tbody>
            </table>
            {landAreaDivision.landAreaDivisions.map(landArea => {
                return (
                    <div className="pl4" key={landArea.name}>
                        <table>
                            <tbody>
                                <tr><th colSpan={2}>{landArea.name}</th></tr>
                                <tr>
                                    <td>%</td>
                                    <td>{toPercentage(landAreaDivision.totalArea, landArea.area)}%</td>
                                </tr>
                                <tr>
                                    <td>fed</td>
                                    <td>{sqmToFed(landArea.area)}</td>
                                </tr>
                                <tr>
                                    <td>sqm</td>
                                    <td>{landArea.area}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}

        </div>
    );
};
