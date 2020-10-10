import Controller from '@ember/controller';

export default   Controller.extend({
    actions: {
        postToDb (){
            let newRecord = this.store.createRecord('index',{
                startOn: '09-01-2000',
            });
            newRecord.save();
        }
    }
});

