var expect = chai.expect;

import Video from '../../../source/js/modules/video';
import MockVideo from '../../mocks/video';

describe('Video Module', () => {

  /* Although it does assert on all fields, it will test that the raw data can
  transversed and is complete */
  it('can handle api response data', () => {
    let video = new Video(MockVideo);
    expect(video.title).to.eql(MockVideo.title);
    expect(video.id).to.eql(MockVideo.id);
  });

  it('can create small, medium & large images', () => {
    let video = new Video();
    let imageHrefRaw = 'http://ichef.bbci.co.uk/images/ic/{recipe}/p0475dx5.jpg';

    expect(video.getImageHref(imageHrefRaw, 'SMALL')).to.eql('http://ichef.bbci.co.uk/images/ic/96x96/p0475dx5.jpg');
    expect(video.getImageHref(imageHrefRaw, 'MEDIUM')).to.eql('http://ichef.bbci.co.uk/images/ic/112x112/p0475dx5.jpg');
    expect(video.getImageHref(imageHrefRaw, 'LARGE')).to.eql('http://ichef.bbci.co.uk/images/ic/128x128/p0475dx5.jpg');
  });


});
