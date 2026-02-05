export const getExtension = (filename) => {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export const isImage = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      //etc
      return true;
  }
  return false;
}

export const isVideo = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      // etc
      return true;
  }
  return false;
}

export const setMaxUploadFilesize = (val) => {
  try {
    localStorage.setItem('max_upload_filesize', JSON.stringify( val ));
  } catch (error) {
    console.log(error)
  }
}
export const getMaxUploadFilesize = () => {
  try {
    return parseFloat( JSON.parse( localStorage.getItem('max_upload_filesize') ) )
  } catch (error) {
    console.log(error)
  }
}