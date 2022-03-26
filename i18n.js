const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
  otherLanguages: ['fr', 'de', 'es', 'it', 'lit'],
  defaultNS: 'common',
  localeSubpaths: {
    fr: 'fr',
    de: 'de',
    es: 'es',
    it: 'it',
    lit: 'lit'
  },
  localePath: path.resolve('./public/static/locales')
});
