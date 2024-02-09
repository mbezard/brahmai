export type UserStory = {
  title: string;
  acceptanceCriteria: Array<string>;
  associatedMockups?: Array<string>;
};

export const isUserStory = (obj: unknown): obj is UserStory => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "title" in obj &&
    "acceptanceCriteria" in obj
  );
};
