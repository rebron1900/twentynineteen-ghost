export default function initPageProgress() {
    document.addEventListener('scroll', (e, o) => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        document.getElementsByClassName('page-line')[0].setAttribute('style', 'transform: translateY(' + window.scrollY / scrollableHeight * 100 + '%);')
        // // 获取页面的总高度
        // var docHeight = document.documentElement.scrollHeight;
        // // 获取内容区域的高度
        // var contentHeight = document.querySelector('#content').offsetHeight;
        // // 获取当前滚动条的位置
        // var scrollPos = document.documentElement.scrollTop;
        // // 计算阅读进度
        // var progress = (scrollPos / (docHeight - contentHeight)) * 100;
        // document.getElementsByClassName('page-line')[0].setAttribute('style', 'transform: translateY(' + progress + '%);')
    });
}


