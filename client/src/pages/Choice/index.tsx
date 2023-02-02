import {FC, useEffect} from 'react';
import styles from './Choice.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {TChoice, TSchema} from './types';


const choices: TSchema[] = [
    {
        department: 'Кафедра\n"Холодильних установок та кондиціювання повітря"',
        schemas: [
            {
                name: 'ammonia_easy',
                title: 'Аміачна холодильна машина (проста схема)',
            },
            {
                name: 'ammonia_hard',
                title: 'Аміачна холодильна машина (складна схема)',
            },
            {
                name: 'freon_easy',
                title: 'Фреонова холодильна машина (проста схема)',
            },
        ],
    },
    {
        department: 'Кафедра\n"Кріогенної техніки"',
        schemas: [
            {
                name: 'multi-stage',
                title: 'Багатоступеневі холодильні машини',
            },
        ],
    },
];

const Choice: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!location.state?.user) {
            toast.warning('Введіть ПІБ та групу', {
                toastId: 'toast_user_exception',
            });
            navigate('/');
        }
    }, [location.state?.user, navigate]);

    const locateHandler = (schema: TChoice, department: string) => {
        navigate('/schema', {state: {user: location.state.user, choice: {schema, department}}});
    };

    return (
        <div className={styles.choice}>
            <div className={styles.choiceInner}>
                {choices.map(choice => (<div key={choice.department} className={styles.block}>
                    <h1>{choice.department}</h1>
                    {choice.schemas.map(schema =>
                        <button className={styles.btn} key={schema.name}
                                onClick={() => locateHandler(schema, choice.department)}>{schema.title}</button>)}
                </div>))}
            </div>
        </div>
    );
};

export default Choice;