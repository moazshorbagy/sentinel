import React from 'react';
import { DropdownList } from '../../../components/dropdown-list';
import { TextField } from '@mui/material';
import "./land-area-tables.css";

function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const round = (value: number, precision: number): number => {
    return +value.toFixed(precision);
}

const sqmToFed = (sqm: number): number => {
    return round(sqm / 4200, 2);;
}

const fedToSqm = (fed: number): number => {
    return fed * 4200;
}

const toPercentage = (a: number, b: number): number => {
    return round(b / a * 100, 2);
}

const fromPercentage = (total: number, percentage: number): number => {
    return total * percentage / 100;
}

export enum measuringUnits {
    FED = 'fed',
    SQM = 'sqm',
    PER = '%'
}

export const LandAreaTables: React.FC = () => {

    const [totalType, setTotalType] = React.useState(measuringUnits.FED);
    const [resedentialType, setResedentialType] = React.useState(measuringUnits.PER);
    const [nonResedentialType, setNonResedentialType] = React.useState(measuringUnits.PER);

    const [totalArea, setTotalArea] = React.useState(0);

    const totalTypes = [measuringUnits.FED, measuringUnits.SQM];
    const otherTypes = [measuringUnits.FED, measuringUnits.SQM, measuringUnits.PER];

    const totalAreaListener = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalArea(+event.target.value);
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
