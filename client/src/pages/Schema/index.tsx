import React, {CSSProperties, FC, useRef, useState} from 'react';
import styles from './Schema.module.scss';
import DragElement from '../../components/DragElement';
import DrawingPanel, {TItem} from '../../components/DrawingPanel';
import {toast} from 'react-toastify';
import {ReactComponent as BarrelEl1} from '../../image/svg/бочка1.svg';
import {ReactComponent as BarrelEl2} from '../../image/svg/бочка2.svg';
import {ReactComponent as BarrelEl3} from '../../image/svg/бочка3.svg';
import {ReactComponent as BarrelEl4} from '../../image/svg/бочка4.svg';
import {ReactComponent as BarrelEl5} from '../../image/svg/бочка5.svg';
import {ReactComponent as BarrelEl6} from '../../image/svg/бочка6.svg';
import {ReactComponent as BarrelEl7} from '../../image/svg/бочка7.svg';
import {ReactComponent as GreenEl1} from '../../image/svg/зелень1.svg';
import {ReactComponent as GreenEl2} from '../../image/svg/зелень2.svg';
import {ReactComponent as ConditionerEl} from '../../image/svg/кондер.svg';
import {ReactComponent as EngineEl1} from '../../image/svg/мотор1.svg';
import {ReactComponent as EngineEl2} from '../../image/svg/мотор2.svg';
import {ReactComponent as EngineEl3} from '../../image/svg/мотор3.svg';
import {ReactComponent as EngineEl4} from '../../image/svg/мотор4.svg';
import {ReactComponent as PlateEl} from '../../image/svg/посудина.svg';
import {ReactComponent as RadiatorEl1} from '../../image/svg/радиатор1.svg';
import {ReactComponent as RadiatorEl2} from '../../image/svg/радиатор2.svg';
import {ReactComponent as RadiatorEl3} from '../../image/svg/радиатор3.svg';
import {ReactComponent as RadiatorEl4} from '../../image/svg/радиатор4.svg';
import {ReactComponent as RadiatorEl5} from '../../image/svg/радиатор5.svg';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from '../../components/Modal';
import axios from 'axios';
import * as htmlToImage from 'html-to-image';
import Loading from '../../components/Loading';

export interface IElementList {
    id: number,
    text: string,
    icon: FC<React.SVGProps<SVGSVGElement>>
}

const elementList: IElementList[] = [
    {id: 1, text: 'бочка1', icon: BarrelEl1},
    {id: 2, text: 'бочка2', icon: BarrelEl2},
    {id: 3, text: 'бочка3', icon: BarrelEl3},
    {id: 4, text: 'бочка4', icon: BarrelEl4},
    {id: 5, text: 'бочка5', icon: BarrelEl5},
    {id: 6, text: 'бочка6', icon: BarrelEl6},
    {id: 7, text: 'бочка7', icon: BarrelEl7},
    {id: 8, text: 'зелень1', icon: GreenEl1},
    {id: 9, text: 'зелень2', icon: GreenEl2},
    {id: 10, text: 'кондер', icon: ConditionerEl},
    {id: 11, text: 'мотор1', icon: EngineEl1},
    {id: 12, text: 'мотор1', icon: EngineEl2},
    {id: 13, text: 'мотор3', icon: EngineEl3},
    {id: 14, text: 'мотор4', icon: EngineEl4},
    {id: 15, text: 'посудина', icon: PlateEl},
    {id: 16, text: 'радиатор1', icon: RadiatorEl1},
    {id: 17, text: 'радиатор2', icon: RadiatorEl2},
    {id: 18, text: 'радиатор3', icon: RadiatorEl3},
    {id: 19, text: 'радиатор4', icon: RadiatorEl4},
    {id: 20, text: 'радиатор5', icon: RadiatorEl5},
];


const correctAnswer = [
    {
        id: 1,
        key: 9,
    },
    {
        id: 2,
        key: 6,
    },
    {
        id: 3,
        key: 7,
    },
    {
        id: 4,
        key: 10,
    },
    {
        id: 5,
        key: 11,
    },
    {
        id: 6,
        key: 14,
    },
    {
        id: 7,
        key: 15,
    },
    {
        id: 8,
        key: 17,
    },
    {
        id: 9,
        key: 18,
    },
    {
        id: 10,
        key: 5,
    },
    {
        id: 11,
        key: 8,
    },
    {
        id: 12,
        key: 13,
    },
    {
        id: 13,
        key: 16,
    },
    {
        id: 14,
        key: 19,
    },
    {
        id: 15,
        key: 12,
    },
    {
        id: 16,
        key: 4,
    },
    {
        id: 17,
        key: 3,
    },
    {
        id: 18,
        key: 2,
    },
    {
        id: 19,
        key: 1,
    },
    {
        id: 20,
        key: 0,
    },
];

const positionArray: { id: number, positions: CSSProperties }[] = [
    {id: 0, positions: {top: '1%', left: '18.2%', width: '4.3%', height: '5.6%'}},
    {id: 1, positions: {top: '9.5%', left: '18.2%', width: '4.3%', height: '5.6%'}},
    {id: 2, positions: {top: '18%', left: '18.2%', width: '4.3%', height: '5.6%'}},
    {id: 3, positions: {top: '27%', left: '18.2%', width: '4.3%', height: '5.6%'}},
    {id: 4, positions: {top: '35%', left: '18.2%', width: '4.3%', height: '5.6%'}},
    {id: 5, positions: {top: '45%', left: '18.2%', width: '4.3%', height: '5.6%'}},
    {id: 6, positions: {top: '26%', left: '31%', width: '12%', height: '15.6%'}},
    {id: 7, positions: {top: '4%', left: '31%', width: '12%', height: '15.6%'}},
    {id: 8, positions: {top: '67%', left: '37%', width: '7.8%', height: '6%'}},
    {id: 9, positions: {top: '77%', left: '37%', width: '7.8%', height: '6%'}},
    {id: 10, positions: {top: '66%', left: '62.5%', width: '8.5%', height: '11.1%'}},
    {id: 11, positions: {top: '48.5%', left: '62.5%', width: '8.5%', height: '11.1%'}},
    {id: 12, positions: {top: '30%', left: '59%', width: '8.5%', height: '11.1%'}},
    {id: 13, positions: {top: '15%', left: '52.5%', width: '7.8%', height: '6%'}},
    {id: 14, positions: {top: '8%', left: '55.5%', width: '4.3%', height: '5.6%'}},
    {id: 15, positions: {top: '8%', left: '64.5%', width: '4.3%', height: '5.6%'}},
    {id: 16, positions: {top: '15%', left: '70%', width: '7.8%', height: '6%'}},
    {id: 17, positions: {top: '3%', left: '79%', width: '12%', height: '15.6%'}},
    {id: 18, positions: {top: '21%', left: '79%', width: '12%', height: '7.6%'}},
    {id: 19, positions: {top: '37%', left: '78%', width: '8.5%', height: '11.1%'}},
];

const Schema = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const panelRef = useRef<HTMLDivElement>(null);

    const [currentImg, setCurrentImg] = useState<IElementList & { key: number }>();
    const [items, setItems] = useState<TItem[]>([]);
    const [modal, setModal] = useState<{ isOpened: boolean, isCorrect: boolean }>();
    const [isLoading, setIsLoading] = useState(false);

    const setItemHandler = (item: IElementList, key: string) => {
        setCurrentImg({...item, key: Number(key)});
    };
    const answerHandler = () => {
        if (items.length !== correctAnswer.length)
            return toast.error('Не всі комірки заповнені');
        const answers = correctAnswer.reduce((sum, answer) => {
            items.forEach(item => {
                if (item.key === answer.key && item.id === answer.id)
                    sum++;
            });
            return sum;
        }, 0);
        if (answers === correctAnswer.length)
            setModal({isOpened: true, isCorrect: true});
        else
            setModal({isOpened: true, isCorrect: false});
    };

    const modalHandler = () => {
        setModal(undefined);
        navigate('/');
        window.history.replaceState({}, document.title);
    };

    const pdfHandler = async () => {
        if (panelRef.current) {
            setIsLoading(true);
            const dataURI = await htmlToImage.toPng(panelRef.current);
            const {data} = await axios.post('http://localhost:4000/api/export/pdf', {
                name: location.state.user.name,
                group: location.state.user.group,
                department: location.state.choice.department,
                schemaTitle: location.state.choice.schema.title,
                dataURI,
            });
            if (data.filePath) {
                window.open(data.filePath, '_blank')?.focus();
                modalHandler();
            }
            setIsLoading(false);
        }
        // const answers = items.map(item => {
        //     let newItem;
        //     positionArray.forEach(pos => {
        //         if (pos.id === item.key)
        //             newItem = {name: item.text, positions: pos.positions};
        //     });
        //     return newItem;
        // });

        // console.log(data);
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <h1>{location.state.choice.department}</h1>
                    <h2>{location.state.choice.schema.title}</h2>
                    <div className={styles.headerInfo}>
                        <div><span>Студент:</span> {location.state.user.name}</div>
                        <div><span>Група:</span> {location.state.user.group}</div>
                    </div>
                </div>
                <button className={styles.headerBtn} onClick={answerHandler}>Перевірити</button>
            </header>
            <aside>
                <div className={styles.dragContainer}>
                    {elementList.map((item) => (
                        <DragElement key={item.id} item={item} cb={setItemHandler}/>
                    ))}
                </div>
            </aside>
            <DrawingPanel dropItem={currentImg} items={items} setItems={setItems} positionArray={positionArray}
                          panelRef={panelRef}/>
            <Modal onCloseModal={modalHandler} opened={modal?.isOpened!} className={styles.modal}>
                {isLoading && <Loading modal={true} absolute={true}/>}
                <h1>{modal?.isCorrect ? 'Схема була складена правильно' : 'Схема була складена неправильно'}</h1>
                <button className={styles.headerBtn} onClick={pdfHandler}>Зберегти в pdf форматі</button>
            </Modal>
        </div>
    );
};

export default Schema;