export let MessageStates = {
  not_sent: "Not sent",
  sent: "Sent",
  seen: "Seen",
  received: "Received",
  error: "Error",
};

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
    this.state = MessageStates.not_sent;
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
  set Sender(sender) {
    this.sender = sender;
  }

  /**
   * @returns message
   */
  get Message() {
    return this.message;
  }

  /**
   * @param {string} message's content
   */
  set Message(message) {
    this.message = message;
  }

  /**
   * @returns message's state
   */
  get State() {
    return this.state;
  }

  /**
   * @param {string} message's state
   */
  set State(state) {
    this.state = state
  }

}
