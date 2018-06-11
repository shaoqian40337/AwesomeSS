import { firestore } from './firebase';

// add new exam meta to exam database 
export const addNewExam = (data) => firestore.collection("exams_meta").add(data);

// add new question to question database
export const addNewQuesetion = (data) => firestore.collection("questions_bank").add(data);

// add new question ref to exam database
export const addNewQuestionRef = (questionID, questionRef, examRef) => firestore.collection("exams_meta").doc(examRef).update({questionID:questionRef});

// add new question meta data to question_meta database
export const addNewSingleQuestion = (questionMeta) => firestore.collection("questions_meta").add(questionMeta);

// get meta data of all exams
export const getAllExam = () => firestore.collection("exams_meta").get();

// get one exam detail 
export const getExamWithRef = (examRef) => firestore.collection("exams_meta").doc(examRef).get();

// get meta data of all single questions
export const getAllQuestions = () => firestore.collection("questions_meta").get();

// get one question detail
export const getOneQuestion = (questionRef) => firestore.collection("questions_bank").doc(questionRef).get();

