import Vue from 'vue'
import NewBook from '@/components/NewBook'
import { mount } from '@vue/test-utils'

describe('NewBook.vue', () => {
  function getHandle() {
    return (new (Vue.extend(NewBook))().$mount())
  }

  it('should render the heading as "Add a new book"', () => {
    const vm = getHandle()
    expect(vm.$el.querySelector('.main-modal .new-book-modal .modal-header .heading-text').textContent)
      .to.equal('Add a new book')
  })

  it('should throw error when any field does not have value', () => {
    const vm = getHandle()
    const submitButton = vm.$el.querySelector('.main-modal .new-book-modal form .modal-footer div .new-book-submit')
    const clickEvent = new window.Event('click');
    submitButton.dispatchEvent(clickEvent);
    vm._watcher.run();
    expect(vm.$el.querySelectorAll('.main-modal .new-book-modal form .modal-body .error-section ul li').length)
      .to.equal(3);
  })

  it('should add a volume when addVolumeField method is called', () => {
    const wrapper = mount(NewBook)
    expect(wrapper.vm.volumes.length).to.equal(1)
    expect(wrapper.vm.volumes[0].name).to.equal('')
    wrapper.vm.addVolumeField()
    expect(wrapper.vm.volumes.length).to.equal(2)
    expect(wrapper.vm.volumes[1].name).to.equal('')
  })

  it('should remove a particular volume name when removeVolumeField method is called', () => {
    const wrapper = mount(NewBook, {
      data() {
        return {
          volumes: [{
            name: 'Volume 1'
          }, {
            name: 'Volume 2'
          }]
        }
      }
    })
    wrapper.vm.removeVolumeField(1)
    expect(wrapper.vm.volumes.length).to.equal(1)
    expect(wrapper.vm.volumes[0].name).to.equal('Volume 1')
    wrapper.vm.removeVolumeField(-1)
    expect(wrapper.vm.volumes.length).to.equal(1)
  })

  it('should raise error when there is no data in form during submit', () => {
    var wrapper = mount(NewBook)
    wrapper.vm.onSubmit()
    expect(wrapper.vm.errorState).to.equal(true)
    wrapper = mount(NewBook, {
      data() {
        return {
          name: 'User 1',
          overview: 'A overview',
          volumes: [{
            name: 'abcdefghijklmnopqrstuvwxyzabcde'
          }]
        }
      }
    })
    wrapper.vm.onSubmit()
    expect(wrapper.vm.errorState).to.equal(true)
  })

  it('should not raise error when there is data in form during submit', () => {
    const wrapper = mount(NewBook, {
      data() {
        return {
          name: 'User 1',
          overview: 'A overview',
          volumes: [{
            name: 'Volume 1'
          }]
        }
      }
    })
    wrapper.vm.preventSubmit()
    wrapper.vm.onSubmit()
    expect(wrapper.vm.errorState).to.equal(false)
  })
})
