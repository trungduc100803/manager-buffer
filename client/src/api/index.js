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
    }
}


export default handleRequestApi