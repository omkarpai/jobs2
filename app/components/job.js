import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class JobComponent extends Component {
    @tracked day = null;
    @tracked month = null;
    @tracked year = null;

    didReceiveAttrs(){
        this.day = this.get('day');
        this.month = this.get('month');
        this.year = this.get('year');
    }

    @action postToDb (){
        console.log("button in",this.day,this.month,this.year,"was clicked");
    }

}
