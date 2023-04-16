// all non-null assertions are intentional

export function getElement<T extends HTMLElement>(selector: string): T {
    return document.querySelector(selector)!;
}

export function getManyElements(...selectors: string[]) {
    return selectors.map(selector => getElement(selector))
}

export function getAllElements<T extends HTMLElement>(selector: string): T[] {
    return Array.from(document.querySelectorAll(selector))
}

export function isActiveSlide(element: HTMLElement) {
    const attr = element.getAttribute('data-active');
    return attr === 'true';
}

