import React, {CSSProperties, FC, RefObject, useEffect} from 'react';
import styles from './DrawingPanel.module.scss';
import {IElementList} from '../../pages/Schema';
import ElementDrop from '../ElementDrop';


export interface TItem extends IElementList {
    key: number;
}

const DrawingPanel: FC<{
    dropItem: TItem | undefined,
    positionArray: { id: number, positions: CSSProperties }[],
    panelRef: RefObject<HTMLDivElement>
    items: TItem[],
    setItems: React.Dispatch<React.SetStateAction<TItem[]>>
}> = ({dropItem, items, positionArray, panelRef, setItems}) => {

    // const refPanel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dropItem)
            setItems(prevState => {
                const find = prevState.find(item => item.key === dropItem.key);
                if (find)
                    return [...prevState.filter(item => item.key !== find.key), dropItem];
                return [...prevState, dropItem];
            });
    }, [dropItem, setItems]);

    return (
        <div className={styles.panel} ref={panelRef}>
            <div className={styles.panel2}>
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