import Vue from 'vue'
import BookReview from '@/components/BookReview'
import { mount } from '@vue/test-utils'

describe('BookReview.vue', () => {
  function getHandle() {
    return (new (Vue.extend(BookReview))().$mount())
  }

  it('should throw error when any field does not have value', () => {
    const wrapper = mount(BookReview)
    wrapper.vm.onSubmit()
    expect(wrapper.vm.errorState).to.equal(true)
  })

  it('should throw error when any field does not have value', () => {
    const wrapper = mount(BookReview, {
      data() {
        return {
          name: 'User 1',
          rate: 3
        };
      }
    })
    wrapper.vm.onSubmit()
    expect(wrapper.vm.errorState).to.equal(false)
  })
})