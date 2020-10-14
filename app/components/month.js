import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

import moment from 'moment';

let newMoment = moment();

export default class MonthComponent extends Component{
@tracked nomDays = null;

didRender(){
    newMoment.month( this.get('month'));
    newMoment.year (this.get('year'));
    this.nomDays = newMoment.daysInMonth();
}

@action showDays(){
    console.log(this.nomDays);
}

}
    


