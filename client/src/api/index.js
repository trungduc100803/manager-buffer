import urlApi from "./urlApi"


const handleRequestApi = {
    singup: async (data) => {
        const res = await fetch(urlApi.signupUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const auth = await res.json()
        return auth
    },
    signin: async (formData) => {
        const res = await fetch(urlApi.signInUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const auth = await res.json()

        return auth
    },
    signout: async () => {
        const res = await fetch(urlApi.signOutUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const auth = await res.json()
        return auth
    },
    addChair: async (formData) => {
        const res = await fetch(urlApi.addChairUrl, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        const chair = await res.json()
        return chair
    },
    getAllChair: async () => {
        const res = await fetch(urlApi.getAllChairUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const chairs = await res.json()
        return chairs
    },
    deleteChair: async (idChair) => {
        const res = await fetch(urlApi.deleteChairUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idChair })
        })

        const chairs = await res.json()
        return chairs
    },
    getChairById: async (id) => {
        const res = await fetch(urlApi.getChairByIdUrl(id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const chair = await res.json()
        return chair
    },
    updateChair: async (formData, id) => {
        const res = await fetch(urlApi.updateChairUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const chairs = await res.json()
        return chairs
    },
    getAccountAdmin: async () => {
        const res = await fetch(urlApi.getAccountAdminUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const admin = await res.json()
        return admin
    },
    getAuthById: async (id) => {
        const res = await fetch(urlApi.getAuthByIdUrl(id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const auth = await res.json()
        return auth
    },
    addNotifyExportProduct: async (formData) => {
        const res = await fetch(urlApi.addNotifyProductUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const notifyProduct = await res.json()
        return notifyProduct
    },
    getAllNotifyProduct: async () => {
        const res = await fetch(urlApi.getAllNotifyProductUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const notifys = await res.json()
        return notifys
    }

}


export default handleRequestApi