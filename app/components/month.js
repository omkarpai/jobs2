import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';



import moment from 'moment';

export default class MonthComponent extends Component{
@tracked nomDays = null;
@tracked month=null;
@tracked year=null;
@tracked days = [];
@tracked skippedArray = [];


didReceiveAttrs(){
    //Get properties passed in
    this.month= this.get('month');
    this.year= this.get('year');
    this.skippedArray = this.get('skippedArray');
    this.days = [];

    if (this.month && this.year !== null)
        {
        let newMoment = moment();
        newMoment.month(this.month);
        newMoment.year(this.year);
        //Calculate number of days in the month for the given month and year
        this.nomDays = newMoment.daysInMonth();

        for(let i=1 ; i<=this.nomDays; i++)
        {
            let isSkipped= false;
            let dateString = i + "-" + this.month + "-" + this.year;

            //Iterate over skipped array and find if current day is skipped
            for (let j=0 ; j<this.skippedArray.length ; j++){
                if (dateString === this.skippedArray[j].skippedDate){
                    isSkipped = true;
                    break;
                }
            }
            //Create an array of days with property of each day.
            this.days[i-1] = {
                dayOfMonth:i,
                isSkipped: isSkipped
            }
        }
    }
}




}
    


