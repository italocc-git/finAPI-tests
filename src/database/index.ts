import { createConnection, getConnectionOptions , Connection} from 'typeorm';



export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
      Object.assign(defaultOptions, {
          /* host : process.env.NODE_ENV === 'test' ? 'localhost' : host, */
          database:
              process.env.NODE_ENV === 'test'
                  ? 'fin_api_tests'
                  : defaultOptions.database,
      }),
  );
};

