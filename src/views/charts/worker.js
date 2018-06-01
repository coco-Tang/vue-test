onmessage = function (e) {
  let arr1 = e.data[0];
  let arr2 = e.data[1];
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
  return;
  console.log()
  for (let i = 0; i < 1e3; i++) {
    arr1.push({'日期': `1/${i}`, '访问用户': parseInt(Math.random()*1e3), '下单用户': parseInt(Math.random()*1e3), '下单率': Math.random().toFixed(2) })
  }
  for (let j = 0; j < 1e3; i++) {
    arr2.push({'日期': `1/${i+1e3}`, '访问用户': parseInt(Math.random()*1e3), '下单用户': parseInt(Math.random()*1e3), '下单率': Math.random().toFixed(2) })
  }
  let workResult = arr1.concat(arr2);
  postMessage(workResult);
}