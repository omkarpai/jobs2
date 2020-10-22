import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import moment from 'moment';

export default class IndexController extends Controller{
    @tracked dateArray=[];
    @tracked month= null;
    @tracked year= null;
    @tracked skippedArray=[];

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

    @action postNewSkip (day,month,year){
        
        let skippedDate = day + "-" + month + "-" + year;
        let skipFound = false;
       
        for(let i=0 ; i<this.skippedArray.length ; i++)
        {  
            if (skippedDate === this.skippedArray[i].skippedDate)
            {
                skipFound = true;
                let req = this.store.peekRecord('skipped',this.skippedArray[i].id);
                this.store.deleteRecord(req);
                req.save().then(
                    ()=>{
                        this.send('generateDate');
                        }
                )
                
            }
        }

        if (skipFound === false)
        {
            let newRecord = this.store.createRecord('skipped',{
                skippedDate: skippedDate
            });
            
            newRecord.save().then(
                ()=>{
                    this.send('generateDate');
                }
            )
        }
    }

    @action generateDate (){
        let modelContent = this.get('model.job.content.content');
        this.dateArray=[];
        for (let i=0; i< modelContent.length ; i++)
        {
            // this.store.findRecord('index',this.modelContent[i]._id).then(
            //     (value)=>{
            //         this.dateArray[i]= {startOn: value.get('startOn'),
            //                             jobTitle: value.get('jobTitle'), 
            //                             id:this.modelContent[i]._id
            //                             };
            //     }
            // )
            let req = this.store.peekRecord('index',modelContent[i]._id);
            this.dateArray[i]= {startOn: req.get('startOn'),
                                jobTitle: req.get('jobTitle'),
                                id:modelContent[i]._id
            }
        }
        this.send('setDateArray',this.dateArray);

        modelContent = this.get('model.skipped.content.content');
        this.skippedArray=[];
        for (let i=0; i< modelContent.length ; i++)
        {
            let req = this.store.peekRecord('skipped',modelContent[i]._id);
            this.skippedArray[i]= {skippedDate: req.get('skippedDate'),
                                   id:modelContent[i]._id
            }
        }
        this.send('setSkippedArray',this.skippedArray);
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

    @action setSkippedArray(skippedArray){
        this.skippedArray = skippedArray;  
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
        let matchFound = true;

        if (direction === "1")
        {   
            while (matchFound === true){
                thisMoment = thisMoment.add(1,'day');
                for (let i=0 ; i<this.skippedArray.length ; i++){
                    
                    if (thisMoment.format('D-MMM-YYYY') === this.skippedArray[i].skippedDate){
                        matchFound = true;
                        break;
                    }
                    else
                        matchFound = false;
                }
            } 
        }
        else
        {
            while (matchFound === true){
                thisMoment = thisMoment.subtract(1,'day');
                for (let i=0 ; i<this.skippedArray.length ; i++){
    
                    if (thisMoment.format('D-MMM-YYYY') === this.skippedArray[i].skippedDate){
                        matchFound = true;
                        break;
                    }
                    else
                        matchFound = false;
                }
            } 
        }

        req.startOn = thisMoment.format('D-MMM-YYYY');
        req.save().then(
            ()=>{
                this.send('generateDate');
            }
        )
    }
}

