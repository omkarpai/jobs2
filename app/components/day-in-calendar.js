import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';



export default class MonthComponent extends Component {
    @tracked isSkipped;

    didReceiveAttrs() {
        if (this.get('skipped') === "True") {
            this.isSkipped = true;
        }
        else {
            this.isSkipped = false;
        }
    }


    get dayOfTheWeek() {
        let thisMoment = moment(this.get('fullDate'), 'D-MMM-YYYY');
        return thisMoment.format('dddd');
    }


}



