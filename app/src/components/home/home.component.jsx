// import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import './home.scss';
import Tabs from '../tabs/tab.component';
import EmployeeList from '../employee/employeeList';
import { userURL } from '../../store/url/api';
import {setEmployeeList} from '../../store/actions/employee.action'
import { useDispatch,useSelector } from "react-redux";
import { getActiveEmployees } from '../../store/selectors/employeeListSelectors';


const Home = () => {
    const dispatch = useDispatch();
    const employeeList = useSelector(getActiveEmployees)
    
    useEffect(() => {
        const fetchData = async () => {
            const employeedata = await axios.get(userURL);
            dispatch(setEmployeeList(employeedata.data))
        }
        fetchData();
    }, [])
   
    //tabs data
    const tabs = [
        {
            id: 1,
            tabTitle: 'employee',
            title: 'Employee',
            content: <EmployeeList data={employeeList} />
        },
        {
            id: 2,
            tabTitle: 'project',
            title: 'Project',
            content: 'NO DATA!!'
        },
        {
            id: 3,
            tabTitle: 'vacation',
            title: 'Vacation',
            content: 'NO DATA!!'
        }
    ];
    return (
        <div className='container'>
            <div className='employee-table-section'>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
}

export default Home;
