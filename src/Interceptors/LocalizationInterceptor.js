import i18next from 'i18next'
import sprintf from 'i18next-sprintf-postprocessor'
import { languageStrings } from '../i18n/index';


module.exports.TranslationKeys = Object.keys(languageStrings.dev.translation)
  .reduce((obj, cur) => ({...obj, [cur]: cur}), {});

module.exports.LocalizationHandler = {
  process(handlerInput) {
    i18next.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'dev',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    }).then(t => {

      const attributes = handlerInput.attributesManager.getRequestAttributes();

      const wrapper = (...args) => {
        let values = [];

        for (let i = 1; i < args.length; i++) {
          values.push(args[i]);
        }
        const value = t(args[0], {
          returnObjects: true,
          postProcess: 'sprintf',
          sprintf: values
        });
        if (Array.isArray(value)) {
          return value[Math.floor(Math.random() * value.length)];
        } else {
          return value;
        }
      };

      attributes.t = (...args) => wrapper(...args);
      handlerInput.attributesManager.setRequestAttributes(attributes);
    });
  }
};
