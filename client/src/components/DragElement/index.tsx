import React, {FC, useState} from 'react';
import {IElementList} from '../../pages/Schema';
import styles from './DragElement.module.scss';


interface IElementPos {
    shape?: { x: number, y: number };
    dragOffset?: { x: number, y: number };
}

const DragElement: FC<{ item: IElementList, cb: (item: IElementList, key: string) => void }> =
    ({item, cb}) => {

        const [position, setPosition] = useState<IElementPos>({
            shape: {x: 0, y: 0},
            dragOffset: {x: 0, y: 0},
        });

        const [isVisibleAvatar, setIsVisibleAvatar] = useState<boolean>(false);

        const mouseDownHandler = (e: React.MouseEvent<SVGSVGElement>, item: IElementList) => {
            e.preventDefault();

            if (e.buttons !== 1)
                return;

            let target = e.target as SVGSVGElement;
            if (target.nodeName === 'svg')
                target = target.firstChild as SVGSVGElement;

            let point = {x: 0, y: 0};
            point.x = target.ownerSVGElement?.width.baseVal.value! / 2;
            point.y = target.ownerSVGElement?.height.baseVal.value! / 2;

            setPosition({
                shape: {
                    x: e.clientX - point.x,
                    y: e.clientY - point.y,
                },
                dragOffset: {
                    x: point.x,
                    y: point.y,
                },
            });
            setIsVisibleAvatar(true);


            const mousemove = (e: MouseEvent) => {
                e.preventDefault();
                point.x = e.clientX;
                point.y = e.clientY;
                console.log(e);
                setPosition(prevState => ({
                    ...prevState,
                    shape: {
                        x: point.x - prevState.dragOffset?.x!,
                        y: point.y - prevState.dragOffset?.y!,
                    },
                }));
            };

            const mouseup = () => {
                const elements = document.elementsFromPoint(point.x, point.y) as HTMLDivElement[];
                elements.forEach(el => {
                    if (el.classList.contains('dropZone')) {
                        cb(item, el.dataset.key!);
                    }
                });

                setPosition({shape: {x: 0, y: 0}, dragOffset: {x: 0, y: 0}});
                setIsVisibleAvatar(false);
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
            };

            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);

        };

        return (
            <div className={styles.dragElement}>
                <item.icon onMouseDown={e => mouseDownHandler(e, item)}/>
                {isVisibleAvatar &&
                    <div style={{top: position.shape?.y!, left: position.shape?.x!, position: 'fixed', zIndex: 100}}>
                        <item.icon/>
                    </div>}
            </div>
        );
    };

export default DragElement;