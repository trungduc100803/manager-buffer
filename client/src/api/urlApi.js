const baseUrl = 'http://localhost:5000/api/'

const urlApi = {
    signupUrl: baseUrl + 'auth/sign-up',
    signInUrl: baseUrl + 'auth/sign-in',
    signOutUrl: baseUrl + 'auth/sign-out',
    addChairUrl: baseUrl + 'chair/add-chair',
    getAllChairUrl: baseUrl + 'chair/get-all-chair',
    deleteChairUrl: baseUrl + 'chair/delete-chair',
    getAccountAdminUrl: baseUrl + 'auth/get-account-admin',
    getAuthByIdUrl: (id) => {
        return baseUrl + `auth/get-auth-by-id/${id}`
    },
    getChairByIdUrl: (id) => {
        return baseUrl + `chair/get-chair-byId/${id}`
    },
    updateChairUrl: (id) => {
        return baseUrl + `chair/update-chair/${id}`
    },
    addNotifyProductUrl: baseUrl + 'notify-product/add-notify-export-product',
    getAllNotifyProductUrl: baseUrl + 'notify-product/get-all-notify-export-product',
    editStatusNotifyProductUrl: baseUrl + 'notify-product/edit-status-notify-export-product',
    addBillUrl: baseUrl + 'bill/add-bill',
    exportChairUrl: (id) => {
        return baseUrl + `chair/export-chair/${id}`
    }

}


export default urlApi