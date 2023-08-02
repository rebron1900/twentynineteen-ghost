export function getMemos(l, f) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://memos.1900.live/api/v1/memo?creatorId=101&limit=' + l + '&offset=' + f, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = xhr.response;
        updateHTMl(data);
      }
    };
    xhr.send();



    // let url = 'https://memos.1900.live/api/v1/memo?creatorId=101&limit=' + l + '&offset=' + f;
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         updateHTMl(data);
    //     })
    //     .catch(err => {
    //         console.log('Request Failed', err)
    //     });
}

// 插入 html
function updateHTMl(data) {
    var memoResult = "", resultAll = "";
    var memoDom = document.getElementsByClassName("talks")

    // 解析 TAG 标签，添加样式
    const TAG_REG = /#([^\s#]+?) /g;

    // 解析 BiliBili
    const BILIBILI_REG = /<a\shref="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?">.*<\/a>/g;
    // 解析网易云音乐
    const NETEASE_MUSIC_REG = /<a\shref="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
    // 解析 QQ 音乐
    const QQMUSIC_REG = /<a\shref="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
    // 解析腾讯视频
    const QQVIDEO_REG = /<a\shref="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
    // 解析 Spotify
    const SPOTIFY_REG = /<a\shref="https:\/\/open\.spotify\.com\/(track|album)\/([\s\S]+)".*?>.*<\/a>/g;
    // 解析优酷视频
    const YOUKU_REG = /<a\shref="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
    //解析 Youtube
    const YOUTUBE_REG = /<a\shref="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;

    // Marked Options
    marked.setOptions({
        breaks: true,
        smartypants: true,
        highlight: (code, lang) => {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
        }
    });

    // Memos Content
    for (var i = 0; i < data.length; i++) {
        var memoContREG = data[i].content
            .replace(TAG_REG, "<span class='tag-span'><a rel='noopener noreferrer' href='#$1'>#$1</a></span>")

        // For CJK language users
        // 用 PanguJS 自动处理中英文混合排版
        // 在 index.html 引入 JS：<script type="text/javascript" src="assets/js/pangu.min.js?v=4.0.7"></script>
        // 把下面的 memoContREG = marked.parse(memoContREG) 改为：memoContREG = marked.parse(pangu.spacing(memoContREG))

        memoContREG = marked.parse(memoContREG)
            .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true' style='position:absolute;height:100%;width:100%;'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")
            .replace(NETEASE_MUSIC_REG, '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86 src="//music.163.com/outchain/player?type=2&id=$1&auto=1&height=66"></iframe>')
            //.replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
            .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
            .replace(SPOTIFY_REG, "<div class='spotify-wrapper'><iframe style='border-radius:12px' src='https://open.spotify.com/embed/$1/$2?utm_source=generator&theme=0' width='100%' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe></div>")
            .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

        // 解析内置资源文件
        data[i].content = memoContREG;

    }

    memoDom[0].innerHTML += (tmpl('tmpl-memos', data));



    //取消这行注释解析豆瓣电影和豆瓣阅读
    //fetchDB()

    // document.querySelector('button.button-load').textContent = '加载更多';
}
// Memos End

// 解析豆瓣 Start
// 文章内显示豆瓣条目 https://immmmm.com/post-show-douban-item/
// 解析豆瓣必须要API，请找朋友要权限，或自己按 https://github.com/eallion/douban-api-rs 这个架设 API，非常简单，资源消耗很少
// 已内置样式，修改 API 即可使用
function fetchDB() {
    var dbAPI = "https://api.example.com/";  // 修改为自己的 API
    var dbA = document.querySelectorAll(".timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])") || '';
    if (dbA) {
        for (var i = 0; i < dbA.length; i++) {
            _this = dbA[i]
            var dbHref = _this.href
            var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
            var db_type = dbHref.replace(db_reg, "$1");
            var db_id = dbHref.replace(db_reg, "$2").toString();
            if (db_type == 'movie') {
                var this_item = 'movie' + db_id;
                var url = dbAPI + "movies/" + db_id;
                if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
                    fetch(url).then(res => res.json()).then(data => {
                        let fetch_item = 'movies' + data.sid;
                        let fetch_href = "https://movie.douban.com/subject/" + data.sid + "/"
                        localStorage.setItem(fetch_item, JSON.stringify(data));
                        movieShow(fetch_href, fetch_item)
                    });
                } else {
                    movieShow(dbHref, this_item)
                }
            } else if (db_type == 'book') {
                var this_item = 'book' + db_id;
                var url = dbAPI + "v2/book/id/" + db_id;
                if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
                    fetch(url).then(res => res.json()).then(data => {
                        let fetch_item = 'book' + data.id;
                        let fetch_href = "https://book.douban.com/subject/" + data.id + "/"
                        localStorage.setItem(fetch_item, JSON.stringify(data));
                        bookShow(fetch_href, fetch_item)
                    });
                } else {
                    bookShow(dbHref, this_item)
                }
            }
        }// for end
    }
}

function movieShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>《" + data.name + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section class='post-preview--excerpt'>" + data.intro.replace(/\s*/g, "") + "</section></div></div></div>"
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']"
    var qs_dom = document.querySelector(qs_href)
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html
}

function bookShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating.average);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div></div>"
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']"
    var qs_dom = document.querySelector(qs_href)
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html
}
// 解析豆瓣 End

// 加载Twikoo评论
// function loadTwikoo(i) {
//     let twikooEnv = i.getAttribute("data-env")
//     let twikooPath = i.getAttribute("data-path")
//     let twikooId = i.getAttribute("data-id")
//     let twikooTime = i.getAttribute("data-time")
//     let twikooDom = document.getElementById(`${Number(twikooTime) + Number(twikooId)}`);
//     let twikooCon = "<div id='twikoo'></div>"
//     if (twikooDom.classList.contains('d-none')) {
//         document.querySelectorAll('.item-comment').forEach((item) => { item.classList.add('d-none'); })
//         if (document.getElementById("twikoo")) {
//             document.getElementById("twikoo").remove()
//         }
//         twikooDom.insertAdjacentHTML('beforeend', twikooCon);
//         twikooDom.classList.remove('d-none');
//         twikoo.init({
//             envId: twikooEnv,
//             el: '#twikoo',
//             path: twikooPath
//         });
//         let memoDom = document.querySelector(`.memo-${Number(twikooTime) + Number(twikooId)}`)
//         window.scrollTo({
//             top: memoDom.offsetTop,
//             behavior: "smooth"
//         });
//     } else {
//         twikooDom.classList.add('d-none');
//         document.getElementById("twikoo").remove()
//     }
// }


export function loadTwikoo(memosId) {
    var twikooDom = document.querySelector('.talk-comments-' + memosId);
    var twikooCon = "<div id='twikoo'></div>"
    if (twikooDom.classList.contains('d-none')) {
        document.querySelectorAll('.twikoo-body').forEach((item) => { item.classList.add('d-none'); })
        if (document.getElementById("twikoo")) {
            document.getElementById("twikoo").remove() //如果页面中已经有其他Twikoo初始化，则移除。
        }
        twikooDom.insertAdjacentHTML('beforeend', twikooCon);
        twikooDom.classList.remove('d-none');
        twikoo.init({
            envId: "https://comment.1900.live",
            el: '#twikoo',
            path: "https://memos.1900.live/m/" + memosId
        });
    } else {
        twikooDom.classList.add('d-none');
        document.getElementById("twikoo").remove()
    }
}


export function initMemos2() {

    if (document.getElementsByClassName('talks-more').length == 0) {
        return;
    }

    mconfig = document.getElementsByClassName('talks-more')[0].dataset;
    getMemos(mconfig.limit, mconfig.offset);
    window.Lately && Lately.init({ target: '.date' });

}

