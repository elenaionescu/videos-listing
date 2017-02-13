var expect = chai.expect;

import VideoService from '../../../source/js/modules/videoService';

describe('VideoService Module', () => {

  it('builds a valid api end point', () => {
    let service = new VideoService();
    let apiEndPoint = service.buildAPIEndPoint('Technology', 1);
    expect(apiEndPoint).to.eql('https://gist.githubusercontent.com/fedecarg/5772727ae899890d5bcf758a437e7fe5/raw/d030cd98ad5015707be919523b5f8710cbc6c623/bbc_news_test_data.json?section=Europe?page=1');
  });

  it('retrieves results', () => {
    let service = new VideoService();
    let response = [];
    service.retrieve('Technology', 1, ()=> {
      expect(service.count).to.be.above(0);
      expect(service.videos.length).to.be.above(0);
      expect(service.videos[0].headline.length).to.be.above(0);
    });
  });

});
