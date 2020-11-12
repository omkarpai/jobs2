import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import moment from 'moment';

export default class IndexController extends Controller{
    @tracked dateArray=[];
    @tracked month= null;
    @tracked year= null;
    @tracked skippedArray=[];
    @tracked numberOfJobs= null;

    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; //List of months for dropdown
    years = ['2024','2023','2022','2021','2020','2019'];    //List of years for dropdown

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
        //Action to find if given day is already skipped. 
        //If already skipped delete the record to unskip it. Otherwise create a new skip record
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
                break;
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
        //Model hook from index.js route returns an object {job , skipped} which contains info about jobs and Dates of every skip

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
        // this.send('setDateArray',this.dateArray);
        //I think for Ember to trigger re render , a tracked variable needs to be changed by an action.

        modelContent = this.get('model.skipped.content.content');
        this.skippedArray=[];
        for (let i=0; i< modelContent.length ; i++)
        {
            let req = this.store.peekRecord('skipped',modelContent[i]._id);
            this.skippedArray[i]= {skippedDate: req.get('skippedDate'),
                                   id:modelContent[i]._id
            }
        }
        // this.send('setSkippedArray',this.skippedArray);
        this.send('calcNumJobs');
    }

    @action setMonth(selectedValue){
        this.month = selectedValue.target.value;
        this.send('generateDate');
      }
  
    @action setYear(selectedValue){
        this.year = selectedValue.target.value;
        this.send('generateDate');
    }


    @action deleteFromDb (id){
    
    //ID to be deleted will be passed from click in <Job> component.
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

        //Direction 1 for right move , Direction 0 for left move , depending on click in <Job> component.
        if (direction === "1")
        {   
            if (this.skippedArray.length === 0)
            {
                thisMoment = thisMoment.add(1,'day');
            }
            else{
                //Check if day after being moved lands on a skipped day
                //If yes, keep adding or subtracting till job doesnt land on a skipped day.
                while (matchFound === true){
                    thisMoment = thisMoment.add(1,'day');
                    //Iterating over array of skipped dates to find any match.
                    //You want to keep iterating over skipped array till no match is found.
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
            
        }
        else
        {
            if (this.skippedArray.length === 0)
            {
                thisMoment = thisMoment.subtract(1,'day');
            }
            else{
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
        }
        //To update property for any record just assign that record a new value
        req.startOn = thisMoment.format('D-MMM-YYYY');
        req.save().then(
            ()=>{
                this.send('generateDate');
            }
        )
    }

    @action calcNumJobs(){
        this.store.findAll('index').then(
            (records)=>{
                this.numberOfJobs = records._length;
                console.log(this.numberOfJobs);
                
            }
        )
    }
}

