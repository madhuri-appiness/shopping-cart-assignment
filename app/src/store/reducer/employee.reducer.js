const INITIAL_STATE = {
    userList: [],
    enrollEmp: {},
    enrolledEmployees: []
};


export const employeeReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_EMP_LIST":
            return { ...state, userList: payload.data }
        case "ENROLL_EMPLOYEE":
            return { ...state, enrollEmp: payload }
        case "ENROLL_EMPLOYEE_LIST":
            return { ...state, enrolledEmployees:  [...state.enrolledEmployees, payload]}

        default:
            return state;
    }
}