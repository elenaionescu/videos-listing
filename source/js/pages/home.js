import VideoService from '../modules/videoService';
import navHTML from '../../templates/nav.hogan';
import videoHTML from '../../templates/video.hogan';

let vplayer = window.vplayer;

/**
* @name HomePage
* @desc Specific module for initialising and dealing with events on the Home Page
**/
export default class HomePage {

  constructor() {
    let self = this;
    /* Binds change page to each a-z click
       Allows for sharable link compared to 'click' event */
    window.onhashchange = function() {
      let params = self.calculatePageParams();
      self.changePage(params.section, params.page);
    };

    this.options = {};

    let params = this.calculatePageParams();

    /* On page load */
    this.changePage(params.section, params.page);
  }


  /* Check if section and page is needed to be obtained from the URL query options */
  /**
  * @name changePage
  * @desc obtais section and page from URL query parameters if needed
  * @return object - containing values for section and page
  **/
  calculatePageParams() {
    /* Obtain from hash if not explicitly desired */
    let section, page;
    if (window.location.hash.length < 1) {
      section = 'a';
    } else {
      section = window.location.hash.substr(1, 1);
    }

    /* Catches when the URL is greater than #a */
    if (window.location.hash.length > 2) {
      page = parseInt(window.location.hash.split('page=')[1]);
    } else {
      page = 1;
    }

    return {
      section: section,
      page: page
    };
  }

  /**
  * @name changePage
  * @desc Grabs the value from the query parameters and calls the API and
  * initialises the DOM rendering
  * @param section - desired section
  * @param page - desired page
  **/
  changePage(section, page) {

    var self = this;

    let videoService = window.vplayer.modules.videoService = new VideoService();

    videoService.retrieve(section, page, () => {
      self.options = {
        videos: videoService.getVideos(),
        total: videoService.total,
        section: videoService.section,
        page: videoService.page
      };
      this.render(self.options);
    });
  }


  /**
  * @name render
  * @desc Renders the listings & nav to the DOM
  * @param options - object containing videos list, total, section and page values
  **/
  render(options) {
    let columns = 3;
    let listingsDOM = document.getElementById('listings');
    let totalPages = Math.ceil(options.total / 9); // Maximum needed to show at least 9 on a page

    let index = 0;
    let renderBuffer = '';

    /* Highlight section in menu */
    /* Work around for Safari where you cant loop with forEach on NodeList */
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-char]"),
      function(letter) {
        letter.className = "";
    });
    document.querySelector(`[data-char="${options.section}"]`).classList.add('selected');

    /* If page is not 1, show previous button, if not last page show next
       Uses hogan for the templating engine */
    renderBuffer += navHTML.render({
      prev: options.page !== 1,
      next: totalPages !== options.page,
      page: options.page,
      totalPages: totalPages,
      section: options.section,
      prevPage: parseInt(options.page) - 1,
      nextPage: parseInt(options.page) + 1
    });

    /* Append HTML grid of videos to the render buffer */
    options.videos.forEach((video) => {
      let firstInRow = (index % 3) === 0;
      let lastInRow = ((index + 1) % 3) === 0;

      /* First of row (4 columns) */
      if(firstInRow) {
        renderBuffer += '<div class="row">';
      }

      /* Render video */
      renderBuffer += videoHTML.render(video);

      /* Close off row div */
      if(lastInRow) {
        renderBuffer += '</div>';
      }
      index++;
    });

    listingsDOM.innerHTML = renderBuffer;

  }

}
