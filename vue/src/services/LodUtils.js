export default {
  getTypeNameFromUri(uri) {
    if (uri.includes('w3.org')) {
      return uri.split('#')[1];
    } else {
      var arr = uri.split('/');
      return arr[arr.length - 1];
    }
  }
}
