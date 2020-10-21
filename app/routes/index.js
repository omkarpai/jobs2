import Route from '@ember/routing/route';

export default class IndexRoute extends Route{
    async model(){
        return {
            job: this.store.findAll('index'),
            skipped: this.store.findAll('skipped')
        }
    }
 
}

