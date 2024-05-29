const baseUrl = 'http://localhost:5000/api/'

const urlApi = {
    signupUrl: baseUrl + 'auth/sign-up',
    signInUrl: baseUrl + 'auth/sign-in',
    signOutUrl: baseUrl + 'auth/sign-out',
    addChairUrl: baseUrl + 'chair/add-chair',
    getAllChairUrl: baseUrl + 'chair/get-all-chair',
    deleteChairUrl: baseUrl + 'chair/delete-chair',
    getChairByIdUrl: (id) => {
        return baseUrl + `chair//get-chair-byId/${id}`
    },
}


export default urlApi