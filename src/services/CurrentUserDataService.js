import AsyncStorage from '@react-native-community/async-storage';

class CurrentUserData {
  constructor(user = {}) {
    console.log("--- Constructor de current user ---");
    console.log(user);
    this._key = this.constructor.name;
    this.user = user;
  }

  set = async user => {
    try {
      const value = JSON.stringify(user);
      Object.assign(this.user, user);

      console("##set");
      console.log(this.user);
      console.log(this._key);
      console("#/set");

      await AsyncStorage.setItem(this._key, value);
    } catch (error) {
      return error;
    }
  };

  get = async () => {
    try {
      const value = await AsyncStorage.getItem(this._key);
      return value && JSON.parse(value);
    } catch (error) {
      return error;
    }
  };

  getProp = prop => (this.user.hasOwnProperty(prop) && this.user[prop]) || null;
}

// create instance
const CurrentUser = new CurrentUserData();

// lock instance
Object.freeze(CurrentUser);

export default CurrentUser;
