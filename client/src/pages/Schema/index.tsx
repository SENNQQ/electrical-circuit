import React, {FC, useState} from 'react';
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

export interface IElementList {
    id: number,
    text: string,
    icon: FC<React.SVGProps<SVGSVGElement>>
}

const elementList: IElementList[] = [
    {id: 1, text: 'Бочка 1', icon: BarrelEl1},
    {id: 2, text: 'Бочка 2', icon: BarrelEl2},
    {id: 3, text: 'Бочка 3', icon: BarrelEl3},
    {id: 4, text: 'Бочка 4', icon: BarrelEl4},
    {id: 5, text: 'Бочка 5', icon: BarrelEl5},
    {id: 6, text: 'Бочка 6', icon: BarrelEl6},
    {id: 7, text: 'Бочка 7', icon: BarrelEl7},
    {id: 8, text: 'Зеленый резервуар 1', icon: GreenEl1},
    {id: 9, text: 'Зеленый резервуар 2', icon: GreenEl2},
    {id: 10, text: 'Кондиционер', icon: ConditionerEl},
    {id: 11, text: 'Мотор 1', icon: EngineEl1},
    {id: 12, text: 'Мотор 2', icon: EngineEl2},
    {id: 13, text: 'Мотор 3', icon: EngineEl3},
    {id: 14, text: 'Мотор 4', icon: EngineEl4},
    {id: 15, text: 'Посудина', icon: PlateEl},
    {id: 16, text: 'Радиатор 1', icon: RadiatorEl1},
    {id: 17, text: 'Радиатор 2', icon: RadiatorEl2},
    {id: 18, text: 'Радиатор 3', icon: RadiatorEl3},
    {id: 19, text: 'Радиатор 4', icon: RadiatorEl4},
    {id: 20, text: 'Радиатор 5', icon: RadiatorEl5},
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

const Schema = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [currentImg, setCurrentImg] = useState<IElementList & { key: number }>();
    const [items, setItems] = useState<TItem[]>([]);
    const [modal, setModal] = useState<{ isOpened: boolean, isCorrect: boolean }>();

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

    const pdfHandler = () => {
        modalHandler();

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
            <DrawingPanel dropItem={currentImg} items={items} setItems={setItems}/>
            <Modal onCloseModal={modalHandler} opened={modal?.isOpened!} className={styles.modal}>
                <h1>{modal?.isCorrect ? 'Схема була складена правильно' : 'Схема була складена неправильно'}</h1>
                <button className={styles.headerBtn} onClick={pdfHandler}>Зберегти в pdf форматі</button>
            </Modal>
        </div>
    );
};

export default Schema;