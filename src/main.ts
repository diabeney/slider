import { getAllElements, getElement, isActiveSlide} from "./utils/utils";

const arrowBtns = getAllElements<HTMLButtonElement>('.arrow');
const sliders = getAllElements('.slide');
const sliderwrapper = getElement('.slider')
let currentIndex = 0;

function move(activeslide: HTMLElement) {
  const parentRect = getElement('.parent').getBoundingClientRect();
  const { left, right } = activeslide.getBoundingClientRect();
  const elInParent = (left > parentRect.left) && (right < parentRect.right);
  if(!elInParent) {
    if(left < parentRect.left) return (parentRect.left - left);
    else {
      return parentRect.right - right
    }
  }
  else return 0;

}
function changeSlide(index: number) {
  sliders.forEach(slide => {
    if(sliders.indexOf(slide) === index) {
      slide.setAttribute('data-active', 'true');
      const moveamount = move(slide);
      console.log(moveamount);
      sliderwrapper.style.transform = `translateX(${moveamount}px)`;
    }
    else {
      slide.setAttribute('data-active', 'false');
    }
  })

} 
changeSlide(0)

arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.classList[1];
    if(type === 'left') {
      currentIndex > 0 && currentIndex--
    } else {
      currentIndex < sliders.length - 1 && currentIndex++;
    }
    changeSlide(currentIndex);
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
    currentIndex = sliders.indexOf(slide)
  })
})




