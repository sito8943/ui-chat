 /**
   *
   * @param {string} name
   * @param {object[]} otherUsers
   */
export const LookUserByName = (name, otherUsers) => {
    const result = otherUsers.filter((item) => {
      if (item.Name === name) return item;
    });
    if (result.length > 0) return result[0];
    return null;
  };
