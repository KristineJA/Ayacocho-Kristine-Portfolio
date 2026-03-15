const timelineBtns = document.querySelectorAll('.timeline-btn');
const timelineItems = document.querySelectorAll('.timeline-item');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
const buttonContainer = document.querySelector('.timeline-buttons');

let currentIndex = 0;

function showTimeline(index) {
  if (index < 0) index = timelineItems.length - 1;
  if (index >= timelineItems.length) index = 0;

  timelineItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  timelineBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  currentIndex = index;

  const activeBtn = timelineBtns[currentIndex];
  const containerCenter = buttonContainer.offsetWidth / 2;
  const btnCenter = activeBtn.offsetLeft + activeBtn.offsetWidth / 2;
  buttonContainer.scrollTo({
    left: btnCenter - containerCenter,
    behavior: 'smooth'
  });
}

timelineBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showTimeline(parseInt(btn.dataset.index));
  });
});

prevBtn.addEventListener('click', () => showTimeline(currentIndex - 1));
nextBtn.addEventListener('click', () => showTimeline(currentIndex + 1));

let startX = 0;
let isDragging = false;

buttonContainer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

buttonContainer.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const diffX = e.touches[0].clientX - startX;
  buttonContainer.scrollLeft -= diffX;
  startX = e.touches[0].clientX;
});

buttonContainer.addEventListener('touchend', () => {
  isDragging = false;
});

showTimeline(0);
