
import axios from 'axios'
import moment from 'moment'

/**
 * 定义一些Web方法和状态信息
 */

export interface UserInfo {
    customerName: string,
    customerId: number,
    nickName: string,

}
export class RequestUtils {

    private static online_: boolean = false
    private static userName_: string = ''
    private static password_: string = ''
    private static token_: string = ''
    private static serverAddress_: string = 'http://127.0.0.1:8080'
    private static lastCheckTime_: number = 0;
    private static checkTimeInterval_: number = 60000;
    private static userInfo_: UserInfo | null = null

    public static get token() : string {
        return RequestUtils.token_;
    }

    public static get userInfo() {
        return RequestUtils.userInfo_
    }

    public static set token(value: string) {
        RequestUtils.token_ = value;
    }

    public static get serverAddress() : string {
        return RequestUtils.serverAddress_;
    }

    public static get userName() {
        return RequestUtils.userName_
    }

    public static set userName(value: string) {
        RequestUtils.userName_ = value
    }

    public static get password() {
        return RequestUtils.password_;
    }

    public static set password(value: string) {
        RequestUtils.password_ = value
    }

    public static get online() {
        return RequestUtils.online_
    }

    public static set online(value: boolean) {
        RequestUtils.online_ = value
    }

    public static register(name: string, password: string) {
        RequestUtils.userName_ =  name
        RequestUtils.password_ = password
        const data = {
            name: RequestUtils.userName_,
            password: RequestUtils.password_
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${RequestUtils.serverAddress}/login`, data, config)
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
        RequestUtils.userName_ =  name
        RequestUtils.password_ = password
        const data = {
            name: RequestUtils.userName_,
            password: RequestUtils.password_
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${RequestUtils.serverAddress}/login`, data, config)
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
                'Content-Type': 'application/json',
                'Token': RequestUtils.token_
            }
        }
        axios.post(`${RequestUtils.serverAddress}/logout`, data, config)
        .then(response => {
            if(response.status == 200 && response.data.success) {
                console.log('Logout succeed')
                RequestUtils.token = ''
                RequestUtils.online_ = false
                RequestUtils.userName_ = ''
                RequestUtils.password_ = ''
                RequestUtils.userInfo_ = null
                localStorage.setItem('auth.token', '')
            }
            console.log('Logout data: ', response.data)
        })
        .catch(error => {
            console.log('Logout error: ', error)
        })
    }

    public static async isOnline() {
        const nowTime = moment().valueOf()
        if(RequestUtils.online_) {
            return true
        }
        const token = localStorage.getItem('auth.token')
        RequestUtils.token = token == null ? '' : token
        if(!RequestUtils.token) {
            return false
        }
        if(nowTime - RequestUtils.lastCheckTime_ > RequestUtils.checkTimeInterval_) {
            const online = await RequestUtils.checkOnline()
            if(online) {
                RequestUtils.lastCheckTime_ = nowTime
                return true;
            } else {
                return false;
            }
        }
        return true
    }

    public static async checkOnline() {
        const data = {}
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        const response = await axios.post(`${RequestUtils.serverAddress}/info`, data, config)
        //console.log(response.data)
        if(response?.data?.success) {
            RequestUtils.userInfo_ = response.data.data
            return true
        } else {
            RequestUtils.userInfo_ = null
            return false;
        }
    }

    public static getFolders = ()=> {
        return axios.post(`${RequestUtils.serverAddress}/login`, {
            name: RequestUtils.userName_,
            password: RequestUtils.password_
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static getDocuments() {
        return axios.post(`${RequestUtils.serverAddress}/login`, {
            name: RequestUtils.userName_,
            password: RequestUtils.password_
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static loadDocument() {
        return axios.post(`${RequestUtils.serverAddress}/login`, {
            name: RequestUtils.userName_,
            password: RequestUtils.password_
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static saveDocument(documentName: String, documentContent: String, folderId: String) {
        return axios.post(`${RequestUtils.serverAddress}/login`, {
            name: RequestUtils.userName_,
            password: RequestUtils.password_
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
