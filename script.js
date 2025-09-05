// ----------------------
// Grab DOM elements
// ----------------------
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
const bgVideo = document.getElementById('bg-video');

bgVideo.setAttribute('playsinline', '');  // Ensure mobile inline playback

// ----------------------
// Map tab names to video files
// ----------------------
const tabVideos = {
  home: null,        // Home is handled by getHomeVideo()
  music: 'sitebg.mp4',
  videos: 'sitebg5.mp4',
  contact: 'sitebg2.mp4',
  bio: 'sitebg4.mp4'
};

// ----------------------
// Function to select correct Home video based on orientation
// ----------------------
function getHomeVideo() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    return 'sitebgv.mp4';   // portrait / phone
  }
  return 'sitebg3.mp4';     // landscape / desktop
}

// ----------------------
// Update Home video dynamically
// ----------------------
function updateHomeVideo() {
  const currentTab = document.querySelector('.tab.active').dataset.tab;
  if (currentTab === 'home') {
    const homeVideoSrc = getHomeVideo();
    const currentSrc = bgVideo.querySelector('source').getAttribute('src');

    if (currentSrc !== homeVideoSrc) {
      // Fade out old video
      bgVideo.style.opacity = 0;

      bgVideo.addEventListener('transitionend', function onFadeOut() {
        bgVideo.removeEventListener('transitionend', onFadeOut);

        // Set new source
        bgVideo.querySelector('source').setAttribute('src', homeVideoSrc);
        bgVideo.load();
        bgVideo.play().catch(err => {
          console.warn('Autoplay blocked or interrupted:', err);
        });

        // Fade in
        bgVideo.style.opacity = 1;
      });
    }
  }
}

// ----------------------
// Handle tab clicks
// ----------------------
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Switch active tab styling
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Switch tab content visibility
    contents.forEach(c => c.classList.remove('active'));
    const selectedContent = document.getElementById(tab.dataset.tab);
    if (selectedContent) selectedContent.classList.add('active');

    // Determine correct video
    let videoSrc = tabVideos[tab.dataset.tab];
    if (tab.dataset.tab === 'home') {
      videoSrc = getHomeVideo();  // Orientation-aware for Home
    }

    const currentSrc = bgVideo.querySelector('source').getAttribute('src');

    if (videoSrc && currentSrc !== videoSrc) {
      // Fade out old video
      bgVideo.style.opacity = 0;

      bgVideo.addEventListener('transitionend', function onFadeOut() {
        bgVideo.removeEventListener('transitionend', onFadeOut);

        // Set new source
        bgVideo.querySelector('source').setAttribute('src', videoSrc);
        bgVideo.load();
        bgVideo.play().catch(err => {
          console.warn('Autoplay blocked or interrupted:', err);
        });

        // Fade in
        bgVideo.style.opacity = 1;
      });
    }
  });
});

// ----------------------
// Run on initial page load
// ----------------------
window.addEventListener('DOMContentLoaded', () => {
  updateHomeVideo();
});

// ----------------------
// Optional: Auto-switch Home video on resize / rotation
// ----------------------
window.addEventListener('resize', () => {
  updateHomeVideo();
});
