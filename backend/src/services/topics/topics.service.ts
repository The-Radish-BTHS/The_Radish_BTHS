// Initializes the `topics` service on path `/topics`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Topics } from './topics.class';
import createModel from '../../models/topics.model';
import hooks from './topics.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'topics': Topics & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/topics', new Topics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('topics');

  service.hooks(hooks);
}
