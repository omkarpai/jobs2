import Controller from '@ember/controller';

export default   Controller.extend({
    actions: {
        postToDb (){
            let newRecord = this.store.createRecord('index',{
                title: 'EmberFire is flaming hot!',
                body: 'You can store and sync data in realtime without a backend.'
            });
            newRecord.save();
        }
    }
});

