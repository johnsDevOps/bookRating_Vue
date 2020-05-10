import Vue from 'vue'
import Book from '@/components/Book'
import { mount } from '@vue/test-utils'

describe('Book.vue', () => {
  function getHandle() {
    return (new (Vue.extend(Book))().$mount())
  }

  it('should render correct name', () => {
    const vm = getHandle()
    expect(vm.$el.querySelector('.book div.book-title').textContent)
      .to.equal('Harry Potter')
  })

  it('should render all volumes', () => {
    const vm = getHandle()
    expect(vm.$el.querySelectorAll('.book .volumes ul li').length)
      .to.equal(7)
  })

  it('should render average rating', () => {
    const vm = getHandle()
    expect(vm.$el.querySelector('.book .bottom-bar div').textContent)
      .to.equal('Rating: NA')
  })

  it('should display updated average rating when updated', () => {
    var wrapper = mount(Book)
    expect(wrapper.find('.book .bottom-bar div').text()).to.equal('Rating: NA')
    wrapper.setData({ avgRating: 4 })
    expect(wrapper.find('.book .bottom-bar div').text()).to.equal('Rating: 4/5')
  })

  it('should update the avgRating variable when updateAvgRating method is called', () => {
    var wrapper = mount(Book)
    expect(wrapper.vm.avgRating).to.equal('NA')
    wrapper.vm.updateAvgRating(4)
    expect(wrapper.vm.avgRating).to.equal(4)
  })

  it('should return proper string when getAvgRating method is called', () => {
    var wrapper = mount(Book)
    expect(wrapper.vm.getAvgRating).to.equal('NA')
    wrapper.setData({ avgRating: 4 })
    expect(wrapper.vm.getAvgRating).to.equal('4/5')
  })
})
