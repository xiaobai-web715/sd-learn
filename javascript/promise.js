const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        let err = new Error('抛出错误')
        resolve(err);
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(p1);
    }, 1000)
}).then((res) => {
    console.log('res', res);
}).catch((err) => {
    console.log('err', err);
})

let p3 = Promise.resolve(new Error('抛出错误'))
console.log('resolve一个错误',p3);