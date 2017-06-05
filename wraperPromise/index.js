function wrapServer(promise, count = 1) {
    let obj = {
            repeatNum: 1,
            count: count
        };
    return new Promise((resolve, reject) => {
            innerPromise(promise, resolve, reject, obj);
        })
}

function innerPromise(promise,resolve, reject, obj) {
    return new Promise(() => {
            if(obj.repeatNum <= obj.count) {
                        console.log(`${obj.repeatNum}次`)
                        promise.then(res => {
                                        resolve(res);
                                    }).catch(err => {
                                                    obj.repeatNum++;
                                                    innerPromise(promise, resolve, reject, obj);
                                                });
                    } else {
                                reject('超时了');
                            }
        })
}

function demoAPI () {
    return new Promise((res,rej) => {
            setTimeout(() => {
                        res('ok');
                    }, 1000);
        })
}

wrapServer(demoAPI()).then(res => {
    console.log(res, 'right');
}).catch(err => {
    console.log(err, '111111err');
})

