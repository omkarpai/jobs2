import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import moment from 'moment';



export default class JobComponent extends Component {
    @tracked day = null;
    @tracked month = null;
    @tracked year = null;
    @tracked dayOfTheWeek= null;
    @tracked dateArray = [];
    @tracked dateString=null;
    @tracked jobsForThisDay = [];

    didReceiveAttrs(){
        //Get properties passed in
        this.jobsForThisDay=[];
        this.day = this.get('day');
        this.month = this.get('month');
        this.year = this.get('year');
        this.dateArray = this.get('dateArray');
        this.dateString = this.day + "-" + this.month + "-" +this.year;

        let thisMoment = moment(this.dateString,'D-MMM-YYYY');
        this.dayOfTheWeek = thisMoment.format('dddd');
        
        //Loop to iterate over entire array of job dates to find which jobs belong to this day.
        let j=0;
        this.dateArray.forEach(
            (element)=>{
                if (this.dateString === element.startOn)
                {
                    this.jobsForThisDay[j]= {
                        startOn:    element.startOn,
                        jobTitle:   element.jobTitle,
                        jobRecord:  element
                    }
                    j++;
                }
            }
        )
                
        
    }

}
