type PageData = {
  email: string;
};

type ActionData = {
  success: string;
  email?: string;
  missing?: boolean;
  incorrect?: boolean;
};

export type { PageData, ActionData };
