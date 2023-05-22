// Ship JS only active on post pages for better performance
twikoo.init({ envId: 'https://comment.1900.live', el: '.tk-comments' }).then(function () {
  twikoo.getRecentComments({
    envId: 'https://comment.1900.live', // 环境 ID
    // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
    pageSize: 6, // 获取多少条，默认：10，最大：100
    includeReply: false // 是否包括最新回复，默认：false
  }).then(function (res) {
    console.log(res);
    const avatarlist = document.querySelector('.discussion-avatar-list');
    const li =  document.querySelector('.discussion-avatar-list li').cloneNode;
    const avatar = document.querySelector('.discussion-avatar-list li');
  }).catch(function (err) {
    // 发生错误
    console.error(err);
  });
});