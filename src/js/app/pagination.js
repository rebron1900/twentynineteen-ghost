function pathnameParser(pathname) {
  if (!/page/.test(pathname)) {
    return pathname;
  }

  return pathname.split('page')[0];
}

function navButtonFormatter(nextOrPrevEl, nextOrPrevName, paginationEl) {
  const icon = nextOrPrevName === 'previous' ? '<' : '>';
  const className = nextOrPrevName === 'previous' ? 'sm-prev' : 'sm-next';

  const navButton = nextOrPrevEl
    ? document.createElement('a')
    : document.createElement('span');
  
  navButton.innerHTML = icon;
  if (nextOrPrevEl) {
    navButton.setAttribute('aria-label', `${nextOrPrevName} posts`);
    navButton.setAttribute('href', nextOrPrevEl);
  } else {
    
  }

  paginationEl.append(navButton);
}

export default function generatePagination() {
  const pagination = document.querySelector('.pagination .nav-links');

  if (!pagination) return;
  const pathname = pathnameParser(window.location.pathname);
  const { page, prev, next, pages } = pagination.dataset;

  navButtonFormatter(prev, 'previous', pagination);

  const paginationStart = page - 2 > 0 ? page - 2 : 1;

  for (
    let index = paginationStart - 1;
    index < Math.min(paginationStart + 4, +pages);
    index += 1
  ) {
    let urlPath;

    if (index === 0 && pathname === '/') {
      urlPath = '/';
    } else if (index === 0 && pathname !== '/') {
      urlPath = pathname;
    } else {
      urlPath = `${pathname}page/${index + 1}/`;
    }
    const a = document.createElement('a');
    a.setAttribute('href', urlPath);
    a.textContent = index + 1;

    if (+page === index + 1) {
      a.classList.add('current');
    }
    pagination.append(a);
  }

  navButtonFormatter(next, 'next', pagination);
}
