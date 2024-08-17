/* eslint-disable complexity */
import { history, } from 'umi'
import { RuntimeAntdConfig } from "@umijs/max";
import { theme } from "antd";


export function onRouteChange({ location, routes, action, }) {
    // console.log('Route changed - location:', location)
    // console.log('Route changed - routes:', routes)
    // console.log('Route changed - action:', action)

    // const { pathname, } = location
    // let jumped = false

}
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
    return { name: '@umijs/max' };
}


export const antd: RuntimeAntdConfig = (memo) => {
    memo.theme ??= {}
    // memo.theme.algorithm = [theme.compactAlgorithm]
    //memo.theme.algorithm = [theme.darkAlgorithm]//, theme.compactAlgorithm]
    memo.theme.algorithm = [theme.darkAlgorithm]
    return memo
}

// export const layout = () => {
//     return {
//         logo: 'favicon.png',
//         menu: {
//             locale: false,
//         },

//     };
// };
