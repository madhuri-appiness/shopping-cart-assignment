import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { enrollEmployee } from '../../store/actions/employee.action';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../table/table.component';
import { getEnrolledList } from '../../store/selectors/employeeListSelectors';

const EmployeeList = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const enrolledEmployees = useSelector(getEnrolledList);

    //get employee for enrollment
    const getEmpDetail = (emp) => {
        dispatch(enrollEmployee(emp))
        gotoEnrollForm();
    }

    // navigate to training form
     const gotoEnrollForm = (e) => {
        navigate("/training")
    };

    //creating table data
     const tableConstants = (getEmpDetail) => {
        return [
          {
            title: 'ID',
            render: rowData => {
              return <span>{rowData.id}</span>;
            },
          },
          {
            title: 'Name',
            render: rowData => {
              return <span>{rowData.name}</span>;
            },
          },
          {
            title: 'Company Name',
            render: rowData => {
              return <span>{rowData.company.name}</span>;
            },
          },
          {
            title: 'Action',
            render: rowData => {
                const disable = enrolledEmployees.find( item => item['id'] === rowData.id );
              return <button className='btn btn-primary' disabled={disable ? true : false} onClick={()=>getEmpDetail(rowData)}>{disable ? 'Enrolled' : 'Enroll'}</button>
            },
          },
        ];
      };

    return (
        <Fragment>
            <div className="container">
            <Table cols={tableConstants(getEmpDetail)} data={data} />
            </div>
        </Fragment>

    );
}

export default EmployeeList;
