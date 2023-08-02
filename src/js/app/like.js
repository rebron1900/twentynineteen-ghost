import cessage from 'coco-message';

export function like(pathurl) {
  var isLike = false;
  let messageContent = '';
  var umiLikeBtn = document.querySelector('.umi_like_btn');
  var umiLikeNum = document.querySelector('.umi_like_num');


  let hasCookie = getCookie(pathurl);
  if (!hasCookie) {
    umami.track('Like');
    setTimeout(() => {
      umiLikeNum.innerHTML++;
      umiLikeBtn.dataset.like = umiLikeNum.innerHTML;
      umiLikeBtn.ariaLabel = umiLikeBtn.ariaLabel.replace(' 0 ', ' ' + umiLikeNum.innerHTML + ' ');
    }, 300);
    isLike = true;
    setCookie(pathurl, isLike);
    messageContent = '感谢您的支持';
    cessage.success(messageContent)

  } else {
    messageContent = '您已经点过赞了';
    cessage.info(messageContent)
  }

}

export function initLike() {
  if (typeof (umiData) == 'undefined') {
    document.querySelector('.umi_like_btn').remove();
    return;
  }

  var umiLikeBtn = document.querySelector('.umi_like_btn');
  var umiLikeNum = document.querySelector('.umi_like_num');

  document.addEventListener("DOMContentLoaded", () => {
    getUmami(umiLikeBtn,umiLikeNum);
  });
}

// 读取Cookit
function getCookie(name) {
  var exist = document.cookie.indexOf(name) !== -1;
  return exist;
}

// 存储Cookie
function setCookie(name, val) {
  var data = new Date();
  //设置时间
  data.setTime(data.getTime() + 7 * 24 * 3600 * 1000)
  //设置Cookie
  document.cookie = name + '=' + val + ';expires=' + data.toUTCString()
}

// 合并数组
function groupBy(arr, by) {
  return arr.reduce((groups, item) => {
    // 获取 item 的分组的 key
    const key = by(item);
    // 看看这个组是不是已经存在
    let group = groups.find(g => g.key === key);
    if (!group) {
      // 不存在就创建一个新组
      group = {
        key,
        items: []
      };
      groups.push(group);
    }
    // item 放入组中
    group.items.push(item);
    return groups;
  }, []);
};

function filterByValue(jsonArray, property, value) {
  return jsonArray.filter((obj) => {
    return obj.hasOwnProperty(property) && obj[property] === value;
  });
}

// 获取umami数据
function getUmami(btn,num) {
  var umiTime = Date.parse(new Date());
  var umiUrl = umiData.url + "/api/websites/" + umiData.id + "/events?startAt=0&endAt=" + umiTime + "&unit=hour&url=" + pathurl + "&timezone=Asia/Shanghai";
  fetch(umiUrl, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': 'Bearer ' + umiData.token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json()).then(resdata => {
      let data = groupBy(resdata, item => item.x)
        .map(g => ({
          name: g.key,
          typeId: g.items.map(item => item.t),
          number: g.items.reduce((sum, item) => sum + item.y, 0)
        }));

      Likes = data.filter(function (item) { return item.name == 'Like' });
      if (Likes.length !== 0) {
        let likeNum = Likes[0].number;
        num.innerHTML = likeNum;
        btn.dataset.like = likeNum;
        btn.ariaLabel = btn.ariaLabel.replace(' 0 ', ' ' + likeNum + ' ');
      } else {
        num.innerHTML = 0;
        btn.dataset.like = 0;
      }

    });
}



