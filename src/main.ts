import { getAllElements, getElement, isActiveSlide} from "./utils/utils";
import { computeMultiple } from "./utils/utils";

const arrowBtns = getAllElements<HTMLButtonElement>('.arrow');
const sliders = getAllElements('.slide');

let CURRENT_INDEX = 0;

let distance = 0;

function changeSlide(index: number) {
  const sliderwrapper = getElement('.slider-wrapper');
  const slide = sliders.find((_, i) => i === index)!;

  sliders.filter((_, i) => i !== index).forEach(slide => {
    slide.children[0].classList.remove('animate');
    slide.setAttribute('data-active', 'false');
  })

  const parentRect = getElement('.parent').getBoundingClientRect();
  slide.children[0].classList.add('animate');
  slide.setAttribute('data-active', 'true');
  const { left, right } = slide.getBoundingClientRect();
  const elInParent = ( right < parentRect.right) && (left > parentRect.left);

  if(!elInParent) {
    let multiplier;
    let remainingEl;
    if(right > parentRect.right) {
      remainingEl = sliders.slice(sliders.indexOf(slide) + 1).length;
      multiplier = computeMultiple(remainingEl, 'right');
      distance = (( parentRect.right - right ) - (67 * multiplier));
      sliderwrapper.style.transform = `translateX(${distance}px)`;
    } else {
      remainingEl = sliders.slice(0, sliders.indexOf(slide) + 1).length;
      multiplier = computeMultiple(remainingEl, 'left');
      distance += (67 * multiplier);
      sliderwrapper.style.transform = `translateX(${distance}px)`;
    }
  }     
}

changeSlide(0)
arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.classList[1];
    if(type === 'left') {
      CURRENT_INDEX > 0 && CURRENT_INDEX--
    } else {
      CURRENT_INDEX < sliders.length - 1 && CURRENT_INDEX++;
    }
    changeSlide(CURRENT_INDEX);
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
    !isActiveSlide(slide) && changeSlide(sliders.indexOf(slide));
    CURRENT_INDEX = sliders.indexOf(slide)
  })
})




