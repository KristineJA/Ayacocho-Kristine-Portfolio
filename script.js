const timelineBtns = document.querySelectorAll('.timeline-btn');
const timelineItems = document.querySelectorAll('.timeline-item');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
const buttonContainer = document.querySelector('.timeline-buttons');

let currentIndex = 0;

function showTimeline(index){

  if(index < 0){
    index = timelineItems.length - 1;
  }

  if(index >= timelineItems.length){
    index = 0;
  }

  timelineItems.forEach((item,i)=>{
    item.classList.toggle('active', i === index);
  });

  timelineBtns.forEach((btn,i)=>{
    btn.classList.toggle('active', i === index);
  });

  currentIndex = index;

  const activeBtn = timelineBtns[currentIndex];
  const containerRect = buttonContainer.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();

  buttonContainer.scrollLeft += 
    btnRect.left - containerRect.left - 
    containerRect.width/2 + 
    btnRect.width/2;
}

timelineBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    showTimeline(parseInt(btn.dataset.index));
  });
});

prevBtn.addEventListener('click',()=>{
  showTimeline(currentIndex - 1);
});

nextBtn.addEventListener('click',()=>{
  showTimeline(currentIndex + 1);
});