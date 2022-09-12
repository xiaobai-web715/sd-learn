import {SET_AUTH, SET_ROUTE_TREE} from './actionsTypes'
import { IState } from './state'
import {Commit} from 'vuex'
import { getUserRouteList } from '@/sever/index'
import { IRoute } from '@/typings/sever'
import { formatRouteTree } from '@/utils/index'
export default {
    async [SET_ROUTE_TREE] ({commit, state}: {commit:Commit, state:IState}) {
        const routeList = await getUserRouteList(state.uid) as unknown as IRoute[];
        console.log('routeList',routeList);
        const routeTree = formatRouteTree(routeList); //将routeList变成routeTree;
        console.log('routeTree', routeTree);
        commit(SET_ROUTE_TREE, routeTree);
        commit(SET_AUTH, true);
    }
}