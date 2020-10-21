import Model,{ attr } from '@ember-data/model';


export default class IndexModel extends Model {
  @attr('string') startOn;
  @attr('string') jobTitle;
}
    
  