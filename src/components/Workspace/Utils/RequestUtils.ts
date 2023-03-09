
import axios from 'axios'
import moment from 'moment'

/**
 * 定义一些Web方法和状态信息
 */
export class RequestUtils {

    private static online: boolean = false
    private static userName: string = 'Customer20230223003542'
    private static password: string = 'Password1'
    private static token: string | null = null
    private static serverAddress: string = 'http://127.0.0.1:8080'

    private static getServerAddress() : string {
        return RequestUtils.serverAddress;
    }

    public static register(name: string, password: string) {
        RequestUtils.userName =  name
        RequestUtils.password = password
        const data = {
            name: RequestUtils.userName,
            password: RequestUtils.password
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${RequestUtils.getServerAddress()}/login`, data, config)
        .then(response => {
            if(response.status == 200&& response.data.success) {
                console.log(response.data)                
            }

        })
        .catch(error => {
            console.log('Login error: ', error)
        })
    }

    public static login(name: string, password: string) {
        RequestUtils.userName =  name
        RequestUtils.password = password
        const data = {
            name: RequestUtils.userName,
            password: RequestUtils.password
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${RequestUtils.getServerAddress()}/login`, data, config)
        .then(response => {
            if(response.status == 200 && response.data.success) {
                console.log('Login succeed')
                RequestUtils.token = response.data.data
                localStorage.setItem('auth.token', response.data.data)
            }
            console.log('Login data: ', response.data)
        })
        .catch(error => {
            console.log('Login error: ', error)
        })
    }

    public static update() {

    }

    public static logout() {
        const data = {}
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${RequestUtils.getServerAddress()}/logout`, data, config)
        .then(response => {
            if(response.status == 200 && response.data.success) {
                console.log('Logout succeed')
                RequestUtils.token = ''
                localStorage.setItem('auth.token', '')
            }
            console.log('Logout data: ', response.data)
        })
        .catch(error => {
            console.log('Logout error: ', error)
        })
    }

    public static isOnline() {
        const nowTime = moment().valueOf()
        if(RequestUtils.online) {
            return true
        }
        RequestUtils.token = localStorage.getItem('auth.token')
        if(!RequestUtils.token) {
            return false
        }
        return false
    }

    public static getFolders = ()=> {
        return axios.post(`${RequestUtils.getServerAddress()}/login`, {
            name: RequestUtils.userName,
            password: RequestUtils.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static getDocuments() {
        return axios.post(`${RequestUtils.getServerAddress()}/login`, {
            name: RequestUtils.userName,
            password: RequestUtils.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static loadDocument() {
        return axios.post(`${RequestUtils.getServerAddress()}/login`, {
            name: RequestUtils.userName,
            password: RequestUtils.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static saveDocument(documentName: String, documentContent: String, folderId: String) {
        return axios.post(`${RequestUtils.getServerAddress()}/login`, {
            name: RequestUtils.userName,
            password: RequestUtils.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
