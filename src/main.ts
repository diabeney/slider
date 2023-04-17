import { getAllElements, getElement, isActiveSlide} from "./utils/utils";

const arrowBtns = getAllElements<HTMLButtonElement>('.arrow');
const sliders = getAllElements('.slide');
let currentIndex = 0;

let slideCounter = 0;

function betterChangeSlide(index: number) {
  const sliderwrapper = getElement('.slider-wrapper');
  const slide = sliders.find((_, i) => i === index)!
  sliders.filter((_, i) => i !== index).forEach(slide => slide.setAttribute('data-active', 'false'));
  const parentRect = getElement('.parent').getBoundingClientRect();
  slide.setAttribute('data-active', 'true');
  const { left, right } = slide.getBoundingClientRect();
  const elInParent = ( right < parentRect.right) && (left > parentRect.left);
  if(!elInParent) {
    if(right > parentRect.right) {
      let remainingEl = sliders.slice(sliders.indexOf(slide) + 1).length;
      let multiplier = 0;
      switch (remainingEl) {
        case 5:
          multiplier = 1;
          break;
        case 4:
          multiplier = 2;
          break;
        case 3:
          multiplier = 3;
          break;
        case 2:
          multiplier = 4;
          break;
        case 1:
          multiplier = 5;
          break;
        default:
          multiplier = 1;
        
      }
      let distance = (( parentRect.right - right ) - 16 - (67 * multiplier));
      console.log(distance);
      sliderwrapper.style.transform = `translateX(${distance}px)`;
    } else {
      let distance = ((parentRect.left - left ) + 16);
      sliderwrapper.style.transform = `translateX(${distance}px)`;
    }
  }     
}

betterChangeSlide(0)
arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.classList[1];
    if(type === 'left') {
      currentIndex > 0 && currentIndex--
    } else {
      currentIndex < sliders.length - 1 && currentIndex++;
    }
    betterChangeSlide(currentIndex);
  })
})

sliders.forEach(slide => {
  slide.addEventListener('mouseover' , () => {
    if(isActiveSlide(slide)) null;
    else {
      slide.classList.add('mouseover')
    }
  })
  slide.addEventListener('mouseleave', () => {
    slide.classList.remove('mouseover')
  }) 
})

sliders.forEach(slide => {
  slide.addEventListener('click', () => {
    !isActiveSlide(slide) && betterChangeSlide(sliders.indexOf(slide));
    currentIndex = sliders.indexOf(slide)
  })
})




