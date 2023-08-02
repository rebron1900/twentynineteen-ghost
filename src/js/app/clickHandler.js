import toggleColorMode from './colorModeToggle.js';


function handleClick(e) {
  if (e.target.closest('.sm-post-top-btn')) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  if (e.target.closest('.sm-post-toc-btn ')) {
    const tocContainer = document.querySelector('.sm-post-toc-contents');
    tocContainer.classList.toggle('toc-show');
    return;
  }

  if (e.target.closest('.umi_like_btn')) {
    like(location.pathname);
    return;
  }

  if (e.target.closest('.color-mode')) {
    var color = document.documentElement.getAttribute('class');
    if(color == 'dark'){
      toggleColorMode('light');
      return;
    }
    if(color == 'light') {
      toggleColorMode('dark');
      return;
    }

  }

  // if (e.target.closest('.light-mode')) {
  //   toggleColorMode('light');
  //   return;
  // }

  if (e.target.closest('.talk-btn-comment')) {
    var memosid = e.target.closest('.talk-btn-comment').dataset.memosid
    loadTwikoo(memosid);
  }

  if (e.target.closest('.talks-more')) {
    var mconfig = document.getElementsByClassName('talks-more')[0].dataset;
    mconfig.offset = parseInt(mconfig.offset) + 10;
    getMemos(mconfig.limit, mconfig.offset);
    return;
  }


}


// if (
//   e.target.closest('.sm-saves-button') ||
//   e.target.closest('.sm-navbar-close-saves')
// ) {
//   document
//     .querySelector('.sm-navbar-saves')
//     .classList.toggle('sm-show-saves');
// }


export default function eventHandler() {
  document.body.addEventListener('click', handleClick);
}
