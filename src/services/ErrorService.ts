import { store } from "@/store";

export const ErrorService = (error: ErrorRequest): void => {
  console.log(error.response.data);
  store.commit("PUSH_TOAST", {
    type: "danger",
    message: error.response.data.message,
  });
};

type ErrorRequest = {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: string;
    };
  };
};
