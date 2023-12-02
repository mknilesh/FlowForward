/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getExercisesByPhase = functions.https.onCall(async (data, context) => {
  try {
    const phase = data.phase;
    const exerciseType = getExerciseTypeFromPhase(phase);
    const exercisesRef = admin.firestore().collection('exercises');
    const snapshot = await exercisesRef.where('type', '==', exerciseType).get();
    
    if (snapshot.empty) {
      console.log('No matching exercises found');
      return { exercises: [] };
    }
    
    const exercises = [];
    snapshot.forEach(doc => exercises.push(doc.data()));
    return { exercises };
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw new functions.https.HttpsError('internal', 'Unable to fetch exercises', error);
  }
});


function getExerciseTypeFromPhase(phase) {
  const phaseToTypeMap = {
    'Menstrual Phase': 'light',
    'Follicular Phase': 'strength',
    'Ovulation Phase': 'high_intensity',
    'Luteal Phase': 'moderate'
  };
  
  return phaseToTypeMap[phase] || 'general';
}



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
