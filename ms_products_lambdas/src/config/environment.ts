export interface EnvironmentConfig {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  lambda: {
    region: string;
    stage: string;
  };
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    database: {
      host: process.env.DB_HOST || 'www.davidortega.dev',
      port: Number.parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'davidort_aws_lambda',
      password: process.env.DB_PASSWORD || 'davidort_aws_lambda',
      database: process.env.DB_DATABASE || 'davidort_aws_lambda',
    },
    lambda: {
      region: process.env.AWS_REGION || 'us-east-1',
      stage: process.env.STAGE || 'dev',
    },
  };
};
