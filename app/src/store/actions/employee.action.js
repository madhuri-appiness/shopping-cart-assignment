function setEmployeeList(data) {
    return {
        type: "SET_EMP_LIST",
        payload:  {data} 
    }
}

function enrollEmployee(emp){
    return {
        type:"ENROLL_EMPLOYEE",
        payload:{emp}
    }
}

function enrollEmployeList(data){
    console.log(data)
    return {
        type:"ENROLL_EMPLOYEE_LIST",
        payload:data
    }
}





export { setEmployeeList,enrollEmployee ,enrollEmployeList}