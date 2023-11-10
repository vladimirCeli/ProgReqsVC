export default class AssessmentCalculator {
    constructor(answerValues, modelConfig) {
        this.answerValues = answerValues;
        this.sammModel = modelConfig;
        this.overallScore = null;
        this.responseCount = {
            "No": 0,
            "Yes, for some": 0,
            "Yes, for most": 0,
            "Yes, for all": 0
        };
        this.businessFunctionNames = Object.keys(modelConfig);
        this.practiceNames = [];
        this.businessFunctionScores = [];
        this.practiceScores = [];
    }

    getAnswerMap(start, numQuestions) {
        const answerMap = new Map();
        for (let i = start; i < start + numQuestions; i++) {
            const key = 'question' + i;
            answerMap.set(key, this.answerValues[key]);
        }
        return answerMap;
    }

    isPracticeCompleted(values) {
        return !values.some(el => el === null);
    }

    sortResponseCount(values) {
        for (let i = 0; i < values.length; i++) {
            if (values[i] === 0) {
                this.responseCount["No"]++;
            } else if (values[i] === 0.25) {
                this.responseCount["Yes, for some"]++;
            } else if (values[i] === 0.5) {
                this.responseCount["Yes, for most"]++;
            } else if (values[i] === 1) {
                this.responseCount["Yes, for all"]++;
            }
        }
    }

    computeResults() {
        for (const bussFunc in this.sammModel) {
            for (const practice in this.sammModel[bussFunc]["practices"]) {
                this.practiceNames.push(practice);
                var practiceConfig = this.sammModel[bussFunc]["practices"][practice];
                var answers = this.getAnswerMap(practiceConfig.start, practiceConfig.numQuestions);
                var question_values = Array.from(answers.values());

                if (this.isPracticeCompleted(question_values)) {
                    this.sortResponseCount(question_values);
                    var lvl1 = (question_values[0] + question_values[3]) / 2;
                    var lvl2 = (question_values[1] + question_values[4]) / 2;
                    var lvl3 = (question_values[2] + question_values[5]) / 2;
                    var score = lvl1 + lvl2 + lvl3;
                    this.sammModel[bussFunc]["practices"][practice]["score"] = score;
                    this.sammModel[bussFunc]["totalScore"] += score / 3;
                    this.practiceScores.push(score);
                } else {
                    this.practiceScores.push(0);
                }
            }
            this.businessFunctionScores.push(this.sammModel[bussFunc]["totalScore"]);
            this.overallScore += this.sammModel[bussFunc]["totalScore"] / Object.keys(this.sammModel).length;
        }
    }
}
