const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
let bgVideo = document.getElementById('bg-video');

// Map tab names to video files
const tabVideos = {
  home: 'sitebg3.mp4',  // Default HOME video
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

    // Switch background video with fade
    const videoSrc = tabVideos[tab.dataset.tab];
    if (videoSrc && !bgVideo.src.includes(videoSrc)) {
      // Fade out current video
      bgVideo.style.transition = 'opacity 0.5s ease';
      bgVideo.style.opacity = 0;

      // Wait for fade out
      setTimeout(() => {
        // Swap video
        const newVideo = document.createElement('video');
        newVideo.src = videoSrc;
        newVideo.autoplay = true;
        newVideo.muted = true;
        newVideo.loop = true;
        newVideo.style.position = 'fixed';
        newVideo.style.top = 0;
        newVideo.style.left = 0;
        newVideo.style.width = '100%';
        newVideo.style.height = '100%';
        newVideo.style.objectFit = 'cover';
        newVideo.style.zIndex = '-2';
        newVideo.style.opacity = 0;
        newVideo.style.transition = 'opacity 0.5s ease';

        newVideo.addEventListener('canplay', () => {
          bgVideo.parentNode.replaceChild(newVideo, bgVideo);
          bgVideo = newVideo;

          // Fade in new video
          requestAnimationFrame(() => {
            bgVideo.style.opacity = 1;
          });
        });

        document.body.appendChild(newVideo);
      }, 50); // match the fade-out duration
    }
  });
});
