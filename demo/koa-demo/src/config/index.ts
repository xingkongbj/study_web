import * as localConfig from './config.local';

interface AppConfig {
    [key: string]: any;
}

export default ((): AppConfig => {
    const { NODE_ENV } = process.env;

    let config = {};

    switch (NODE_ENV) {
        case 'local':
            config = localConfig;
            break;
        default:
            break;
    }

    return config;
})();
