import { speak } from '../utils/helpers';
import { Interceptors } from '../Interceptors';
import * as Definitions from '../utils/definitions';

const { TranslationKeys } = Interceptors;

export const IntroduceAgendaHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === Definitions.REQUEST_TYPES.INTENT
      && request.intent.name === Definitions.INTRODUCE_AGENDA_INTENT;
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    let speechOutput = '';

    return speak(handlerInput.responseBuilder)(speechOutput);
  }
};
