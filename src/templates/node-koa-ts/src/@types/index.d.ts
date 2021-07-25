declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    PWD: string;
    TYPEORM_HOST: string;
    TYPEORM_USER: string;
    TYPEORM_PASS: string;
    TYPEORM_DB: string;
    TYPEORM_TYPE: string;
  }
}
