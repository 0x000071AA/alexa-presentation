const requiredSlots = [];

export const canFulfill = fulfill => ({
  canFulfill: fulfill ? 'YES' : 'NO',
  slots: {
    ...(requiredSlots.reduce((obj, el) => ({
      ...obj,
      [el]: {
        canUnderstand: 'YES',
        canFulfill: fulfill ? 'YES' : 'NO'
      }
    }), {}))
  }});

export const getSlotValues = slots => Object.keys(slots).reduce((obj, item) => {
  if (!(slots && slots[item])) {
    return { ...obj };
  }
  const name = slots[item].name;

  if (slots[item].resolutions
    && slots[item].resolutions.resolutionsPerAuthority
    && slots[item].resolutions.resolutionsPerAuthority[0]
    && slots[item].resolutions.resolutionsPerAuthority[0].status
    && slots[item].resolutions.resolutionsPerAuthority[0].status.code) {

    switch (slots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      case SLOT_MATCH.Match:
        return {
          ...obj,
          [name]: {
            synonym: slots[item].value,
            value: slots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            id: slots[item].resolutions.resolutionsPerAuthority[0].values[0].value.id,
            isValidated: true
          }
        };
      case SLOT_MATCH.NoMatch:
        return {
          ...obj,
          [name]: {
            synonym: slots[item].value,
            value: slots[item].value,
            id: null,
            isValidated: false
          }
        };
      default:
        return { ...obj }
    }
  } else {
    return {
      ...obj,
      [name]: {
        synonym: slots[item].value,
        value: slots[item].value,
        id: slots[item].id,
        isValidated: false
      }
    };
  }
}, {});

export const AlexaError = (internalError, type, reason) => ({
  message: internalError,
  type: type,
  ...(reason? { reason } : {})
});

export const speak = handler => speech =>
  handler.speak(speech).getResponse();

export const speakWithReprompt = handler => speech => reprompt =>
  handler.speak(speech).reprompt(reprompt).getResponse();
