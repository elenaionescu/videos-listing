var expect = chai.expect;

import HomePage from '../../../source/js/pages/home';

describe('Home Page Module', () => {

  it('can get params from URL', () => {
    let homePage = new HomePage();
    window.location.hash = '#London';
    let params = homePage.calculatePageParams();

    expect(params.section).to.eql('London');
    expect(params.page).to.eql(1);
  });

});
