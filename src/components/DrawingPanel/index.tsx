import React, {CSSProperties, FC, useEffect, useRef} from 'react';
import st from './drawingpanel.module.scss';
import {IElementList} from '../Layout';
import ElementDrop from '../ElementDrop';


export interface TItem extends IElementList {
    key: number;
}

const DrawingPanel: FC<{
    dropItem: TItem | undefined,
    items: TItem[],
    setItems:  React.Dispatch<React.SetStateAction<TItem[]>>
}> = ({dropItem, items, setItems}) => {

    const refPanel = useRef<HTMLDivElement>(null);

    const positionArray: { id: number, positions: CSSProperties }[] = [
        {id: 0, positions: {top: '1%', left: '9%',  width: '4.3%', height: '5.6%'}},
        {id: 1, positions: {top: '8.5%', left: '9%', width: '4.3%', height: '5.6%'}},
        {id: 2, positions: {top: '16%', left: '9%', width: '4.3%', height: '5.6%'}},
        {id: 3, positions: {top: '23%', left: '9%', width: '4.3%', height: '5.6%'}},
        {id: 4, positions: {top: '30%', left: '9%', width: '4.3%', height: '5.6%'}},
        {id: 5, positions: {top: '39%', left: '9%', width: '4.3%', height: '5.6%'}},
        {id: 6, positions: {top: '26%', left: '25.8%', width: '12%', height: '15.6%'}},
        {id: 7, positions: {top: '4%', left: '29%', width: '12%', height: '15.6%'}},
        {id: 8, positions: {top: '67%', left: '37%', width: '7.8%', height: '6%'}},
        {id: 9, positions: {top: '77%', left: '37%', width: '7.8%', height: '6%'}},
        {id: 10, positions: {top: '66%', left: '62.5%', width: '8.5%', height: '11.1%'}},
        {id: 11, positions: {top: '48.5%', left: '62.5%', width: '8.5%', height: '11.1%'}},
        {id: 12, positions: {top: '30%', left: '59%', width: '8.5%', height: '11.1%'}},
        {id: 13, positions: {top: '15%', left: '52.5%', width: '7.8%', height: '6%'}},
        {id: 14, positions: {top: '8%', left: '58.5%', width: '4.3%', height: '5.6%'}},
        {id: 15, positions: {top: '8%', left: '64.5%', width: '4.3%', height: '5.6%'}},
        {id: 16, positions: {top: '15%', left: '70%', width: '7.8%', height: '6%'}},
        {id: 17, positions: {top: '3%', left: '89%', width: '12%', height: '15.6%'}},
        {id: 18, positions: {top: '21%', left: '89%', width: '12%', height: '7.6%'}},
        {id: 19, positions: {top: '37%', left: '88%', width: '8.5%', height: '11.1%'}},
    ];

    useEffect(() => {
        if (dropItem)
            setItems(prevState => {
                const find = prevState.find(item => item.key === dropItem.key);
                if (find)
                    return [...prevState.filter(item => item.key !== find.key), dropItem];
                return [...prevState, dropItem];
            });
    }, [dropItem]);


    return (
        <div className={st.panel}>
           <div className={st.panel2} ref={refPanel}>
               {positionArray.map((position) => (
                   <ElementDrop
                       key={position.id}
                       dropItem={items.find(item => item.key === position.id)}
                       index={position.id}
                       position={position.positions}
                   />
               ))}
           </div>
        </div>
    );
};

export default DrawingPanel;