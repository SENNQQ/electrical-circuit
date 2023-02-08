import React, {FC} from 'react';
import styles from './Loading.module.scss';
import {LoadingProps} from './types';
import cn from 'classnames';

/**
 * Компонент загрузки страницы*/
const Loading: FC<LoadingProps> = ({absolute, modal}) => {
    return (
        <div className={cn(styles.loading, {[styles.absolute]: absolute, [styles.modal]: modal})}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;