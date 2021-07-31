import React from 'react';
import { IIconProps } from './icon.props';

export const Icon: React.FC<IIconProps> = (props: IIconProps) => {
    return (
        <img
            src={props.iconUrl}
            alt={props.alt}
            width={props.width}
            height={props.height}
        ></img>
    );
};
