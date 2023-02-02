import React, {FC, useEffect, useRef} from 'react';
import styles from './Modal.module.scss';
import {ModalType} from './types';
import {motion, AnimatePresence} from 'framer-motion';
import cn from 'classnames';

const Modal: FC<ModalType> = ({onCloseModal, opened, children, className}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<SVGSVGElement>(null);
    const modalChecker = useRef(false);

    useEffect(() => {
        const handleCheck = (e: MouseEvent) => {
            if (e.target === modalRef.current || e.target === closeRef.current || e.target === closeRef.current?.firstChild) {
                modalChecker.current = true;
            }
        };
        const handleOpened = (e: MouseEvent) => {
            if (e.target === modalRef.current || e.target === closeRef.current || e.target === closeRef.current?.firstChild) {
                if (modalChecker.current) {
                    modalChecker.current = false;
                    onCloseModal();
                }
            }
        };


        document.body.addEventListener('mousedown', handleCheck);
        document.body.addEventListener('mouseup', handleOpened);
        return () => {
            document.body.removeEventListener('mousedown', handleCheck);
            document.body.removeEventListener('mouseup', handleOpened);
        };
    }, [onCloseModal]);


    return (
        <AnimatePresence>
            {opened &&
                <motion.div className={styles.modalBlock} ref={modalRef}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}>
                    <motion.div className={cn(styles.modal, className)}
                                initial={{transform: 'translate(-50%,-45%)'}}
                                animate={{transform: 'translate(-50%,-50%)'}}
                                exit={{transform: 'translate(-50%,-45%)'}}>
                        <svg height="20px" viewBox="0 0 512 512" className={styles.modalClose} ref={closeRef}
                             width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                        </svg>
                        {children}
                    </motion.div>
                </motion.div>}
        </AnimatePresence>
    );
};

export default Modal;