import Application from './lib/application';

// controllers
import Home from './controller/home';
import Project from './controller/project';

export default (app: Application) => {
    const { router } = app;

    const home = new Home();
    const project = new Project();

    router.get('/', home.hello);

    router.get('/api/v1/get', project.get);

    router.post('/api/v1/post', project.post);

    router.all('/api/v1/all', project.all);
};
