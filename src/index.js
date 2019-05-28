import { interceptors } from './Interceptors';
import * as Alexa from 'ask-sdk-core';
import intents from './Intents';

const skillbuilder = Alexa.SkillBuilders.custom();

exports.handler = skillbuilder
  .addRequestHandlers()
  .addRequestInterceptors()
  .addResponseInterceptors()
  .addErrorHandlers()
  .lambda();
