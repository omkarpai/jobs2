import Controller from '@ember/controller';
import {action} from '@ember/object'

export default class IndexController extends Controller{
    
        @action postToDb (){
            let newRecord = this.store.createRecord('index',{
                startOn: '09-01-2000',
            });
            newRecord.save();
        }
    
}

