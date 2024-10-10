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
    deleteTable: async (idTable) => {
        const res = await fetch(urlApi.deleteTableUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idTable })
        })

        const tables = await res.json()
        return tables
    },
    countChair: async () => {
        const res = await fetch(urlApi.countChairUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const count = await res.json()
        return count
    },
    countTable: async () => {
        const res = await fetch(urlApi.countTableUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const count = await res.json()
        return count
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
    editNameChairById: async (id, name) => {
        const res = await fetch(urlApi.editNameChairByIdUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
        const chairs = await res.json()
        return chairs
    },
    addNumberChairById: async (id, formData) => {
        const res = await fetch(urlApi.addNumberChairUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const chairs = await res.json()
        return chairs
    },
    updateTable: async (formData, id) => {
        const res = await fetch(urlApi.updateTableUrl(id), {
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
    },
    editStatusNotifyProduct: async (id) => {
        const res = await fetch(urlApi.editStatusNotifyProductUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        })
        const notifyProduct = await res.json()
        return notifyProduct
    },
    addBill: async (formData) => {
        const res = await fetch(urlApi.addBillUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const bill = await res.json()
        return bill
    },
    addBillTable: async (formData) => {
        const res = await fetch(urlApi.addBillTableUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const bill = await res.json()
        return bill
    },
    exportChair: async (chairData) => {
        const res = await fetch(urlApi.exportChairUrl(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ number: chairData.number, id: chairData.id })
        })
        const chair = await res.json()
        return chair
    },
    exportTable: async (tableData) => {
        const res = await fetch(urlApi.exportTableUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ number: tableData.number, id: tableData.id })
        })
        const chair = await res.json()
        return chair
    },
    removeNumberChairErr: async (id, formData) => {
        const res = await fetch(urlApi.removeNumberChairErrUrl(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ formData })
        })
        const chair = await res.json()

        return chair
    },
    getBillToday: async (today) => {
        const res = await fetch(urlApi.getBillTodayUrl(today), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const bills = await res.json()
        return bills
    },
    getBillTableToday: async (today) => {
        const res = await fetch(urlApi.getBillTableTodayUrl(today), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const bills = await res.json()
        return bills
    },
    getBillOption: async (startDate, endDate) => {
        const res = await fetch(urlApi.getBillOption(startDate, endDate), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const bills = await res.json()

        return bills
    },
    getBillOptionAndName: async (nameEmployee) => {
        const res = await fetch(urlApi.getBillOptionAndNameUrl(nameEmployee), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const bills = await res.json()

        return bills
    },
    getBillTableOption: async (startDate, endDate) => {
        const res = await fetch(urlApi.getBillTableOptionUrl(startDate, endDate), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const bills = await res.json()

        return bills
    },
    verifyPassword: async (data) => {
        const res = await fetch(urlApi.verifyPasswordUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const auth = await res.json()

        return auth
    },
    updateAuth: async (formData) => {
        const res = await fetch(urlApi.updateAuthUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        const auth = await res.json()

        return auth
    },
    addTable: async (formData) => {
        const res = await fetch(urlApi.addTableUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        const table = await res.json()

        return table
    },
    getAllTable: async () => {
        const res = await fetch(urlApi.getAllTableUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const tables = await res.json()

        return tables
    },
    getTableById: async (id) => {
        const res = await fetch(urlApi.getTableByIdUrl(id), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const table = await res.json()
        return table
    },
    editNumberChairBeautifull: async (id, number) => {
        const res = await fetch(urlApi.editNumberChairBeautifullUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(number)
        })
        const chairs = await res.json()
        return chairs
    },
    getWeeklyBill: async () => {
        const res = await fetch(urlApi.getWeeklyBillUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const bills = await res.json()
        return bills
    },
    getMonthlyBill: async () => {
        const res = await fetch(urlApi.getMonthlyBillUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const bills = await res.json()
        return bills
    },
    getWeeklyBillTable: async () => {
        const res = await fetch(urlApi.getWeeklyBillTableUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const bills = await res.json()
        return bills
    },
    getMonthlyBillTable: async () => {
        const res = await fetch(urlApi.getMonthlyBillTableUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const bills = await res.json()
        return bills
    },
    getAllAuth: async () => {
        const res = await fetch(urlApi.getAllAuthUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const auths = await res.json()
        return auths
    },
    editNameTableById: async (name, id) => {
        const res = await fetch(urlApi.editNameTableUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
        const tables = await res.json()
        return tables
    },
    addNumberTableById: async (numberNew, id) => {
        const res = await fetch(urlApi.addNumberTableUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ numberNew })
        })
        const tables = await res.json()
        return tables
    },
    minusNumberTableById: async (numberNew, id) => {
        const res = await fetch(urlApi.minusNumberTableUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ numberNew })
        })
        const tables = await res.json()
        return tables
    },
    changPassword: async (newPassword, id) => {
        const res = await fetch(urlApi.changePasswordUrl(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPass: newPassword })
        })
        const auth = await res.json()
        return auth
    },


}


export default handleRequestApi