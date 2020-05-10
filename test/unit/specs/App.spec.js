import Vue from 'vue'
import App from '@/App'
import { mount } from '@vue/test-utils'

describe('App.vue', () => {
  it('should open the modal window when openNewBookModal method is called', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.showNewBookModal).to.equal(false)
    wrapper.vm.openNewBookModal()
    expect(wrapper.vm.showNewBookModal).to.equal(true)
  })

  it('should close the modal window when closeNewBookModal method is called', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.showNewBookModal).to.equal(false)
    wrapper.vm.openNewBookModal()
    expect(wrapper.vm.showNewBookModal).to.equal(true)
    wrapper.vm.closeNewBookModal()
    expect(wrapper.vm.showNewBookModal).to.equal(false)
  })

  it('should add a book when the new book is found unique by name and overview', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.currentBooks.length).to.equal(1)
    let paramData = {
      name: 'Book 1',
      overview: 'A overview'
    }
    wrapper.vm.addNewBook(paramData)
    expect(wrapper.vm.currentBooks.length).to.equal(2)
  })

  it('should not add a book when the new book is same as another book by name and overview', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.currentBooks.length).to.equal(1)
    let paramData = {
      name: 'Harry Potter'
    }
    wrapper.vm.addNewBook(paramData)
    expect(wrapper.vm.currentBooks.length).to.equal(1)
  })
})
