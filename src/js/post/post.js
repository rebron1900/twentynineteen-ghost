// Ship JS only active on post pages for better performance
twikoo.init({
  envId: 'https://comment.1900.live', el: '.tk-comments', onCommentLoaded: function () {
    // twikoo.getRecentComments({
    //   envId: this.envId, // 环境 ID
    //   // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
    //   pageSize: 5, // 获取多少条，默认：10，最大：100
    //   includeReply: false // 是否包括最新回复，默认：false
    // }).then(function (res) {
    //   console.log(res);

    //   res.forEach(e => {
    //     const avatarlist = document.querySelector('.discussion-avatar-list');
    //     const li = document.querySelector('.discussion-avatar-list li').cloneNode(true);
    //     li.getElementsByTagName('img')[0].setAttribute('src', e.avatar)
    //     avatarlist.appendChild(li)
    //   });
    //   document.querySelector('.discussion-avatar-list li').remove()
    // }).catch(function (err) {
    //   // 发生错误
    //   console.error(err);
    // });

    const cm = document.querySelectorAll('[class=tk-comment]');
    const temp = document.querySelector('.discussion-avatar-list li').cloneNode(true);
    document.querySelector('.discussion-avatar-list li').remove();
    const list = [];

    cm.forEach((e, i) => {
      const avatarlist = document.querySelector('.discussion-avatar-list');
      const av = e.getElementsByTagName('img')[0].getAttribute('src');
      const ct = e.getElementsByClassName('tk-content')[0].innerText;
      const li = temp.cloneNode(true);
      li.getElementsByTagName('img')[0].setAttribute('src', av);
      li.getElementsByTagName('img')[0].setAttribute('title', ct);
      avatarlist.appendChild(li)
      if(i == 10){
        return;
      }
    });

    document.querySelector('.discussion-meta-info span').innerText= document.querySelector('.discussion-meta-info span').innerText.replace('?',cm.length);
    
    console.log(list);
  }
})

