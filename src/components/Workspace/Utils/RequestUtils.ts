
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

export interface MyShapes {
    shapes: MyShape[]
}

export enum MyShapeType {
    SELECTION = 0,
    SVG = 1,
    IMAGE = 2
}

export interface MyShape {
    id: string
    name: string
    icon: string
    image: string
    info: string
    type: MyShapeType
    width: number
    height: number
}

export function isFolder(source: Folder | Document | undefined): source is Folder {
    if (source == undefined) {
        return false
    }
    return (<Folder>source).data != undefined
}

export function isDocument(source: Folder | Document | undefined): source is Document {
    if (source == undefined) {
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
    private static serverAddress_: string = ''
    private static rockieAddress_: string = ''
    //private static serverAddress_: string = 'http://127.0.0.1:8080'
    private static lastCheckTime_: number = 0;
    private static checkTimeInterval_: number = 600000;
    private static userInfo_: UserInfo | null = null

    public static get systemServerAddress(): string {
        if (RequestUtils.serverAddress_.length < 1) {
            const protocal = window.location.protocol
            const hostname = window.location.hostname
            const port = window.location.port

            const WEB_HTTP = process.env.SYSTEM_WEB_HTTP ? process.env.SYSTEM_WEB_HTTP : protocal + '//'
            const WEB_SERVER = process.env.SYSTEM_WEB_SERVER ? process.env.SYSTEM_WEB_SERVER : hostname
            const WEB_PORT = process.env.SYSTEM_WEB_PORT ? ':' + process.env.SYSTEM_WEB_PORT : ':' + port
            const WEB_PATH = process.env.SYSTEM_WEB_PATH
            RequestUtils.serverAddress_ = WEB_HTTP + WEB_SERVER + WEB_PORT + WEB_PATH
        }
        return RequestUtils.serverAddress_
    }
    public static get rockieServerAddress(): string {
        if (RequestUtils.rockieAddress_.length < 1) {
            const protocal = window.location.protocol
            const hostname = window.location.hostname
            const port = window.location.port

            const WEB_HTTP = process.env.ROCKIE_WEB_HTTP ? process.env.ROCKIE_WEB_HTTP : protocal + '//'
            const WEB_SERVER = process.env.ROCKIE_WEB_SERVER ? process.env.ROCKIE_WEB_SERVER : hostname
            const WEB_PORT = process.env.ROCKIE_WEB_PORT ? ':' + process.env.ROCKIE_WEB_PORT : ':' + port
            const WEB_PATH = process.env.ROCKIE_WEB_PATH
            RequestUtils.rockieAddress_ = WEB_HTTP + WEB_SERVER + WEB_PORT + WEB_PATH
        }
        return RequestUtils.rockieAddress_
    }

    public static get token(): string {
        return RequestUtils.token_;
    }

    public static get userInfo() {
        return RequestUtils.userInfo_
    }

    public static set token(value: string) {
        RequestUtils.token_ = value;
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
        RequestUtils.userName_ = name
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
        axios.post(`${RequestUtils.systemServerAddress}/login`, data, config)
            .then(response => {
                if (response.status == 200 && response.data.success) {
                    console.log(response.data)
                }

            })
            .catch(error => {
                console.log('Login error: ', error)
            })
    }

    public static login(name: string, password: string) {
        RequestUtils.userName_ = name
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
        axios.post(`${RequestUtils.systemServerAddress}/login`, data, config)
            .then(response => {
                if (response.status == 200 && response.data.success) {
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
        axios.post(`${RequestUtils.systemServerAddress}/logout`, data, config)
            .then(response => {
                if (response.status == 200 && response.data.success) {
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
        if (!RequestUtils.token) {
            // console.log(`isOnlie == checkpoint = 1`)
            return false
        }
        if (nowTime - RequestUtils.lastCheckTime_ > RequestUtils.checkTimeInterval_) {
            RequestUtils.lastCheckTime_ = nowTime
            const online = await RequestUtils.checkOnline()
            if (online) {
                RequestUtils.checkTime_ = 0
                // console.log(`isOnlie == checkpoint = 2`)
                return true;
            } else {
                // console.log(`isOnlie == checkpoint = 3`)
                return false;
            }
        } else {
            if (RequestUtils.online_) {
                // console.log(`isOnlie == checkpoint = 4`)
                return true
            } else if (RequestUtils.checkTime_ < 5) {
                RequestUtils.checkTime_ = RequestUtils.checkTime_ + 1
                const online = await RequestUtils.checkOnline()
                if (online) {
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
        const response = await axios.post(`${RequestUtils.systemServerAddress}/info`, data, config)
        //console.log(response.data)
        if (response?.data?.success) {
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
        return axios.post(`${RequestUtils.systemServerAddress}/info`, {
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            },
        })
    }

    public static getSettings() {
        return axios.post(`${RequestUtils.systemServerAddress}/settings`, {
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            },
        })
    }

    public static updateSettings(settings: string) {
        return axios.post(`${RequestUtils.systemServerAddress}/updateSettings`, {
            'settings': settings
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            },
        })
    }

    public static getFolders = (parentId: number | null) => {
        const data = {
            parentId: parentId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/folder/folders`, data, config)
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
        return axios.post(this.rockieServerAddress + `/document/documents`, data, config)
    }

    public static loadDocument(documentId: number, withContent: boolean = true) {
        const data = {
            documentId: documentId,
            withContent: withContent,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/document/document`, data, config)
    }

    public static loadDocumentByLink(linkCode: string, shareCode: string) {
        const data = {
            linkCode: linkCode,
            shareCode: shareCode,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/document/link`, data, config)
    }

    public static saveDocument(documentName: string, content: string, folderId: number | null) {
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
        return axios.post(this.rockieServerAddress + `/document/add`, data, config)
    }

    public static updateDocument(documentId: number, documentName: string, content: string, folderId: number | null) {
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
        return axios.post(this.rockieServerAddress + `/document/update`, data, config)
    }

    public static updateDocumentShare(documentId: number, shareStatus: number, shareCode: string, shareCodeStatus: number, effectiveDate: number | null, expireDate: number | null) {
        const data = {
            documentId: documentId,
            shareStatus: shareStatus,
            shareCode: shareCode,
            shareCodeStatus: shareCodeStatus,
            effectiveDate: effectiveDate,
            expireDate: expireDate
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/document/share`, data, config)
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
        return axios.post(this.rockieServerAddress + `/document/delete`, data, config)
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
        return axios.post(this.rockieServerAddress + `/folder/add`, data, config)
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
        return axios.post(this.rockieServerAddress + `/folder/delete`, data, config)
    }


    public static loginAsAdmin() {
        const data = {
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/admin`, data, config)
    }

    public static getOperators() {
        const data = {
            pageSize: 5,
            pageNum: 1,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/operator/operators`, data, config)
    }
    public static getOperatorDetails(like: string | null, pageNum: number = 1, pageSize = 5) {
        const data = {
            pageSize: pageSize,
            pageNum: pageNum,
            like: like,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/operator/operatorDetails`, data, config)
    }


    public static getOperator() {
        const data = {
            pageSize: 5,
            pageNum: 1,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/operator/operators`, data, config)
    }


    public static addOperator(customerId: number, operatorType: number) {
        const data = {
            operatorType: operatorType,
            customerId: customerId,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/operator/add`, data, config)
    }

    public static updateOperator(operatorId: number, customerId: number, operatorType: number) {
        const data = {
            operatorId: operatorId,
            operatorType: operatorType,
            customerId: customerId,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/operator/update`, data, config)
    }


    public static deleteOperator(operatorId: number) {
        const data = {
            operatorId: operatorId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/operator/delete`, data, config)
    }

    public static getCustomers(customerName: string | null, pageNum: number = 1, pageSize: number = 5) {
        const data = {
            customerName: customerName,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/customer/customers`, data, config)
    }


    public static getOperatorCustomers(like: string | null,excludeCustomerId: number | null, pageNum: number = 1, pageSize: number = 5) {
        const data = {
            like: like ? like : null,
            excludeCustomerId: excludeCustomerId,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/customer/operatorCustomers`, data, config)
    }


    public static getOperatorDocuments(like: string | null,pageNum: number = 1, pageSize: number = 10) {
        const data = {
            like: like ? like : null,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/document/operatorDocuments`, data, config)
    }

    public static getCustomer() {
        const data = {
            pageSize: 5,
            pageNum: 1,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/customer/customers`, data, config)
    }


    public static addCustomer(customerName: string, email: string, nickName: string, password: string, confirmPassword: string) {
        const data = {
            customerName: customerName,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            nickName: nickName,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/customer/add`, data, config)
    }

    public static updateCustomer(customerId: number, customerName: string, email: string, nickName: string, password: string, confirmPassword: string) {
        const data = {
            customerId: customerId,
            customerName: customerName,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            nickName: nickName,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/customer/update`, data, config)
    }


    public static deleteCustomer(customerId: number) {
        const data = {
            pageSize: 5,
            pageNum: 1,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/customer/customers`, data, config)
    }

    public static getTeams(teamName: string | null, pageNum: number = 1, pageSize: number = 5) {
        const data = {
            teamName: teamName,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/team/teams`, data, config)
    }


    public static getTeam(teamId: number) {
        const data = {
            teamId: teamId,
            pageSize: 5,
            pageNum: 1,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/team/team`, data, config)
    }

    public static addTeam(teamName: string) {
        const data = {
            teamName: teamName,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/team/add`, data, config)
    }

    public static updateTeam(teamId: number, teamName: string) {
        const data = {
            teamId: teamId,
            teamName: teamName,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/team/update`, data, config)
    }


    public static deleteTeam(teamId: number) {
        const data = {
            teamId: teamId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/team/delete`, data, config)
    }

    public static getTeamMembers(teamId: number, like: string, pageNum: number = 1, pageSize = 5) {
        const data = {
            teamId: teamId,
            like: like,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/teamMember/teamMembers`, data, config)
    }

    public static getTeamMemberDetails(teamId: number, like: string | null, pageNum: number = 1, pageSize = 5) {
        const data = {
            teamId: teamId,
            like: like,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/teamMember/teamMemberDetails`, data, config)
    }

    public static addTeamMember(teamId: number, customerName: string) {
        const data = {
            teamId: teamId,
            customerName: customerName,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/teamMember/add`, data, config)
    }

    // public static updateTeamMember(teamId: number, customerId: number) {
    //     const data = {
    //         teamId: teamId,
    //         customerId: customerId,
    //     }
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Token': RequestUtils.token
    //         }
    //     }
    //     return axios.post(this.rockieServerAddress + `/teamMember/update`, data, config)
    // }

    public static deleteTeamMember(teamId: number, customerId: number) {
        const data = {
            teamId: teamId,
            customerId: customerId,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/teamMember/delete`, data, config)
    }

    public static getDocumentAccessDetails(documentId: number, like: string | null, pageNum: number = 1, pageSize: number = 8) {
        const data = {
            documentId: documentId,
            like: like,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/documentAccess/documentAccessDetails`, data, config)
    }

    public static deleteDocumentAccess(documentId: number, customerId: number) {
        const data = {
            documentId: documentId,
            customerId: customerId,            
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/documentAccess/delete`, data, config)
    }

    public static addDocumentAccess(documentId: number, customerName: string, pageNum: number = 1, pageSize: number = 8) {
        const data = {
            documentId: documentId,
            customerName: customerName,
            pageSize: pageSize,
            pageNum: pageNum,
            accessMode: 0,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/documentAccess/add`, data, config)
    }

    public static getDocumentTeamAccessDetails(documentId: number, like: string | null, pageNum: number = 1, pageSize: number = 8) {
        const data = {
            documentId: documentId,
            like: like,
            pageSize: pageSize,
            pageNum: pageNum,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/documentTeamAccess/documentTeamAccessDetails`, data, config)
    }

    public static deleteDocumentTeamAccess(documentId: number, teamId: number) {
        const data = {
            documentId: documentId,
            teamId: teamId,            
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/documentTeamAccess/delete`, data, config)
    }

    public static addDocumentTeamAccess(documentId: number, teamId: number) {
        const data = {
            documentId: documentId,
            teamId: teamId,
            accessMode: 0,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.rockieServerAddress + `/documentTeamAccess/add`, data, config)
    }

    /**
     * Retrieve System properties. For example, enable-mail-validation.  Web UI can hide for this.
     * @returns 
     */
    public static getProperties() {
        const data = {
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/properties`, data, config)
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
        return axios.post(this.rockieServerAddress + `/utils/google-fonts`, data, config)
    }

    public static async sendVerificationCode(toMail: string) {        
        const data = {
            to: toMail
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Token': RequestUtils.token
            }
        }
        return axios.post(this.systemServerAddress + `/sendVerificationCode`, data, config)
    }

    public static async fetchTextFileAsBlob(url: string) {
        return axios.get(url, { responseType: 'blob' })
    }

    public static async fetchJsonFile(url: string) {
        const request = axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        const response = await request
        //console.log(response.data)
        return response.data
    }

    public static async fetchSvgFile(url: string) {
        const request = axios.get(url, { headers: { 'Content-Type': 'application/xml+svg' } })
        const response = await request
        //console.log(response.data)
        return response.data
    }


}
