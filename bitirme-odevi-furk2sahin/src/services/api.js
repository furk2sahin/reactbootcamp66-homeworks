import axios from 'axios';

const instance1 = axios.create({ //parking_owner, parking, blacklist, employees
    baseURL: 'https://5fb80d938e07f00016643932.mockapi.io/api'
})

const instance2 = axios.create({ //entrance_exit_log, park_area, report_list
    baseURL: 'https://5faad17ab5c645001602b29c.mockapi.io/api'
})

const instance3 = axios.create({ //users, vehicles
    baseURL: 'https://5fb81d458e07f00016643a28.mockapi.io/api'
})

//parking_owner

export const getParkingOwners = () => {
    return instance1.get('/parking_owner');
}

export const getParkingOwnerById = (parkingOwnerId) => {
    return instance1.get(`/parking_owner/${parkingOwnerId}`);
}

export const updateParkingOwner = (parkingOwnerId, parkingOwner) => {
    return instance1.put(`/parking_owner/${parkingOwnerId}`, parkingOwner);
}

export const deleteParkingOwner = (parkingOwnerId) => {
    return instance1.delete(`/parking_owner/${parkingOwnerId}`);
}

//parking

export const getParkings = () => {
    return instance1.get('/parking');
}

export const getParkingById = (parkingId) => {
    return instance1.get(`/parking/${parkingId}`);
}

export const createParking = (parking) => {
    return instance1.post('/parking', parking);
}

export const updateParking = (parkingId, parking) => {
    return instance1.put(`/parking/${parkingId}`, parking);
}

export const deleteParking = (parkingId) => {
    return instance1.delete(`/parking/${parkingId}`);
}

//blacklist

export const getBlacklist = () => {
    return instance1.get('/blacklist');
}

export const getBlacklistItemById = (blacklistId) => {
    return instance1.get(`/blacklist/${blacklistId}`);
}

export const createBlacklistItem = (blacklist) => {
    return instance1.post('/blacklist', blacklist);
}

export const deleteBlacklistItem = (blacklistId) => {
    return instance1.delete(`/blacklist/${blacklistId}`);
}

//employees

export const getEmployees = () => {
    return instance1.get('/employees');
}

export const getEmployeeById = (employeeId) => {
    return instance1.get(`/employees/${employeeId}`);
}

export const createEmployee = (employee) => {
    return instance1.post('/employees', employee);
}

export const updateEmployee = (employeeId, employee) => {
    return instance1.put(`/employees/${employeeId}`, employee);
}

export const deleteEmployee = (employeeId) => {
    return instance1.delete(`/employees/${employeeId}`);
}

//entrance_exit_log

export const getEntranceExitLogs = () => {
    return instance2.get('/entrance_exit_log');
}

export const getEntranceExitLogById = (entranceExitLogId) => {
    return instance2.get(`/entrance_exit_log/${entranceExitLogId}`);
}

export const createEntranceExitLog = (entranceExitLog) => {
    return instance2.post('/entrance_exit_log', entranceExitLog);
}

export const updateEntranceExitLog = (entranceExitLogId, entranceExitLog) => {
    return instance2.put(`/entrance_exit_log/${entranceExitLogId}`, entranceExitLog);
}

export const deleteEntranceExitLog = (entranceExitLogId) => {
    return instance2.delete(`/entrance_exit_log/${entranceExitLogId}`);
}

//park_area

export const getParkAreas = () => {
    return instance2.get('/park_area');
}

export const getParkAreaById = (parkAreaId) => {
    return instance2.get(`/park_area/${parkAreaId}`);
}

export const createParkArea = (parkArea) => {
    return instance2.post('/park_area', parkArea);
}

export const updateParkArea = (parkAreaId, parkArea) => {
    return instance2.put(`/park_area/${parkAreaId}`, parkArea);
}

export const deleteParkArea = (parkAreaId) => {
    return instance2.delete(`/park_area/${parkAreaId}`);
}

//report_list

export const getReportList = () => {
    return instance2.get('/report_list');
}

export const getReportListItemById = (reportListId) => {
    return instance2.get(`/report_list/${reportListId}`);
}

export const createReportListItem = (reportList) => {
    return instance2.post('/report_list', reportList);
}

export const updateReportListItem = (reportListId, reportList) => {
    return instance2.put(`/report_list/${reportListId}`, reportList);
}

export const deleteReportListItem = (reportListId) => {
    return instance2.delete(`/report_list/${reportListId}`);
}

//users

export const getUsers = () => {
    return instance3.get('/users');
}

export const getUserById = (userId) => {
    return instance3.get(`/users/${userId}`);
}

export const createUser = (user) => {
    return instance3.post('/users', user);
}

export const updateUser = (userId, user) => {
    return instance3.put(`/users/${userId}`, user);
}

export const deleteUser = (userId) => {
    return instance3.delete(`/users/${userId}`);
}

//vehicles

export const getVehicles = () => {
    return instance3.get('/vehicles');
}

export const getVehicleById = (vehicleId) => {
    return instance3.get(`/vehicles/${vehicleId}`);
}

export const createVehicle = (vehicle) => {
    return instance3.post('/vehicles', vehicle);
}

export const updateVehicle = (vehicleId, vehicle) => {
    return instance3.put(`/vehicles/${vehicleId}`, vehicle);
}

export const deleteVehicle = (vehicleId) => {
    return instance3.delete(`/vehicles/${vehicleId}`);
}