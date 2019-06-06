import { speakWithReprompt } from '../utils/helpers';
import * as Definitions from '../utils/definitions';
import { Interceptors } from '../Interceptors';

const { TranslationKeys } = Interceptors;

export const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === Definitions.REQUEST_TYPES.LAUNCH;
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const { user: { username } } = handlerInput.requestEnvelope.session;

    const skillname = requestAttributes.t(TranslationKeys.SKILL_NAME);
    let speechOutput = '';

    if (username) {
      speechOutput = requestAttributes.t(TranslationKeys.WELCOME_WITH_NAME, skillname, username);
    } else {
      speechOutput = requestAttributes.t(TranslationKeys.WELCOME, skillname);
    }
    const repromptOutput = requestAttributes.t(TranslationKeys.WELCOME_REPROMPT);

    return speakWithReprompt(handlerInput.responseBuilder)(speechOutput) (repromptOutput)
  }
};
