import Component from '@ember/component';

export default Component.extend({
    selectedOption: null,
    actions: {
    setSelection: function(selected) {
      this.set('selectedOption', selected)
      console.log(this.get('selectedOption'))
      this.send('wasChanged')
    },
  }
});

