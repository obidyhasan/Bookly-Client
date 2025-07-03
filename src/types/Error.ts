export interface ErrorResponse {
  status: number;
  data: {
    error: {
      name: string;
    };
    message: string;
    success: boolean;
  };
}
