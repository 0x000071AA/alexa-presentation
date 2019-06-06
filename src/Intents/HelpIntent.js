import { speakWithReprompt } from '../utils/helpers';
import { Interceptors } from '../Interceptors';
import * as Definitions from '../utils/definitions';

const { TranslationKeys } = Interceptors;

export const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === Definitions.REQUEST_TYPES.INTENT
      && request.intent.name === Definitions.AMAZON.HelpIntent;
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const speechOutput = requestAttributes.t(
      TranslationKeys.HELP,
      requestAttributes.t(TranslationKeys.SKILL_NAME),
      requestAttributes.t(TranslationKeys.HELP_PHRASES)
    );
    const repromptOutput = requestAttributes.t(TranslationKeys.HELP_REPROMPT);

    return speakWithReprompt(handlerInput.responseBuilder)(speechOutput) (repromptOutput);
  }
};
