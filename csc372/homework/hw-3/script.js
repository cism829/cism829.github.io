const gallery = document.querySelectorAll('img.small');

for (let index = 0; index < gallery.length; index++) {
  const element = gallery[index];
  element.addEventListener('click', expandImage);
  element.addEventListener('dblclick', revertBack);
}

function expandImage(event) {
  const clickedImage = event.currentTarget;
  const currentBigImage = document.querySelector('.big');
  if (currentBigImage) {
    currentBigImage.classList.remove('big');
    currentBigImage.classList.add('small');
    currentBigImage.nextElementSibling.style.display = 'none';
  }
  clickedImage.classList.remove('small');
  clickedImage.classList.add('big');
  clickedImage.nextElementSibling.style.display = 'block';
}


const infoSections = document.querySelectorAll('.info');
for (let i = 0; i < infoSections.length; i++) {
  infoSections[i].style.display = 'none';
}


//function may be redundant but its just the way I got it to work to revert to normal
function revertBack(event) {
  const image = event.currentTarget;
  const currentBigImage = document.querySelector('.big');
  currentBigImage.classList.remove('big');
  currentBigImage.classList.add('small');
  currentBigImage.nextElementSibling.style.display = 'none';
  currentBigImage.nextElementSibling.nextElementSibling.style.display = 'none';
}