function getScrollProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  return window.scrollY / scrollableHeight;
}

export default function toc() {
  const postContainer = document.querySelector('.entry-content');
  const tocContainer = document.querySelector('.sm-post-toc');
  const tocContentContainer = document.querySelector('.sm-post-toc-contents');


  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const activeLink = tocContainer.querySelector(`a[href="#${id}"]`);
      if (entry.isIntersecting) {
        activeLink.classList.add('sm-toc-active');
        tocContainer.querySelectorAll('a').forEach((link) => {
          if (link !== activeLink) {
            link.classList.remove('sm-toc-active');
          }
        });
      }
    });
  }, observerOptions);

  if (!tocContainer || !postContainer) {
    return;
  }

  const headings = postContainer.querySelectorAll('h2, h3, h4, h5, h6');

  //   If there are fewer than 3 headings, don't show the table of contents.
  if (headings.length < 3) {
    // tocContainer.style.display = 'none';
    // return;
  }

  tocContainer.classList.add('toc-enabled');

  const btn = document.querySelector('.sm-post-toc-btn');
  if (btn != undefined) {

    headings.forEach((heading) => {
      const link = createLink(heading);
      tocContentContainer.append(link);
    });

    headings.forEach((heading) => {
      observer.observe(heading);
    });
  }

  function createLink(element) {
    element.id = element.innerText;
    const link = document.createElement('a');
    link.classList.add('sm-toc-link');
    link.setAttribute('href', `#${element.id}`);
    link.textContent = element.textContent;
    return link;
  }






}
