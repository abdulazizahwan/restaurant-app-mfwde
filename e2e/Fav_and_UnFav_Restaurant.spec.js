/* eslint-disable no-undef */
const assert = require('assert');

Feature('Fav and Unfav a restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty list of favourite restaurant', ({ I }) => {
  I.seeElement('#list-restaurant-zero');
  I.see('Daftar Restoran Favorit anda masih kosong.', 'p');
});

Scenario('save and unsave a restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.item-restaurant');

  const firstRestoTitle = await I.grabTextFrom(locate('.item-restaurant .title').first());

  // Favorite
  I.seeElement('fav-resto-button');
  I.click(locate('fav-resto-button').first());

  I.amOnPage('/#/favorite');

  I.seeElement('.item-restaurant');

  const firstLikedRestoTitle = await I.grabTextFrom(locate('.item-restaurant .title').first());

  assert.strictEqual(firstLikedRestoTitle, firstRestoTitle);

  // UnFavorite
  I.click(locate('fav-resto-button').first());
  I.seeElement('[aria-label="Tambahkan ke daftar restoran favorit"]');

  I.refreshPage();
  I.seeElement('#list-restaurant-zero');
  I.see('Daftar Restoran Favorit anda masih kosong.', 'p');
});
