const Alexa = require('ask-sdk-core');

const IntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },

  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    let speakOutput = '';

    switch (intentName) {
      case 'WhoCreatedAppIntent':
        speakOutput = 'La aplicación fue creada por José Ángel.';
        break;

      case 'WhatCareerIntent':
        speakOutput = 'Estudia la carrera de Ingeniería en Desarrollo y Gestión de Software.';
        break;

      case 'FavoriteColorIntent':
        speakOutput = 'Mi color favorito es el verde.';
        break;

      case 'FavoriteArtistIntent':
        speakOutput = 'Mi grupo favorito es Paramore.';
        break;

      default:
        speakOutput = 'Lo siento, no entendí tu pregunta.';
    }

    return handlerInput.responseBuilder.speak(speakOutput).reprompt().getResponse();
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },

  handle(handlerInput) {
    const speakOutput = 'Bienvenido a mi skill. Puedes preguntarme quién creó la app, qué carrera estudia, su color favorito o su artista favorito.';
    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },

  handle(handlerInput) {
    const speakOutput = 'Puedes preguntarme cosas como: quién creó la aplicación, qué carrera estudia, su color favorito o artista favorito.';
    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },

  handle(handlerInput, error) {
    console.log(`Error capturado: ${error.message}`);
    return handlerInput.responseBuilder.speak('Lo siento, ocurrió un error. Inténtalo de nuevo.').getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    IntentHandler,
    HelpIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
