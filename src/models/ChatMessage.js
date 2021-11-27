export let MessageStates = {
  NotSent: 1,
  Sent: 2,
  Seen: 3,
  Received: 4,
  Error: 5,
};

/**
 * @author Sito
 * @attribute sender - who sent the message
 * @attribute message - message's content
 * @attribute states - array of states per user's count - 1
 */
export default class ChatMessage {
  /**
   *
   * @param {string} sender
   * @param {string} message
   * @param {number[]} states
   */
  constructor(sender = "", message = "", states = []) {
    this.sender = sender;
    this.message = message;
    if (states === []) this.state.push(MessageStates.not_sent);
    else this.states = states
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
  get States() {
    return this.states;
  }

  /**
   * @param {number[]} message's states
   */
  set States(states) {
    this.states = states;
  }

  /**
   * @param {number} index
   * @param {number} newState
   */
  set State(index, newState) {
    this.states[index] = newState
  }

}
