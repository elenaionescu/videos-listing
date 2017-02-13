var expect = chai.expect;

describe('vPlayer Object', () => {

  it('should be defined', () => {
    expect(window.vplayer).to.not.be.undefined;
  });

  it('pages should be defined', () => {
    expect(window.vplayer.pages).to.not.be.undefined;
  });

  it('modules should be defined', () => {
    expect(window.vplayer.modules).to.not.be.undefined;
  });

});
