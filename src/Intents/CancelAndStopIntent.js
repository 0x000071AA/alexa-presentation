import { speak } from '../utils/helpers';
import { Interceptors } from '../Interceptors';
import * as Definitions from '../utils/definitions';

const { TranslationKeys } = Interceptors;

export const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === Definitions.REQUEST_TYPES.INTENT
      && (request.intent.name === Definitions.AMAZON.CancelIntent
        || request.intent.name === Definitions.AMAZON.StopIntent);
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t(TranslationKeys.END);

    return speak(handlerInput.responseBuilder)(speechOutput);
  }
};
