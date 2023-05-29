// Ship JS only active on post pages for better performance
twikoo.init({
  envId: 'https://comment.1900.live', el: '.tk-comments', onCommentLoaded: function () {

    if (document.querySelectorAll('.twikoo').length != 0) {
      const cm = document.querySelectorAll('[class=tk-comment]');
      const temp = document.querySelector('.discussion-avatar-list li').cloneNode(true);
      document.querySelector('.discussion-avatar-list li').remove();

      // forEach函数不能跳出，重写
      NodeList.prototype.myForEach = function (fn) {
        for (let i = 0; i < this.length; i++) {
          let ret = fn(this[i], i, this);
          if (typeof ret !== "undefined" && (ret == null || ret == false)) break;
        }
      }

      cm.myForEach((e, i) => {
        const avatarlist = document.querySelector('.discussion-avatar-list');
        const av = e.getElementsByTagName('img')[0].getAttribute('src');
        const ct = e.getElementsByClassName('tk-content')[0].innerText;
        const li = temp.cloneNode(true);
        li.getElementsByTagName('img')[0].setAttribute('src', av);
        li.getElementsByTagName('img')[0].setAttribute('title', ct);
        if (document.querySelectorAll(`.discussion-avatar-list img[src="${av}"]`).length == 0) {
          avatarlist.appendChild(li)
        }
        if (i == 10) {
          return false;
        }
      });

      document.querySelector('.discussion-meta-info span').innerText = document.querySelector('.discussion-meta-info span').innerText.replace('?', cm.length);
    }
  }
})

if (document.querySelectorAll('.links').length != 0) {
  var el = document.querySelectorAll('.kg-bookmark-card');
  el.forEach((e) => {
    e.getElementsByTagName('a')[0].setAttribute('target', '_blank');
    document.querySelector('.links').appendChild(e);
  });
}



// Ajax.get('https://memos.1900.live/api/memo/all?tag=%E5%8D%9A%E5%AE%A2%E9%87%8C%E7%A8%8B%E7%A2%91',function(e){
//     var date = JSON.parse(e);
//     for (let index = 0; index < date.data.length; index++) {
//         console.log(date.data[index].content);
//     }
// })

// var Ajax={
//   get: function(url, fn) {
//     // XMLHttpRequest对象用于在后台与服务器交换数据   
//     var xhr = new XMLHttpRequest();            
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function() {
//       // readyState == 4说明请求已完成
//       if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
//         // 从服务器获得数据 
//         fn.call(this, xhr.responseText);  
//       }
//     };
//     xhr.send();
//   },
//   // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
//   post: function (url, data, fn) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", url, true);
//     // 添加http头，发送信息至服务器时内容编码类型
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
//         fn.call(this, xhr.responseText);
//       }
//     };
//     xhr.send(data);
//   }
// }