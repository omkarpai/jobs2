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
    console.log("recieved attrs")
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
            let skippedRecord = null;
            let dateString = i + "-" + this.month + "-" + this.year;

            //Iterate over skipped array and find if current day is skipped
            this.skippedArray.every(
                (element)=>{
                    if (dateString === element.skippedDate){
                        isSkipped = true;
                        skippedRecord = element;
                        return false;
                    }
                }
            )
            //Create an array of days with property of each day.
            this.days[i-1] = {
                dayOfMonth:i,
                isSkipped: isSkipped,
                fullDate: i + "-" + this.month + "-" +this.year,
                skippedRecord: skippedRecord
            }
        }
    }
}




}
    


