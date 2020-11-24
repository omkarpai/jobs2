import Model, { attr } from '@ember-data/model'

export default class SkippedModel extends Model {
	@attr('string') skippedDate
}
