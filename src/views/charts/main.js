export const getRowArr = function () {
  const rowArr = [];  
  const rowArr1 = [];
  const rowArr2 = [];
  let myWorker = new Worker("..a/worker.js");
  
  
  myWorker.postMessage(rowArr1,rowArr2);
  myWorker.onmessage = function (e) {
    const rowArr = e.data;
    console.log(rowArr)
  }
  // if (window.worker) {
  //   alert("浏览器支持worker?")
    
  // }
  return rowArr
}