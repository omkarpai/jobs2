import Route from '@ember/routing/route';

export default class IndexRoute extends Route{
    async model(){
        return {
            jobRecordArray: this.store.findAll('job'),
            skipRecordArray: this.store.findAll('skip')
        }
    }
 
}

