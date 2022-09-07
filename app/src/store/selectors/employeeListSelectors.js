import { createSelector } from 'reselect';

const selectEmplyeeReducer = (state) => state.employee;

export const getActiveEmployees = createSelector([selectEmplyeeReducer], (employee) => {
    return employee.userList
})

export const getEnrolledList = createSelector([selectEmplyeeReducer], (employee) => {
    return employee.enrolledEmployees
})