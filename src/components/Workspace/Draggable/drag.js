/* eslint-disable @typescript-eslint/explicit-member-accessibility */
class Drag {
  constructor (targetId, dialogId) {
    this.disX = 0
    this.disY = 0
    this.box = document.getElementById(targetId)
    this.dialog = document.getElementById(dialogId)
    if (this.dialog) {
      this.dialog = this.dialog.firstChild
    }
    if (this.dialog) {
      this.dialog = this.dialog.lastChild
    }

    // this.box = document.getElementsByClassName('ant-modal-wrap')
    this.m = this.move.bind(this)
    this.u = this.up.bind(this)
  };
  init () {
    if (this.box) {
      this.box.addEventListener('mousedown', this.down.bind(this))
    }
  };
  down (ev) {
    ev.preventDefault() // 阻止默认行为(防止拖拽过程中可能选中文字，"box"错误跟随的尴尬)
    this.disX = ev.pageX - this.dialog.offsetLeft
    this.disY = ev.pageY - this.dialog.offsetTop
    document.addEventListener('mousemove', this.m)
    document.addEventListener('mouseup', this.u)
  };
  move (ev) {
    this.dialog.style.left = ev.pageX - this.disX + 'px'
    this.dialog.style.top = ev.pageY - this.disY + 'px'
    // 防止拖出窗口
    if (this.dialog.offsetLeft <= 0) {
      this.dialog.style.left = 0 + 'px'
    };
    if (this.dialog.offsetLeft >= window.innerWidth - this.dialog.offsetWidth) {
      this.dialog.style.left = window.innerWidth - this.dialog.offsetWidth + 'px'
    };
    if (this.dialog.offsetTop <= 0) {
      this.dialog.style.top = 0 + 'px'
    };
    if (this.dialog.offsetTop >= window.innerHeight - this.dialog.offsetHeight) {
      this.dialog.style.top = window.innerHeight - this.dialog.offsetHeight + 'px'
    };
  };
  up () {
    document.removeEventListener('mousemove', this.m)
    document.removeEventListener('mouseup', this.u)
  };
};

export default Drag

/*
  　使用举例：
  　　import Drag from "./Drag"

  　　let xxx = new Drag("box");
  　　xxx.init();
  */
