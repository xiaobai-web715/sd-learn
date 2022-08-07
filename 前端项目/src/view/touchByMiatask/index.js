import React, { useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// import {test} from '@jest/globals'
import { addValue, decrementValue} from '../../reducer/todoListReducer'
const Css = require('./index.scss')
// import url from '../../image/components/TouchByMiatask/二维码.jpeg' //引入jpeg方式的图片不成功
const Index = () => {
    // const url = require('../../image/components/TouchByMiatask/二维码.jpeg')
    const dispatch = useDispatch();
    const {value} = useSelector((state) => state.todoList);
    let preventDefaultFn = useCallback((e) => {e.preventDefault();}, [])
    //异步的逻辑函数thunk action creators
    const asyncFn = payload => (dispatch, getState) => {
        console.log('dispatch', dispatch)
        console.log('getState', getState)
        return setTimeout(() => {dispatch(addValue(payload))}, 2000)
    }
    useEffect(() => {
        //我这里有一个异步逻辑并且要传入store仓库当中
        // dispatch((dispatch, getState)  => setTimeout(() => {dispatch(addValue(20))}, 1000))
        dispatch(asyncFn(100))
        // dispatch((dispatch, getState) => {
        //     console.log('dispatch', dispatch)
        //     console.log('getState', getState)
        //     return setTimeout(() => {dispatch(addValue(20))}, 1000)
        // })
        const test = async () => {
            await axios.get('/user').then((res) => {
                console.log('res', res);
            }).catch((err) => {
                console.log('请求失败', err);
            })
        }
        test()
        // test(async () => {
        //     await axios.get('/user').then((res) => {
        //         console.log('res', res);
        //     }).catch((err) => {
        //         console.log('请求失败', err);
        //     })
        // })
        document.addEventListener('contextmenu', preventDefaultFn)
        return(
            () => {
                document.removeEventListener('contextmenu', preventDefaultFn);
            }
        )
    }, [])
    const add = () => {
        dispatch(addValue(10));
    }
    const decerment = () => {
        dispatch(decrementValue(5));
    }
    return (
        <div className={Css['page']}>
            <img src={'https://pic.90sheji.com/design/01/24/80/47/5906e618b27fb.png!/fw/280/quality/90/unsharp/true/compress/true/canvas/280x297a0a0/cvscolor/FFFFFFFF'}></img>
            <span>{value}</span>
            <div className={Css['buttonContent']}>
                <button className={Css['button']} onClick={add}>+</button>
                <button className={Css['button']} onClick={decerment}>-</button>
            </div>
            <div className={Css['redux-title']}>
                redux的核心就是reducer函数需是纯函数的形式:即不会修改输入的值,不产生异步等的副作用,计算值只靠输入的参数进行计算(即不受外界的影响)
                具体规则: 1.不会修改传入的state,保证不可变性,每次返回值都需满足当前形式{'{...state, value:action.payload}'},2.内部计算的值只会用到state和action这两者不会受外部的影响,3.函数中不能存在异步等的有副作用的逻辑.
            </div>
        </div>
    )
}

export default Index