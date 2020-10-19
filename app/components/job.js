import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';



export default class JobComponent extends Component {
    day = null;
    month = null;
    year = null;
    dateArray= null;
    dateString=null;
    @tracked jobsForThisDay=[];

    didReceiveAttrs(){
        this.jobsForThisDay=[];
        this.day = this.get('day');
        this.month = this.get('month');
        this.year = this.get('year');
        this.dateArray = this.get('dateArray');

        this.dateString = this.day + "-" + this.month + "-" +this.year;
        
        let j=0;
        for(let i=0 ; i<this.dateArray.length ; i++)
        {  
            if (this.dateString === this.dateArray[i].startOn)
            {
                this.jobsForThisDay[j]= this.dateArray[i].startOn;
                j++;
            }
        } 
        
    }



}
