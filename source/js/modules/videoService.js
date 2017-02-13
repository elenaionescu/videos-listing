import reqwest from 'reqwest';

import Video from './video';

/**
* @name VideoService
* @desc Specific module for retrieving and structuring the videoListing API
**/
export default class VideoService {

  constructor() {
    this.videos = [];
    this.section = '';
    this.page = 1;
    this.total = 0;
  }

  getVideos() {
    return this.videos;
  }

  buildAPIEndPoint(section, page) {
    let BASE_URI = "https://gist.githubusercontent.com/";
    let END_POINT = `fedecarg/5772727ae899890d5bcf758a437e7fe5/raw/d030cd98ad5015707be919523b5f8710cbc6c623/bbc_news_test_data.json`;

    return BASE_URI + END_POINT;
  }

  /**
  * @name retrieve
  * @desc Retrieves videos for a specific section
  * @param section - String - Single section used to query azListing API
  * @param page - int - Specifies which page of data to return
  * @param callback - function - Functional to call after response from the initial request
  **/
  retrieve(section, page, callback) {
    this.section = section;
    this.page = page;
    var self = this;
    reqwest({
      url: this.buildAPIEndPoint(section.toLowerCase(), page),
      method: 'get',
      success: (response) => {

        self.total = response.list_videos.count;
        response.list_videos.elements.forEach((rawElement) => {
          self.videos.push(new Video(rawElement));
        });

        callback();
      }
    });
  }

}
