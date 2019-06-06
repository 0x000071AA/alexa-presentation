import { speak } from '../utils/helpers';
import * as Definitions from '../utils/definitions';
import { Interceptors } from '../Interceptors';

const { TranslationKeys } = Interceptors;

export const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === Definitions.REQUEST_TYPES.SESSION_ENDED;
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const speechOutput = requestAttributes.t(TranslationKeys.FALLBACK);

    if (handlerInput.requestEnvelope.request.error) {
      console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope.request.error)}`);
    }

    return speak(handlerInput.responseBuilder)(speechOutput);
  }
};
