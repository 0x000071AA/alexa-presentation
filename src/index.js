import { Interceptors } from './Interceptors';
import * as Alexa from 'ask-sdk-core';
import Intents from './Intents';

const skillbuilder = Alexa.SkillBuilders.custom();

exports.handler = skillbuilder
  .addRequestHandlers(
    Intents.LaunchRequestHandler,
    Intents.SessionEndedRequestHandler,
    Intents.CancelAndStopIntentHandler,
    Intents.HelpIntentHandler,
    Intents.IntroduceAgendaHandler,
  )
  .addRequestInterceptors(Interceptors.LocalizationHandler)
  // .addResponseInterceptors()
  .addErrorHandlers(Intents.ErrorHandler)
  .lambda();
