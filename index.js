// /**
//  *
//  * @param {Array<Promise>} listPromises
//  * @returns
//  */
// const customPromiseAll = listPromises => {
//   return new Promise((resolve, reject) => {
//     const listResult = []
//     let finishCount = 0
//     listPromises.forEach((promise, index) => {
//       promise
//         .then(result => {
//           listResult[index] = result
//           finishCount++
//           if (finishCount === listPromises.length) resolve(listResult)
//         })
//         .catch(e => reject(e))
//     })
//   })
// }

// const fakeSucceedDelayTask = (data, delayTime) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(data)
//     }, delayTime)
//   })
// }

// const fakeFailedDelayTask = (err, delayTime) =>
//   new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(err)
//     }, delayTime)
//   })

// const listPromise = [
//   fakeSucceedDelayTask('one', 1500),
//   fakeSucceedDelayTask('two', 100),
//   fakeSucceedDelayTask('three', 2000)
//   //   fakeFailedDelayTask('unexpected error')
// ]

// // const callPromiseAll = async ()=>{
// // let results = await customPromiseAll(listPromise).then(data => data);
// // console.log(results);
// // }

// // callPromiseAll();

// /**
//  *
//  * @param {Array<Promise>} listPromises
//  * @returns
//  */
// const customPromiseRace = listPromises => {
//   return new Promise((resolve, reject) => {
//     listPromises.map(promise => {
//       promise.then(data => resolve(data)).catch(e => reject(e))
//     })
//   })
// }

// // customPromiseRace([
// // 	fakeFailedDelayTask("error",200),
// // 	fakeSucceedDelayTask("data",1000)
// // ]).then((data)=>{
// // 	console.log(data);
// // }).catch((e)=>{
// // 	console.log(e);
// // })

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(reject, 1000, 'one');
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 5000, 'two');
// });

// Promise.race([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// }).catch(e=>console.log(e));

const a = {
  name: 'Huy',
  age: undefined,
  methods: {
    getName: () => {
      console.log('name')
    }
  },
  family: [{
    dad: {
      age: 300,
      methods: {
        getName: () => {
          console.log('dad name')
        }
      }
    }
  },
  {
	mother: {
		age: 200,
		methods: {
		  getName: () => {
			console.log('mother name')
		  }
		}
	  }
  }
]
}

const isObject = value =>
  !!value && typeof value === 'object' && !Array.isArray(value)

const cloneDeep = object => {
  if (!isObject(object)) {
    return Array.isArray(object)
      ? object.map(value => cloneDeep(value))
      : object
  }
  const clonedObject = { ...object }

  Object.keys(clonedObject).map((key, index) => {
    clonedObject[key] = isObject(clonedObject[key])
      ? cloneDeep(clonedObject[key])
      : clonedObject[key]
  })
  return clonedObject
}

console.log(cloneDeep(a));

// /**
//  *
//  * @param {String} string
//  */
// const countStringWords = string => {
//   let stringCountMap = {}

//   string
//     .trim()
//     .split(' ')
//     .forEach(value => {
//       if (stringCountMap[value]) {
//         stringCountMap[value] = ++stringCountMap[value]
//       } else {
//         stringCountMap[value] = 1
//       }
//     })
//   return stringCountMap
// }
// console.log(countStringWords('hello world 123 world'))

// const debounce = (callback, delayTime) => {
//   let debounceTimeOut = null

//   return function () {
//     clearTimeout(debounceTimeOut)
//     debounceTimeOut = setTimeout(() => {
//       callback.apply(this,arguments);
//     }, delayTime)
//   }
// }

// const debounceFunc = debounce((...params) => {
//   console.log(params)
// }, 1000)

// // debounceFunc()
// for (let index = 0; index < 10; index++) {
//   debounceFunc(1)
// }

const throttle = (callback, throttleTime) => {
  let isWaiting = false

  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments)
      isWaiting = true
      setTimeout(() => {
        isWaiting = false
      }, throttleTime)
    }
  }
}

const throttleFunc = throttle((...params) => {
  console.log(params)
}, 1000)
throttleFunc(1, 2, 3, 4)
throttleFunc(1, 2, 3, 4)
throttleFunc(1, 2, 3, 4)
throttleFunc(1, 2, 3, 4)
throttleFunc(1, 2, 3, 4)

setTimeout(() => {
  throttleFunc(1)
}, 100)
