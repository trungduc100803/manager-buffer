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
    }

}


export default handleRequestApi