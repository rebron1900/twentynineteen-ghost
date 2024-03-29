import mediumZoom from 'medium-zoom';
import cocoMessage from 'coco-message';

// Medium Zoom
export default function initMediumZoom() {
  const directImages = document.querySelectorAll('.entry-content > img');
  const markdownImages = document.querySelectorAll(
    '.entry-content > p > img',
  );
  const kgImages = document.querySelectorAll('.kg-image-card > img');
  const galleryImages = document.querySelectorAll('.kg-gallery-image > img');

  const postImages = [
    ...directImages,
    ...markdownImages,
    ...kgImages,
    ...galleryImages,
  ];


  mediumZoom(postImages, {
    background: 'rgba(0,0,0,0.75)',
  });
}



