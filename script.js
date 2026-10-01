/* =========================
   CERTIFICATE INTERACTION
========================= */

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');

const certs = [...document.querySelectorAll('.cert')];

certs.forEach(card => {

  card.addEventListener('click', () => {

    /* FIRST CLICK
       Poster → actual certificate
    */
    if (!card.classList.contains('flipped')) {

      certs.forEach(other => {
        if (other !== card) {
          other.classList.remove('flipped');
        }
      });

      card.classList.add('flipped');

      return;
    }

    /* SECOND CLICK
       Actual certificate → full screen
    */

    const image = card.dataset.image;

    if (!image || !lightbox || !lightboxImg) return;

    lightboxImg.src = image;

    lightbox.classList.add('open');

    lightbox.setAttribute('aria-hidden','false');

    document.body.style.overflow = 'hidden';
  });

});


/* =========================
   CLOSE FULL CERTIFICATE
========================= */

function closeCertificate(){

  if (!lightbox) return;

  lightbox.classList.remove('open');

  lightbox.setAttribute('aria-hidden','true');

  if (lightboxImg){
    lightboxImg.src = '';
  }

  document.body.style.overflow = '';

  /*
     IMPORTANT:
     Return every certificate to
     the ORIGINAL POSTER.
  */

  certs.forEach(card => {
    card.classList.remove('flipped');
  });
}


/* X BUTTON */

document
  .querySelector('.close-lightbox')
  ?.addEventListener('click', closeCertificate);


/* CLICK OUTSIDE CERTIFICATE */

lightbox?.addEventListener('click', event => {

  if (event.target === lightbox) {
    closeCertificate();
  }

});


/* ESC KEY */

document.addEventListener('keydown', event => {

  if (event.key === 'Escape') {
    closeCertificate();
  }

});
