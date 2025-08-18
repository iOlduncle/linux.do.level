export function createFloor(num: string) {
    let button = document.createElement('button');
    button.className ='btn no-text btn-icon btn-flat';
    button.setAttribute('title',`${num}楼`);
    button.setAttribute('id','floor-button');
    button.innerHTML = `<span class='d-button-label floor-text'>#${num}</span>`;
    return button;
}