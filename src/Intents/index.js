import { SessionEndedRequestHandler } from './SessionEndedIntent';
import { CancelAndStopIntentHandler } from './CancelAndStopIntent';
import { LaunchRequestHandler } from './LaunchIntent';
import { HelpIntentHandler } from './HelpIntent';
import { ErrorHandler } from './ErrorHandler';
import { IntroduceAgendaHandler } from './IntroduceAgendaIntent';

export default {
  SessionEndedRequestHandler,
  CancelAndStopIntentHandler,
  HelpIntentHandler,
  ErrorHandler,
  LaunchRequestHandler,
  IntroduceAgendaHandler,
};
