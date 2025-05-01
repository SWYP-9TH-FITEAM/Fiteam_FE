import {z} from 'zod';

type ValidateConfig<T extends z.ZodTypeAny> = {
  dto: unknown;
  schema: T;
  schemaName: string;
};

export const validateSchema = <T extends z.ZodTypeAny>({
  dto,
  schema,
  schemaName,
}: ValidateConfig<T>): z.infer<T> => {
  const {data, success, error} = schema.safeParse(dto);

  if (success) {
    return data;
  } else {
    captureError(`API Validation Error: ${schemaName}`, {
      dto,
      error: error.message,
      issues: error.issues,
    });

    throw error;
  }
};

const captureError = (message: string, extra = {}) => {
  if (import.meta.env.DEV) {
    console.error(message, extra);
  } else {
    // TODO: report to Sentry/something else
  }
};
