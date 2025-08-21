const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
const bgVideo = document.getElementById('bg-video');

bgVideo.setAttribute('playsinline', '');  // OR: bgVideo.playsInline = true;

// Map tab names to video files
const tabVideos = {
  home: 'sitebg3.mp4',
  music: 'sitebg.mp4',
  videos: 'sitebg5.mp4',
  contact: 'sitebg2.mp4',
  bio: 'sitebg4.mp4'
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Switch active tab styling
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Switch tab content visibility
    contents.forEach(c => c.classList.remove('active'));
    const selectedContent = document.getElementById(tab.dataset.tab);
    if (selectedContent) selectedContent.classList.add('active');

    // Switch background video
    const videoSrc = tabVideos[tab.dataset.tab];
    const currentSrc = bgVideo.querySelector('source').getAttribute('src');

    if (videoSrc && currentSrc !== videoSrc) {
      bgVideo.style.opacity = 0;

      bgVideo.addEventListener('transitionend', function onFadeOut() {
        bgVideo.removeEventListener('transitionend', onFadeOut);

        bgVideo.querySelector('source').setAttribute('src', videoSrc);
        bgVideo.load();
        bgVideo.play().catch(err => {
          console.warn('Autoplay blocked or interrupted:', err);
        });

        bgVideo.style.opacity = 1;
      });
    }
  });
});
