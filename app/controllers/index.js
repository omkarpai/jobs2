import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class IndexController extends Controller{
    @tracked dateArray=[];
    @tracked month= null;
    @tracked year= null;

    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    years = ['2021','2020','2019'];

    @action postToDb (startDate,jobTitle){
        
        let newRecord = this.store.createRecord('index',{
            startOn: startDate,
            jobTitle: jobTitle
        });
        
        newRecord.save().then(
            ()=>{
                this.send('generateDate');
            }
        )
    }

    @action generateDate (){
        let modelContent = this.get('model.content');
        console.log(modelContent);
        for (let i=0; i< modelContent.length ; i++)
        {
            // this.store.findRecord('index',modelContent[i]._id).then(
            //     (value)=>{
            //         this.dateArray[i]= {startOn:value.get('startOn'),
            //                             id:modelContent[i]._id
            //                             };
            //     }
            // )
            let req = this.store.peekRecord('index',modelContent[i]._id);
            this.dateArray[i]= {startOn: req.get('startOn'),
                                id:modelContent[i]._id
            }
        }
        this.send('setDateArray',this.dateArray);
    }

    @action setMonth(selectedValue){
        this.month = selectedValue.originalTarget.value;
        this.send('generateDate');
      }
  
    @action setYear(selectedValue){
        this.year = selectedValue.originalTarget.value;
        this.send('generateDate');
    }

    @action setDateArray(dateArray){
        this.dateArray = dateArray;
    }
}

