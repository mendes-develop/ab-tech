import videoArray from '../fixtures/videos.json'
import videoData from '../fixtures/newVideo.json'

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Sign in', () => {
    cy.signin('john', 'smith')
    cy.getCookie('user_id').should('exist')
  })

  it('Find existing video and navigate', () => {
    cy.intercept('GET', `*api/videos?user_id=john_smith`, { statusCode: 200, body: videoArray }).as('getVideos');
    cy.signin('john', 'smith')

    cy.get(`[data-testid="video-list-${videoArray.videos[0].id}"]`).should('be.visible')
    cy.get(`[data-testid="video-list-${videoArray.videos[0].id}"]`).click()
    cy.location('pathname').should('contain', "video-detail");
  })

  it('Should allow a user to add a new video', () => {
    cy.intercept('POST', '*/videos').as('createVideo');
    cy.signin('john', 'smith')

    // get the button that allows to open the modal
    cy.get('[data-testid="PlusIcon"]').click()

    // type the new video information and submit
    cy.get('input[name="title"]').type(videoData.video.title);
    cy.get('input[name="description"]').type(videoData.video.description);
    cy.get('input[name="video_url"]').type(videoData.video.video_url);
    cy.get('button[type="submit"]').contains('Submit Video').click();

    // check that the post request has the correct information
    cy.wait('@createVideo').then((interception) => {
      expect(interception.request.body).to.have.property('title', videoData.video.title);
      expect(interception.request.body).to.have.property('description', videoData.video.description);
      expect(interception.request.body).to.have.property('video_url', videoData.video.video_url);
      expect(interception.request.body).to.have.property('user_id', 'john_smith');
    });

  });

  it('Sign out', () => {
    cy.signin('john', 'smith')
    cy.get('button[aria-label=Profile]').should('be.visible')
    cy.get('button[aria-label=Profile]').click()
    cy.get('button').contains('Sign out').click();
    cy.getCookie('user_id').should('not.exist')
    cy.get('button').contains("Sign in to start creating videos").should('be.visible')
  })
})