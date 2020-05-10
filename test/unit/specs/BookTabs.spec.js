import Vue from 'vue'
import BookTabs from '@/components/BookTabs'
import Book from '@/components/Book'
import { mount } from '@vue/test-utils'

describe('BookTabs.vue', () => {
  function getHandle() {
    return (new (Vue.extend(BookTabs))().$mount())
  }

  it('should show Hide Ratings after Show Ratings is clicked', () => {
    const vm = getHandle()
    const anchorTag = vm.$el.querySelector('.book-tabs .show-hide a');
    const clickEvent = new window.Event('click');
    anchorTag.dispatchEvent(clickEvent);
    vm._watcher.run();
    expect(vm.$el.querySelector('.book-tabs .show-hide a').textContent)
      .to.equal('Hide Ratings');
  })

  it('should show Show Ratings after Hide Ratings is clicked', () => {
    const vm = getHandle()
    const showRatingsATag = vm.$el.querySelector('.book-tabs .show-hide a');
    const clickEvent = new window.Event('click');
    showRatingsATag.dispatchEvent(clickEvent);
    vm._watcher.run();
    const hideRatingsATag = vm.$el.querySelector('.book-tabs .show-hide a');
    hideRatingsATag.dispatchEvent(clickEvent);
    vm._watcher.run();
    expect(vm.$el.querySelector('.book-tabs .show-hide a').textContent)
      .to.equal('Show Ratings');
  })

  it('should compute the average rating when getRating method is called', () => {
    let paramData = {
      name: 'User 1',
      rate: 4
    }
    let expected = [{
      name: 'User 2',
      rate: 2
    }, {
      name: 'User 1',
      rate: 4
    }]

    const wrapper = mount(BookTabs, {
      data() {
        return {
          ratings: [{
            name: 'User 2',
            rate: 2
          }]
        }
      }
    })

    wrapper.vm.getRating(paramData)
    expect(wrapper.vm.ratings.length).to.equal(expected.length)
    expect(wrapper.vm.ratings[0].name).to.equal(expected[0].name)
    expect(wrapper.vm.ratings[0].rate).to.equal(expected[0].rate)
    expect(wrapper.vm.ratings[1].name).to.equal(expected[1].name)
    expect(wrapper.vm.ratings[1].rate).to.equal(expected[1].rate)
  })
})
