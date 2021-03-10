let data = {
  stats: {
    alloted: 0,
    skipped: 0,
    correct: 0,
    wrong: 0,
    allotted: 0,
    time: 0,
  },
  questions: [
    "6047a044162291bee8efcf42",
    "60471b5246351ba304f8f0b4",
    "6047a03c162291bee8efcf41",
    "6047a049162291bee8efcf43",
    "6047a04f162291bee8efcf44",
  ],
  isStatsUpdated: false,
  answers: [
    {
      outcome: "CORRECT",
      questionId: "6047a044162291bee8efcf42",
      time: 5,
      type: "MCQ",
      selected: 2,
    },
    {
      outcome: "WRONG",
      questionId: "60471b5246351ba304f8f0b4",
      time: 5,
      type: "MCQ",
      selected: 3,
    },
    {
      outcome: "SKIPPED",
      questionId: "6047a03c162291bee8efcf41",
      time: 5,
      type: "MCQ",
      selected: -1,
    },
    {
      outcome: "SKIPPED",
      questionId: "6047a049162291bee8efcf43",
      time: 5,
      type: "MCQ",
      selected: -1,
    },
    {
      outcome: "CORRECT",
      questionId: "6047a04f162291bee8efcf44",
      time: 5,
      type: "MCQ",
      selected: 2,
    },
  ],
  _id: "60484097b12cf851f1f5c6ea",
};

let res = [
  [
    {
      questions: [
        {
          stats: {
            alloted: 5,
            skipped: 0,
            correct: 5,
            wrong: 0,
          },
          _id: "6047a044162291bee8efcf42",
          type: "MCQ",
          statement:
            "What will be the output of the following JavaScript code? \n```javascript \n[1, 2, 3].map(num => {  \nif (typeof num === 'number') return;  \nreturn num * 2;});\n```",
          explanation: "For testing JAVASCRIPT 4",
          options: [
            {
              text: "Prints the contents of each property of o",
              correct: false,
            },
            {
              text: "Returns undefined",
              correct: true,
            },
            {
              text: "Prints only one property",
              correct: false,
            },
            {
              text: "Prints the address of elements",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
  [
    {
      questions: [
        {
          stats: {
            alloted: 5,
            skipped: 0,
            correct: 0,
            wrong: 5,
          },
          _id: "60471b5246351ba304f8f0b4",
          type: "MCQ",
          statement:
            "What will be the output of the following JavaScript code? \n```javascript \n[1, 2, 3].map(num => {  \nif (typeof num === 'number') return;  \nreturn num * 2;});\n```",
          explanation: "For testing JAVASCRIPT 1",
          options: [
            {
              text: "Prints the contents of each property of o",
              correct: false,
            },
            {
              text: "Returns undefined",
              correct: true,
            },
            {
              text: "Prints only one property",
              correct: false,
            },
            {
              text: "Prints the address of elements",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
  [
    {
      questions: [
        {
          stats: {
            alloted: 5,
            skipped: 5,
            correct: 0,
            wrong: 0,
          },
          _id: "6047a03c162291bee8efcf41",
          type: "MCQ",
          statement:
            "What will be the output of the following JavaScript code? \n```javascript \n[1, 2, 3].map(num => {  \nif (typeof num === 'number') return;  \nreturn num * 2;});\n```",
          explanation: "For testing JAVASCRIPT 3",
          options: [
            {
              text: "Prints the contents of each property of o",
              correct: false,
            },
            {
              text: "Returns undefined",
              correct: true,
            },
            {
              text: "Prints only one property",
              correct: false,
            },
            {
              text: "Prints the address of elements",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
  [
    {
      questions: [
        {
          stats: {
            alloted: 5,
            skipped: 5,
            correct: 0,
            wrong: 0,
          },
          _id: "6047a049162291bee8efcf43",
          type: "MCQ",
          statement:
            "What will be the output of the following JavaScript code? \n```javascript \n[1, 2, 3].map(num => {  \nif (typeof num === 'number') return;  \nreturn num * 2;});\n```",
          explanation: "For testing JAVASCRIPT 5",
          options: [
            {
              text: "Prints the contents of each property of o",
              correct: false,
            },
            {
              text: "Returns undefined",
              correct: true,
            },
            {
              text: "Prints only one property",
              correct: false,
            },
            {
              text: "Prints the address of elements",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
  [
    {
      questions: [
        {
          stats: {
            alloted: 5,
            skipped: 0,
            correct: 5,
            wrong: 0,
          },
          _id: "6047a04f162291bee8efcf44",
          type: "MCQ",
          statement:
            "What will be the output of the following JavaScript code? \n```javascript \n[1, 2, 3].map(num => {  \nif (typeof num === 'number') return;  \nreturn num * 2;});\n```",
          explanation: "For testing JAVASCRIPT 6",
          options: [
            {
              text: "Prints the contents of each property of o",
              correct: false,
            },
            {
              text: "Returns undefined",
              correct: true,
            },
            {
              text: "Prints only one property",
              correct: false,
            },
            {
              text: "Prints the address of elements",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
];

for (let i = 0; i < res.length; i++){
  console.log(res[i][0].questions)
}