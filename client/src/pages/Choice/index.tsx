import {FC, useCallback, useEffect, useState} from 'react';
import styles from './Choice.module.scss';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {TChoice, TSchema, TStudent} from './types';
import axios from "axios";


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
    const [student, setStudent] = useState<TStudent[]>([])
    const location = useLocation();
    const navigate = useNavigate();

    const filterChoices = useCallback((schema: TChoice) => {
        let skip = true;
        student.forEach(item => {
            if (item.schema === schema.name && item.attempt === 2) {
                skip = false
            }
        })
        return skip
    }, [student])

    useEffect(() => {
        if (!location.state?.user) {
            toast.warning('Введіть ПІБ та групу', {
                toastId: 'toast_user_exception',
            });
            navigate('/');
        }
    }, [location.state?.user, navigate]);

    useEffect(() => {
        axios.post<{ student?: TStudent[] }>('http://localhost:4000/api/student/get', {
            name: location.state.user.name,
            group: location.state.user.group
        }).then(res => {
            if (res.data.student)
                setStudent(res.data.student)
        })
    }, [location.state.user])
    const locateHandler = (schema: TChoice, department: string) => {
        navigate('/schema', {state: {user: location.state.user, choice: {schema, department}}});
    };

    return (
        <div className={styles.choice}>
            <div className={styles.choiceInner}>
                {choices.map(choice => ({
                    ...choice, schemas: choice.schemas.filter(filterChoices)
                })).filter(choice => choice.schemas.length > 0).length > 0 ?
                    choices.map(choice => ({
                        ...choice, schemas: choice.schemas.filter(filterChoices)
                    })).filter(choice => choice.schemas.length > 0).map(choice => (
                        <div key={choice.department} className={styles.block}>
                            <h1>{choice.department}</h1>
                            {choice.schemas.map(schema =>
                                <button className={styles.btn} key={schema.name}
                                        onClick={() => locateHandler(schema, choice.department)}>{schema.title}</button>)}
                        </div>))
                    : <div className={styles.empty}>
                        <h1>Ви витратили всі спроби проходження</h1>
                        <Link to="/">Назад</Link>
                    </div>}
            </div>
        </div>
    );
};

export default Choice;
