import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import moment from 'moment';

export default class IndexController extends Controller{
    @tracked dateArray=[];
    @tracked month= null;
    @tracked year= null;
    @tracked modelContent;

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
        this.modelContent = this.get('model.content');
        this.dateArray=[];
        for (let i=0; i< this.modelContent.length ; i++)
        {
            // this.store.findRecord('index',this.modelContent[i]._id).then(
            //     (value)=>{
            //         this.dateArray[i]= {startOn: value.get('startOn'),
            //                             jobTitle: value.get('jobTitle'), 
            //                             id:this.modelContent[i]._id
            //                             };
            //     }
            // )
            let req = this.store.peekRecord('index',this.modelContent[i]._id);
            this.dateArray[i]= {startOn: req.get('startOn'),
                                jobTitle: req.get('jobTitle'),
                                id:this.modelContent[i]._id
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

    @action deleteFromDb (id){
    //    this.store.findRecord('index',id).then(
    //             (value)=>{
    //                 this.store.deleteRecord(value);
    //                 value.save().then(
    //                     ()=>{
    //                         this.send('generateDate');
    //                     }
    //                 )
    //             }
    //         )
        let req = this.store.peekRecord('index',id);
        this.store.deleteRecord(req);
        req.save().then(
            ()=>{
                this.send('generateDate');
            }
        )
        
    }

    @action moveJob(id,direction,startOn){
        let req = this.store.peekRecord('index',id);
        let thisMoment = moment(startOn,"D-MMM-YYYY");
        if (direction === "1")
        {
            thisMoment.add(1,'day');
        }
        else
        {
            thisMoment.subtract(1,'day');
        }
        req.startOn = thisMoment.format('D-MMM-YYYY');
        req.save().then(
            ()=>{
                this.send('generateDate');
            }
        )
    }
}

