import { Icon } from '../icon';
import { IIconProps } from '../icon/icon.props';
import './tool-bar.css';

interface IconButtonProps extends IIconProps {
    name: string
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
    return (
        <div className="icon-btn-container">
            <div>
                <Icon alt={props.alt} iconUrl={props.iconUrl} width={props.width} height={props.height} />
                <p>{props.name}</p>
            </div>
        </div>
    );
};