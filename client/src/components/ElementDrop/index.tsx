import React, {CSSProperties, FC} from 'react';
import st from './elememntDrop.module.scss';
import {IElementList} from '../Layout';
import cn from 'classnames';

interface IElementDrop {
    dropItem?: IElementList,
    index: number,
    position: CSSProperties
}

const ElementDrop: FC<IElementDrop> = ({dropItem, index, position}) => {


    return (
        <div className={cn([st.dropCard], 'dropZone')} style={position} data-key={index}>
            {dropItem && <dropItem.icon/>}
        </div>
    );
};

export default ElementDrop;