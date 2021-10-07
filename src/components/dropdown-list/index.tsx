import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { measuringUnits } from '../../services/utils/measuring-unit';

type Props = {
    list: measuringUnits[];
    value: measuringUnits;
    setValue: React.Dispatch<React.SetStateAction<measuringUnits>>
}

export class DropdownList extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    handleChange = (event: SelectChangeEvent) => {
        this.props.setValue(event.target.value as measuringUnits);
    };

    render() {
        return (
            <Select
                fullWidth
                value={this.props.value}
                onChange={this.handleChange}
            >
                {this.props.list.map(item => {
                    return <MenuItem key={item} value={item}>{item}</MenuItem>;
                })}
            </Select>
        );
    }
}
