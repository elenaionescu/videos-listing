var IMAGE_RECIPES = {
  'SMALL': '96x96',
  'MEDIUM': '112x112',
  'LARGE': '128x128'
};

/**
* @name Video
* @desc Object to structure API result data
**/
export default class Video {

  constructor(data) {
    if(typeof data !== 'undefined') {
      this.raw = data;
      this.headline = data.advert.shortHeadline;
      this.duration = data.media.duration;
      this.section = data.media.section;
      this.link = data.advert.uri;
      this.image = this.getImageHref(data.media.image.href, 'MEDIUM');
    }
  }

  /**
  * @name getImageHref
  * @desc Builds href for images using the image recipes constants
  * @param image - String - href with {recipe} variable in string
  * @param size - String - name of the constant to use from image recipe constant
  **/
  getImageHref(image, size) {
    return image.replace('{recipe}', IMAGE_RECIPES[size]);
  }

}
