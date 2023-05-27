// Ship JS only active on post pages for better performance
twikoo.init({
  envId: 'https://comment.1900.live', el: '.tk-comments', onCommentLoaded: function () {

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
})

if (document.querySelectorAll('.links') != 0) {
  var el = document.querySelectorAll('.kg-bookmark-card');
  el.forEach((e) => { 
    e.getElementsByTagName('a')[0].setAttribute('target','_blank');
    document.querySelector('.links').appendChild(e);
  });
}

