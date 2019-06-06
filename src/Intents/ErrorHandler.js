import * as Definitions from '../utils/definitions';
import { speak, getSlotValues } from '../utils/helpers';
import { Interceptors } from '../Interceptors';

const { TranslationKeys } = Interceptors;

export const ErrorHandler = {
  canHandle(handlerInput, err) {
    return true;
  },
  handle(handlerInput, err) {
    console.log('Error: ', err);
    const request = handlerInput.requestEnvelope.request;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const skillname = requestAttributes.t(TranslationKeys.SKILL_NAME);

    let speechOutput = '';

    switch (err.type) {
      case Definitions.ERROR_TYPES.InternalError: {
        return;
      }
      default: {
        speechOutput += requestAttributes.t(TranslationKeys.FALLBACK, skillname);
      }
    }

    return speak(handlerInput.responseBuilder)(speechOutput);
  }
};
