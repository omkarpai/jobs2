import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';


export default class IndexController extends Controller {

    @tracked month = null;
    @tracked year = null;
    @tracked moveByN = null;



    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; //List of months for dropdown
    years = ['2024', '2023', '2022', '2021', '2020', '2019'];    //List of years for dropdown

    @action postToDb(startDate, jobTitle) {

        let newRecord = this.store.createRecord('index', {
            startOn: startDate,
            jobTitle: jobTitle
        });
        newRecord.save();
    }

    @action postNewSkip(fullDate, skippedRecord) {
        //Action to find if given day is already skipped. 
        //If already skipped delete the record to unskip it. Otherwise create a new skip record

        if (skippedRecord === "null") {
            let newRecord = this.store.createRecord('skipped', {
                skippedDate: fullDate
            });

            newRecord.save();
        }
        else {
            this.store.deleteRecord(skippedRecord);
            skippedRecord.save();
        }
    }


    @action setMonth(selectedValue) {
        this.month = selectedValue.target.value;

    }

    @action setYear(selectedValue) {
        this.year = selectedValue.target.value;

    }

    get numberOfDays() {
        let newMoment = moment();
        let days = [];

        if (this.month | this.year === null) {
            return;
        }

        newMoment = newMoment.month(this.month);
        newMoment = newMoment.year(this.year);

        //Calculate number of days in the month for the given month and year
        let numberOfDays = newMoment.daysInMonth();
        for (let i = 1; i <= numberOfDays; i++) {
            //Create an array of days with property of each day.
            days[i - 1] = {
                dayOfMonth: i,
                fullDate: i + "-" + this.month + "-" + this.year
            }
        }



        return days;
    }

    @action deleteFromDb(jobRecord) {
        jobRecord.deleteRecord();
        jobRecord.save()

    }

    @action moveJob(jobRecord, direction, n) {
        let thisMoment = moment(jobRecord.startOn, "D-MMM-YYYY");
        let matchFound = true;
        let skippedArray = this.store.peekAll('skipped');
        //Direction 1 for right move , Direction 0 for left move , depending on click in <Job> component.

        if (skippedArray._length === 0) {
            if (direction === "1") {
                thisMoment = thisMoment.add(n, 'day');
            }
            else {
                thisMoment = thisMoment.subtract(n, 'day');
            }

        }
        else {
            //Check if day after being moved lands on a skipped day
            //If yes, keep adding or subtracting till job doesnt land on a skipped day.
            if (direction === "1") {
                thisMoment = thisMoment.add(n, 'day');
            }
            else {
                thisMoment = thisMoment.subtract(n, 'day');
            }
            while (matchFound === true) {

                //Iterating over array of skipped dates to find any match.
                //You want to keep iterating over skipped array till no match is found.

                skippedArray.every(
                    (element) => {
                        if (thisMoment.format('D-MMM-YYYY') === element.skippedDate) {
                            matchFound = true;
                            if (direction === "1") {
                                thisMoment = thisMoment.add(n, 'day');
                            }
                            else {
                                thisMoment = thisMoment.subtract(n, 'day');
                            }
                            return false;
                        }
                        else
                            matchFound = false;
                    }
                )
            }
        }

        //To update property for any record just assign that record a new value
        jobRecord.startOn = thisMoment.format('D-MMM-YYYY');

        jobRecord.save();
    }

    get numberOfJobs() {
        return this.store.peekAll('index')._length;
    }


    @action moveBulk() {
        this.jobTracker.forEach((record) => {
            this.send('moveJob', record, "1", this.moveByN);
        })
    }

    @action skipAllWeekends(changeEvent) {
        let skippedArray = this.store.peekAll('skipped');
        let thisMoment = moment().year(this.year);
        thisMoment = thisMoment.month(this.month);
        thisMoment = thisMoment.date(1);

        while (thisMoment.day() !== 0) {
            thisMoment = thisMoment.add(1, 'day');
        }

        let firstSunday = thisMoment;
        let arrayOfSundays = [thisMoment.format('D-MMM-YYYY')];

        for (let i = 0; i < 25; i++) {
            let MomentOfSundays = moment(arrayOfSundays[i], "D-MMM-YYYY");
            MomentOfSundays = MomentOfSundays.add(7, 'day');
            arrayOfSundays[i + 1] = MomentOfSundays.format('D-MMM-YYYY');
        }

        console.log("Array of sundays:", arrayOfSundays);

        let firstSaturday = firstSunday.subtract(1, 'day');
        let arrayOfSaturdays = [firstSaturday.format('D-MMM-YYYY')]

        for (let i = 0; i < 25; i++) {
            let MomentOfSaturdays = moment(arrayOfSaturdays[i], "D-MMM-YYYY");
            MomentOfSaturdays = MomentOfSaturdays.add(7, 'day');
            arrayOfSaturdays[i + 1] = MomentOfSaturdays.format('D-MMM-YYYY');
        }

        console.log("Array of saturdays:", arrayOfSaturdays);

        let arrayOfWeekend = arrayOfSundays.concat(arrayOfSaturdays);
        console.log(arrayOfWeekend);
        console.log(changeEvent.target.checked);

        arrayOfWeekend.forEach(
            (date) => {
                let matchFound = false;
                skippedArray.forEach(
                    (element) => {

                        if (element.skippedDate === date) {
                            matchFound = true;
                            if (changeEvent.target.checked === false) {
                                this.store.deleteRecord(element);
                                element.save();
                            }
                        }

                    }
                )
                if (matchFound === false) {
                    this.send('postNewSkip', date, "null");
                }
            }
        )

    }
}

