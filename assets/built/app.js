(function () {
  'use strict';

  /*
   * Color mode toggle
   */
  function determineColorModeSupport() {
    const colorPrefButtons = document.querySelectorAll('.sm-dark-mode, .sm-light-mode');
    const hasSupport = window.CSS && CSS.supports('color', 'var(--primary)'); // If the browser doesn't support custom settings, hide buttons

    if (!hasSupport) {
      colorPrefButtons.forEach(e => {
        e.style.display = 'none';
      });
    }
  }

  // if ("development" === 'development') {
  //   const script = document.createElement('script');
  //   script.src = `http://${
  //     (location.host || 'localhost').split(':')[0]
  //   }:35729/livereload.js?snipver=1`;
  //   document.head.append(script);
  //   console.log('Reload script added');
  // }

  determineColorModeSupport();

})();
//# sourceMappingURL=app.js.map
