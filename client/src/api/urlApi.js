const baseUrl = 'https://quanlykhohangokc.onrender.com/api/'

const urlApi = {
    signupUrl: baseUrl + 'auth/sign-up',
    signInUrl: baseUrl + 'auth/sign-in',
    signOutUrl: baseUrl + 'auth/sign-out',
    addChairUrl: baseUrl + 'chair/add-chair',
    getAllChairUrl: baseUrl + 'chair/get-all-chair',
    deleteChairUrl: baseUrl + 'chair/delete-chair',
    deleteTableUrl: baseUrl + 'table/delete-table',
    getAccountAdminUrl: baseUrl + 'auth/get-account-admin',
    getAuthByIdUrl: (id) => {
        return baseUrl + `auth/get-auth-by-id/${id}`
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
    updateTableUrl: (id) => {
        return baseUrl + `table/update-table/${id}`
    },
    addNotifyProductUrl: baseUrl + 'notify-product/add-notify-export-product',
    getAllNotifyProductUrl: baseUrl + 'notify-product/get-all-notify-export-product',
    editStatusNotifyProductUrl: baseUrl + 'notify-product/edit-status-notify-export-product',
    addBillUrl: baseUrl + 'bill/add-bill',
    addBillTableUrl: baseUrl + 'bill-table/add-bill-table',
    exportChairUrl: () => {
        return baseUrl + `chair/export-chair`
    },
    exportTableUrl: baseUrl + 'table/export-table' ,
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
    addTableUrl: baseUrl+ 'table/add-table',
    getAllTableUrl: baseUrl + 'table/get-all-table'

}


export default urlApi
