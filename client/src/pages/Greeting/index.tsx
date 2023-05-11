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
        navigate('/choice', {
            state: {
                user: {
                    name: data.name.trim().toLowerCase(),
                    group: data.group.trim().toUpperCase()
                }
            }
        });
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
                        validate: value => {
                            if (/[0-9]/.test(value))
                                return 'ПІБ не повинно містити цифри'
                            else if (value.trim().length === 0)
                                return 'Введіть ПІБ'
                        },
                        maxLength: {value: 100, message: 'Максимальна довжина 100 символів'},
                        minLength: {value: 5, message: 'Мінімальна довжина 5 символів'}
                    })}/>
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className={cn(styles.formBlock, {[styles.error]: errors.group})}>
                    <label htmlFor="group">Група</label>
                    <input type="text" id="group"
                           placeholder="КН-343б" {...register('group', {
                        required: 'Введіть групу',
                        validate: value => {
                            if (value.trim().length === 0)
                                return 'Введіть групу'
                        },
                        maxLength: {value: 8, message: 'Максимальна довжина 8 символів'},
                        minLength: {value: 5, message: 'Мінімальна довжина 5 символів'}
                    })}/>
                    {errors.group && <span>{errors.group.message}</span>}
                </div>
                <button className={styles.start}>Розпочати</button>
            </form>
        </div>
    );
};

export default Greeting;
