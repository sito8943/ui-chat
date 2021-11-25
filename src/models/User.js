export default class User {
  /**
   *
   * @param {string} name
   * @param {string} state
   * @param {string} photo
   * @param {string} link
   */
  constructor(name = "", state = "", photo = "", link = "") {
    this.name = name;
    this.state = state;
    this.photo = photo;
    this.link = link;
  }

  /**
   * @returns user's name
   */
  get Name() {
    return this.name;
  }

  /**
   * @param {string} name
   */
  set Name(name) {
    this.name = name;
  }

  /**
   * @returns user's state
   */
  get State() {
    return this.state;
  }

  /**
   * @param {string} state
   */
  set State(state) {
    this.state = state;
  }

  /**
   * @returns user's photo
   */
  get Photo() {
    return this.photo;
  }

  /**
   * @param {string} photo
   */
  set Photo(photo) {
    this.photo = photo;
  }

  /**
   * @returns user's link
   */
  get Link() {
    return this.link;
  }

  /**
   * @param {string} link
   */
  set Link(link) {
    this.link = link;
  }
}
