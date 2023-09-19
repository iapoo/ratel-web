
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
}

export interface Document {
    documentId: number;
    documentName: string;
    content: string;
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
        } else {
            if(RequestUtils.online_) {
                return true
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
        return axios.post(`http://127.0.0.1:8081/folder/folders`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/document/documents`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/document/document`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/document/add`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/document/update`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/document/delete`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/folder/add`, data, config)
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
        return axios.post(`http://127.0.0.1:8081/folder/delete`, data, config)
    }
}
