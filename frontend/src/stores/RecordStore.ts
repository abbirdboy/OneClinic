import { observable, makeObservable, runInAction } from "mobx";
import UserStore from "./UserStore";

export type Survey = {
  question: string;
  answer: string;
};

export type Resource = {
  title: string;
  url: string;
  description: string;
  thumbnail: string;
};

export const realSurveyResults = [
  {
    question: "Income and social status",
    answer:
      "The patient's income and social status are not explicitly mentioned, so it's unclear if these factors are a concern.",
  },
  {
    question: "Education level and literacy",
    answer:
      "The patient is a high school graduate, which suggests a reasonable level of education and literacy.",
  },
  {
    question: "Employment and working conditions",
    answer:
      "The patient works as an electrician with daily physical exertion that requires climbing ladders and lifting heavy objects. The patient is concerned about missing additional work due to his illness.",
  },
  {
    question: "Housing and neighborhood conditions",
    answer:
      "The patient feels safe and well-cared for in his home, but no information is given about the housing and neighborhood conditions.",
  },
  {
    question: "Access to clean water and air",
    answer:
      "No information is given about the patient's access to clean water and air.",
  },
  {
    question: "Access to healthy food options",
    answer:
      "The patient reports a well-rounded non-vegetarian diet of mostly home-cooked meals of meat and vegetables, suggesting access to healthy food options.",
  },
  {
    question: "Physical environment, such as pollution levels and green spaces",
    answer: "No information is given about the patient's physical environment.",
  },
  {
    question: "Social support networks and community resources",
    answer:
      "No information is given about the patient's social support networks and community resources.",
  },
  {
    question:
      "Discrimination and social exclusion based on race, gender, ethnicity, or other factors",
    answer:
      "No information is given about the patient's experiences with discrimination or social exclusion.",
  },
  {
    question: "Access to healthcare services and quality of care",
    answer:
      "No information is given about the patient's access to healthcare services or the quality of care received.",
  },
  {
    question:
      "Lifestyle choices, such as smoking, alcohol consumption, and physical activity levels",
    answer:
      "The patient denies any history of smoking and has ceased alcohol intake since the onset of symptoms 4 months ago. The patient reports daily physical exertion at work but denies any other exercise.",
  },
  {
    question: "Early childhood development and education",
    answer:
      "No information is given about the patient's early childhood development or education.",
  },
  {
    question: "Transportation options and access to public transportation",
    answer:
      "No information is given about the patient's transportation options or access to public transportation.",
  },
  {
    question: "Safety and violence in the community",
    answer:
      "No information is given about the safety and violence in the patient's community.",
  },
  {
    question: "Health insurance coverage and access to preventive care",
    answer:
      "No information is given about the patient's health insurance coverage or access to preventive care.",
  },
];

export const realResults = [
  {
    title: "Electricians Facebook Group",
    url: "https://www.facebook.com/groups/383276220024471",
    description:
      "group is a place to exchange, learn and share interesting stories about electrician work, wish everyone will have great relaxing moments when joining the group",
    thumbnail:
      "https://t3.ftcdn.net/jpg/02/25/35/42/360_F_225354243_OsKPimqbPJaGEzZ0Mya4qszmAC87p584.jpg",
  },
  {
    title: "Florida Agency for Health Care Administration",
    url: "https://ahca.myflorida.com/",
    description:
      "The Division of Health Care Policy and Oversight protects Floridians through oversight of health care providers. The Division is funded with more than $49 million in state and federal funds. Health Care Policy and Oversight licenses and/or certifies and regulates 40 different types of health care providers, including hospitals, nursing homes, assisted living facilities, and home health agencies.",
    thumbnail:
      "https://i.ibb.co/GnPRj33/Florida-Agency-for-Healthcare-administration.jpg",
  },
  {
    title: "Florida Division of Workers' Compensation",
    url: "https://www.myfloridacfo.com/division/wc",
    description:
      "Our goal is to ensure that anyone interested or involved in the Florida workers' compensation system has the tools and resources they need to participate. We assist injured workers, employers, health care providers, and insurers in following the Florida workers’ compensation rules and laws.",
    thumbnail:
      "https://i.ibb.co/TBvFXmM/My-Florida-CFO-Workers-Compensation.jpg",
  },
];

class RecordStore {
  @observable post: string | null = null;
  @observable surveyResults: Survey[] = [
    // {
    //   question: "What is the capital city of France?",
    //   answer: "Paris",
    // },
    // {
    //   question: "Who invented the telephone?",
    //   answer: "Alexander Graham Bell",
    // },
    // {
    //   question: "What is the largest continent in the world?",
    //   answer: "Asia",
    // },
    // {
    //   question: "What is the highest mountain in the world?",
    //   answer: "Mount Everest",
    // },
  ];

  @observable resourceResults: Resource[] = [];

  formatSurveyResponse = (surveyResponseText: string) => {
    let sample = surveyResponseText;
    sample = sample.replace(/\n/g, "");
    sample = sample.replace(/\t/g, "");
    sample = sample.replace(/\\/g, "");
    console.log("tried sample: ", sample);
    if (sample[0] !== "[") sample = "[" + sample + "]";
    if (sample[sample.length - 1] !== "]") sample = sample + "]";
    try {
      const sampledResults = JSON.parse(sample);
      if (sampledResults?.length > 0) this.surveyResults = sampledResults;
      else this.surveyResults = realSurveyResults;
    } catch (e) {
      this.surveyResults = realSurveyResults;
    }
    return sample;
  };

  formatRecomendationsResponse = (surveyResponseText: string) => {
    let sample = surveyResponseText;
    sample = sample.replace(/"resources":/g, "");
    sample = sample.replace(/\n/g, "");
    sample = sample.replace(/\t/g, "");
    sample = sample.replace(/\\/g, "");
    if (sample[0] !== "[") sample = "[" + sample + "]";
    if (sample[sample.length - 1] !== "]") sample = sample + "]";
    console.log("tried recomendations: ", sample);
    try {
      const sampledResults = JSON.parse(sample);
      if (sampledResults?.length > 1) this.resourceResults = sampledResults;
      else this.resourceResults = realResults;
    } catch (e) {
      this.resourceResults = realResults;
    }

    return sample;
  };

  setDemoSurveyResults = () => {
    this.surveyResults = realSurveyResults;
  };

  constructor() {
    makeObservable(this);
  }

  sendRecording = async (audioUrl: string) => {
    const baseUrl = "https://a00a-32-140-48-206.ngrok.io/api/v1/whisper";

    const data = {
      patientId: UserStore.userId,
      audioUrl: audioUrl,
    };

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("response: ", response);

    const json = response.json();
    console.log("response json: ", json);
    return json;
  };

  sendSurvey = async (surveyResponseStr: string) => {
    const baseUrl = "https://a00a-32-140-48-206.ngrok.io/api/v1/recommend";

    const data = {
      patientId: UserStore.userId,
      surveyResponse: surveyResponseStr,
    };

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("response: ", response);

    const json = response.json();
    return json;
  };
}

export default new RecordStore();
