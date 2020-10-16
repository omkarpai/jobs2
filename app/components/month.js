import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

import moment from 'moment';

export default class MonthComponent extends Component{
@tracked nomDays = null;
@tracked month=null;
@tracked year=null;
@tracked days = [];

didReceiveAttrs(){
    this.month= this.get('month');
    this.year= this.get('year');
    this.days = [];

    if (this.month && this.year !== null)
        {
        let newMoment = moment();
        newMoment.month(this.month);
        newMoment.year(this.year);
        this.nomDays = newMoment.daysInMonth();

        console.log(this.nomDays);
        for(let i=1 ; i<=this.nomDays; i++)
        {
            this.days[i-1] = i;
        }
    }
}

@action showDays(){
    console.log(this.nomDays);
    console.log(this.days);
}

}
    


