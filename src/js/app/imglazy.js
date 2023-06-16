export default function Observer() {
    let images = document.querySelectorAll(".lazyload");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(item => {
            if (item.isIntersecting) {
                item.target.src = item.target.dataset.src; // 开始加载图片,把data-src的值放到src
                observer.unobserve(item.target); // 停止监听已开始加载的图片
            }
        });
    },
        {
            rootMargin: "0px 0px -100px 0px" // 交叉过视图的100，才开始派发事件
        }
    );
    images.forEach(item => observer.observe(item));
}