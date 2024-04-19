
import { DataNode } from 'antd/es/tree';
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

export interface Folder {
    folderId: number;
    folderName: string;
    parentId: number | null;
    data: DataNode;
    modifiedDate: string
    modifiedTime: string
}

export interface Document {
    documentId: number;
    documentName: string;
    content: string;
    modifiedDate: string
    modifiedTime: string
    folderId: number | null;
}

export function isFolder(source:  Folder | Document | undefined ): source is Folder {
    if( source == undefined) {
        return false
    }
    return (<Folder>source).data != undefined
}

export function isDocument(source:  Folder | Document | undefined ): source is Document {
    if( source == undefined) {
        return false
    }
    return (<Document>source).documentName != undefined
}

export class RequestUtils {

    private static online_: boolean = false
    private static checkTime_: number = 0
    private static userName_: string = ''
    private static password_: string = ''
    private static token_: string = ''
    private static serverAddress_: string = 'http://192.168.1.15:8080'
    private static rockieAddress_: string = 'http://192.168.1.15:8081'
    //private static serverAddress_: string = 'http://127.0.0.1:8080'
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
        const token = localStorage.getItem('auth.token')
        RequestUtils.token = token == null ? '' : token
        // console.log(`isOnlie == ${RequestUtils.token}`)
        if(!RequestUtils.token) {
            // console.log(`isOnlie == checkpoint = 1`)
            return false
        }
        if(nowTime - RequestUtils.lastCheckTime_ > RequestUtils.checkTimeInterval_) {
            RequestUtils.lastCheckTime_ = nowTime
            const online = await RequestUtils.checkOnline()
            if(online) {
                RequestUtils.checkTime_ = 0
                // console.log(`isOnlie == checkpoint = 2`)
                return true;
            } else {
                // console.log(`isOnlie == checkpoint = 3`)
                return false;
            }
        } else {
            if(RequestUtils.online_) {
                // console.log(`isOnlie == checkpoint = 4`)
                return true
            } else if(RequestUtils.checkTime_ < 5) {
                RequestUtils.checkTime_ = RequestUtils.checkTime_ + 1
                const online = await RequestUtils.checkOnline()
                if(online) {
                    RequestUtils.checkTime_ = 0
                    RequestUtils.online_ = true
                    // console.log(`isOnlie == checkpoint = 5`)
                    return true;
                } else {
                    // console.log(`isOnlie == checkpoint = 6`)
                    return false;
                }
            } else {
                // console.log(`isOnlie == checkpoint = 7`)
                return false
            }
        }
        // console.log(`isOnlie == checkpoint = 8`)
        return false
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
            RequestUtils.online_ = true
            return true
        } else {
            RequestUtils.userInfo_ = null
            RequestUtils.online_ = false
            return false;
        }
    }

    public static info() {       
        return axios.post(`${RequestUtils.serverAddress}/info`, {            
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            },
            })        
    }

    public static getFolders = (parentId: number | null)=> {
        const data = {
            parentId: parentId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/folder/folders`, data, config)
    }

    public static getDocuments(folderId: number | null) {
        const data = {
            folderId: folderId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/document/documents`, data, config)
    }

    public static loadDocument(documentId: number) {
        const data = {
            documentId: documentId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/document/document`, data, config)
    }

    public static saveDocument(documentName: String, content: string, folderId: number | null) {
        const data = {
            documentName: documentName,
            content: {
                contentName: documentName,
                content: content,
            },
            folderId: folderId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/document/add`, data, config)
    }

    public static updateDocument(documentId: number, documentName: String, content: string, folderId: number | null) {
        const data = {
            documentId: documentId,
            documentName: documentName,
            content: {
                contentName: documentName,
                content: content,
            },
            folderId: folderId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/document/update`, data, config)
    }

    public static deleteDocument(documentId: number) {
        const data = {
            documentId: documentId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/document/delete`, data, config)
    }

    public static addFolder(folderName: String, parentId: number | null) {
        const data = {
            folderName: folderName,
            parentId: parentId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/folder/add`, data, config)
    }

    public static deleteFolder(folderId: number) {
        const data = {
            folderId: folderId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/folder/delete`, data, config)
    }

    public static getGoogleFonts() {
        const data = {            
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieAddress_ + `/utils/google-fonts`, data, config)
    }
}
