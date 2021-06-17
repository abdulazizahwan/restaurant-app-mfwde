const Utility = {
  showLoadingOverlay() {
    document.querySelector('#pageLoader').classList.remove('pageLoader-hidden');
    return this;
  },
  hideLoadingOverLay() {
    document.querySelector('#pageLoader').classList.add('pageLoader-hidden');
    return this;
  },
  setMessage(text) {
    document.querySelector('#pageLoader span').innerHTML = text;
    return this;
  },
  defaultMessage() {
    document.querySelector('#pageLoader span').innerHTML = 'Sedang Menyiapkan Halaman Untuk Anda';
    return this;
  },
};

export default Utility;
