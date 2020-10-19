import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class IndexController extends Controller{
    dateArray =[];
    @tracked month= null;
    @tracked year= null;
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    years = ['2021','2020','2019'];

    @action postToDb (){
        let newRecord = this.store.createRecord('index',{
            startOn: '2-Jan-2020',
        });
        newRecord.save();
    }

    @action generateDate (){
        let modelContent = this.get('model.content');
        for (let i=0; i< modelContent.length ; i++)
        {
            this.store.findRecord('index',modelContent[i]._id).then(
                (value)=>{
                    this.dateArray[i]= {startOn:value.get('startOn'),
                                        id:modelContent[i]._id
                                        };
                }
            )
        }
        
    }

    @action setMonth(selectedValue){
        this.month = selectedValue.originalTarget.value;
        this.send('generateDate');
      }
  
    @action setYear(selectedValue){
        this.year = selectedValue.originalTarget.value;
        this.send('generateDate');
    }

    @action actionReciever(argument){
        console.log(argument);
    }
}

