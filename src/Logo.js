export class Logo {
  renderIntoElement(elment) {
    const logoElement = document.createElement('div');
    logoElement.innerHTML = 'awesome LOGO';
    elment.appendChild(logoElement);
  }
}