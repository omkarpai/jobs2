import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class DropDownComponent extends Component{
    @tracked month= null;
    @tracked year= null;
    months = ['January','February','March','April','May','June','July','August','September','OCtober','November','December'];
    years = ['2021','2020','2019'];

    @action setMonth(selectedValue){
      this.month = selectedValue.originalTarget.value;
      
    }

    @action setYear(selectedValue){
      this.year = selectedValue.originalTarget.value;
      
    }

  }

