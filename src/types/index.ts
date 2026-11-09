export type TrackType = 'fundamentals' | 'api-automation' | 'enterprise-patterns' | 'cicd-deployment';

export interface CodeSnippet {
  ts: string;
  js: string;
  description: string;
  caption?: string;
  fileName?: string;
}

export interface InterviewQnA {
  id: string;
  question: string;
  difficulty: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  category: 'core' | 'api' | 'debugging' | 'architecture' | 'cicd';
  scenario: string;
  seniorAnswer: string;
  interviewerIntent: string;
  pitfalls: string[];
  codeExample?: CodeSnippet;
}

export interface SubtopicItem {
  id: string;
  title: string;
  description?: string;
}

export interface LessonModule {
  id: string;
  number: string;
  track: string;
  trackLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  readTimeMinutes: number;
  tags: string[];
  subtopics: SubtopicItem[];
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string;
    conceptCallout?: {
      type: 'tip' | 'warning' | 'deep-dive';
      title: string;
      text: string;
    };
    codeSnippet?: CodeSnippet;
  }[];
  interviewQuestions: InterviewQnA[];
}

export type ActiveTab = 'curriculum' | 'labs' | 'api-workbench' | 'interview-hub' | 'deployment';
