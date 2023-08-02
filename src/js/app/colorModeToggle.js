export default function toggleColorMode(color) {
  const commentsIframe = document.querySelector(
    'iframe[title="comments-frame"]',
  );

  // Reload comments iframe when toggling color mode
  if (commentsIframe) {
    commentsIframe.contentWindow.location.reload();
  }

  document.documentElement.setAttribute('data-color-pref', color);
  document.documentElement.setAttribute('class',color);
  localStorage.setItem('pref', color);

}
