import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import moment from 'moment';



export default class JobComponent extends Component {
    @tracked day = null;
    @tracked month = null;
    @tracked year = null;
    @tracked dayOfTheWeek= null;
    @tracked dateArray;
    @tracked dateString=null;
    @tracked jobsForThisDay;

    didReceiveAttrs(){
        this.jobsForThisDay=[];
        this.day = this.get('day');
        this.month = this.get('month');
        this.year = this.get('year');
        this.dateArray = this.get('dateArray');
        this.dateString = this.day + "-" + this.month + "-" +this.year;

        let thisMoment = moment(this.dateString,'D-MMM-YYYY');
        this.dayOfTheWeek = thisMoment.format('dddd');
        
        let j=0;
        for(let i=0 ; i<this.dateArray.length ; i++)
        {  
            if (this.dateString === this.dateArray[i].startOn)
            {
                this.jobsForThisDay[j]= {
                    startOn:    this.dateArray[i].startOn,
                    jobTitle:   this.dateArray[i].jobTitle,
                    id:         this.dateArray[i].id
                }
                j++;
            }
        } 
        
    }

    @action testing(){
        console.log("second click was registered");
    }



}
