import Model,{ attr } from '@ember-data/model';

// export default class PostModel extends Model {
//     username: attr('string'),
// }

export default Model.extend({
    startOn: attr('string'),
  });