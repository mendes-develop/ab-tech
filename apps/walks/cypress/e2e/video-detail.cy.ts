import videoArray from '../fixtures/videos.json'
import comments from '../fixtures/comments.json'

describe('Video Details Screen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', `*api/videos?user_id=john_smith`, { statusCode: 200, body: videoArray }).as('getVideos');
    cy.signin('john', 'smith')
  })

  it('Comment on a video', () => {
    cy.intercept('POST', '*/videos/comments').as('createComment');
    cy.intercept('GET', `*comments?video_id=${videoArray.videos[0].id}`,
      { statusCode: 200, body: comments }
    ).as('getVideoComment');

    cy.get(`[data-testid="video-list-${videoArray.videos[0].id}"]`).click()

    // go to comment form, type a message and submit
    cy.get('textarea[name="content"]').type('lorem ipsum');
    cy.get('button[type="submit"]').click();

    cy.wait('@createComment').then((interception) => {
      expect(interception.request.body).to.have.property('content', 'lorem ipsum');
      expect(interception.request.body).to.have.property('video_id', videoArray.videos[0].id);
    });
  })
})