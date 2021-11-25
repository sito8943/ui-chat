/**
 * @author Sito
 */
export default class ChatMessage {
  /**
   *
   * @param {string} sender
   * @param {string} message
   */
  constructor(sender = "", message = "") {
    this.sender = sender;
    this.message = message;
  }

  /**
   * @returns user who sent the message
   */
  get Sender() {
    return this.sender;
  }

  /**
   * @param {string} sender
   */
  set Sender(sender = "") {
    this.sender = sender;
  }

  /**
   * @returns message
   */
  get Message() {
    return this.message;
  }

  /**
   * @param {string} message
   */
  set Message(message = "") {
    this.message = message;
  }
}
