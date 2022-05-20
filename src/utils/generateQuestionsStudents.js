/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */

import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_CHECK, DEFAULT_CHECK_DATA } from '../constants/constants';

const generateQuestionStudents = (stdArr, questArr) => {
    const arr = [];
    for (let quest of questArr) {
      for (let std of stdArr) {
        const newObject = {
          ...DEFAULT_CHECK,
          id: uuidv4(),
          data: {
            ...DEFAULT_CHECK_DATA,
            studentId: std.student,
            questionId: quest.question,
          },
        };
        console.log(newObject);

        // postAppData(newObject);
        arr.push(newObject);
      }
    }
    return arr;
  };

export default generateQuestionStudents;