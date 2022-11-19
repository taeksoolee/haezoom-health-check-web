class Logger {
  /** @types */
  _durations = {};

  log(...strs) {
    console.log(...strs);
  }

  startDuration(id) {
    this._durations[id] = Date.now();
  }

  /**
   * 로그 출력 및 결과 값 반환
   * @param {string} id 
   * @returns {number} - duration
   */
  endDuration(id) {
    if(!this._durations[id]) {
      console.warn('Logger Warn ::: call before startDuration(id)')
      return '';
    }

    const e = Date.now();
    const duration = e - this._durations[id]
    console.log(`${id} ::: ${duration}`);
    return duration;
  }
}

window.logger = new Logger();