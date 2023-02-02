import {FC} from 'react';
import styles from './Greeting.module.scss';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TGreetingForm} from './types';
import cn from 'classnames';
import {useNavigate} from 'react-router-dom';

const Greeting: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<TGreetingForm>({mode: 'onSubmit'});
    const navigate = useNavigate();
    const submitHandler: SubmitHandler<TGreetingForm> = data => {
        navigate('/choice', {state: {user: data}});
    };
    return (
        <div className={styles.greeting}>
            <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                <h1>Для початку тесту, введіть ваше ПІБ та групу</h1>
                <div className={cn(styles.formBlock, {[styles.error]: errors.name})}>
                    <label htmlFor="name">ПIБ</label>
                    <input type="text" id="name"
                           placeholder="Степаненко Руслан Олександрович" {...register('name', {
                        required: 'Введіть ПІБ',
                    })}/>
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className={cn(styles.formBlock, {[styles.error]: errors.group})}>
                    <label htmlFor="group">Група</label>
                    <input type="text" id="group"
                           placeholder="КН-343б" {...register('group', {
                        required: 'Введіть групу',
                    })}/>
                    {errors.group && <span>{errors.group.message}</span>}
                </div>
                <button className={styles.start}>Розпочати</button>
            </form>
        </div>
    );
};

export default Greeting;