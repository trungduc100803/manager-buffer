// const baseUrl = 'https://quanlykhohangokc.onrender.com/api/'
const baseUrl = 'http://localhost:5000/api/'

const urlApi = {
    signupUrl: baseUrl + 'auth/sign-up',
    signInUrl: baseUrl + 'auth/sign-in',
    signOutUrl: baseUrl + 'auth/sign-out',
    addChairUrl: baseUrl + 'chair/add-chair',
    countChairUrl: baseUrl + 'chair/count-chair',
    countTableUrl: baseUrl + 'table/count-table',
    getAllChairUrl: baseUrl + 'chair/get-all-chair',
    deleteChairUrl: baseUrl + 'chair/delete-chair',
    deleteTableUrl: baseUrl + 'table/delete-table',
    getAccountAdminUrl: baseUrl + 'auth/get-account-admin',
    getWeeklyBillUrl: baseUrl + 'bill/get-weekly-bill',
    getMonthlyBillUrl: baseUrl + 'bill/get-monthly-bill',
    getWeeklyBillTableUrl: baseUrl + 'bill-table/get-weekly-bill-table',
    getMonthlyBillTableUrl: baseUrl + 'bill-table/get-monthly-bill-table',
    getAuthByIdUrl: (id) => {
        return baseUrl + `auth/get-auth-by-id/${id}`
    },
    changePasswordUrl: (id) => {
        return baseUrl + `auth/change-password/${id}`
    },
    getChairByIdUrl: (id) => {
        return baseUrl + `chair/get-chair-byId/${id}`
    },
    getTableByIdUrl: (id) => {
        return baseUrl + `table/get-table-byId/${id}`
    },
    updateChairUrl: (id) => {
        return baseUrl + `chair/update-chair/${id}`
    },
    editNameChairByIdUrl: (id) => {
        return baseUrl + `chair/edit-name-chair/${id}`
    },
    addNumberChairUrl: (id) => {
        return baseUrl + `chair/add-number-chair/${id}`
    },
    updateTableUrl: (id) => {
        return baseUrl + `table/update-table/${id}`
    },
    editNameTableUrl: (id) => {
        return baseUrl + `table/edit-name-table/${id}`
    },
    addNumberTableUrl: (id) => {
        return baseUrl + `table/add-number-table/${id}`
    },
    minusNumberTableUrl: (id) => {
        return baseUrl + `table/minus-number-table/${id}`
    },
    removeNumberChairErrUrl: (id) => {
        return baseUrl + `chair/remove-number-chair-error/${id}`
    },
    editNumberChairBeautifullUrl: (id) => {
        return baseUrl + `chair/edit-number-chair-beautifull/${id}`
    },
    addNotifyProductUrl: baseUrl + 'notify-product/add-notify-export-product',
    getAllNotifyProductUrl: baseUrl + 'notify-product/get-all-notify-export-product',
    editStatusNotifyProductUrl: baseUrl + 'notify-product/edit-status-notify-export-product',
    addBillUrl: baseUrl + 'bill/add-bill',
    addBillTableUrl: baseUrl + 'bill-table/add-bill-table',
    exportChairUrl: () => {
        return baseUrl + `chair/export-chair`
    },
    exportTableUrl: baseUrl + 'table/export-table',
    getBillTodayUrl: (today) => {
        return baseUrl + `bill/get-bill-today?today=${today}`
    },
    getBillTableTodayUrl: (today) => {
        return baseUrl + `bill-table/get-bill-table-today?today=${today}`
    },
    getBillOption: (startDate, endDate) => {
        return baseUrl + `bill/get-bill-option?startDate=${startDate}&endDate=${endDate}`
    },
    getBillTableOptionUrl: (startDate, endDate) => {
        return baseUrl + `bill-table/get-bill-table-option?startDate=${startDate}&endDate=${endDate}`
    },
    verifyPasswordUrl: baseUrl + 'auth/verify-password',
    updateAuthUrl: baseUrl + 'auth/update-auth',
    addTableUrl: baseUrl + 'table/add-table',
    getAllTableUrl: baseUrl + 'table/get-all-table'

}


export default urlApi
