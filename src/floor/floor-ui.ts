export function createFloor(num: string) {
    let button = document.createElement('button');
    button.className ='widget-button btn-flat reply create fade-out btn-icon-text';
    button.setAttribute('title',`${num}楼`);
    button.setAttribute('id','floor-button');
    button.innerHTML = `<span class='d-button-label floor-text'>#${num}</span>`;
    return button;
}